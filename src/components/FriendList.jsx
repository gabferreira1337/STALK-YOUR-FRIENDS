import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useRef } from "react";
import { api, unfollowfriend, fetchUsersHistory } from "../services/api";
import "../styles/FriendsList.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AddFriend from "./AddFriend";
import CheckLocations from "./CheckLocations";


export default function FriendsList() {

  const [users, setUsers] = useState([]);
  const [usersLocations, setUsersLocations] = useState([]);
  const [changevar, setChangevar] = useState(1);


/*  useEffect(() => {
    fetchUsers();
  }, [changevar]);
*/

useEffect(() => {
  fetchUsers();
}, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: token },
    };

    try {
      const response = await api.get("/follower/", config);

     
      // console.log(response.data);
      // return response;

      setUsers(response.data.data);
      setChangevar(changevar + 1);
      //console.log(response.data.data);
    } catch (error) {
      alert("Can't update your friends list");
      throw new Error(error.response.data); // Throw an error with the error message from the API
    }
  };

  const handle_event_click_unfollow = (e) => {
    console.log(e);
    //e.preventDefault();
    unfollowfriend(e);
  };





  const handle_check_locations = (id) => {
   

    setUsersLocations(() => fetchUsersHistory(id).then((resolved)=> {
      setUsersLocations(resolved);
    }));

  
  }


  return (
    <>
    <Row>
      <Col sm={9}>
    <CheckLocations usersLocations = {usersLocations} />
    </Col>
    <h2>Friends </h2>
    <Col sm={13}>
      <List className="friends-list" sx={{ width: "100%", maxWidth: 260 }}>
        {users.map((user) => (
          <>
            <ListItem alignItems="flex-start" key={user.id}>
              <ListItemText
                className="list-text"
                primary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="black"
                  >
                    Username: {user.username}
                  </Typography>
                  
                }
                secondary={"ID: " + user.id}
              />
              <Button
                className="btn btn-sm"
                onClick={(e) => handle_event_click_unfollow(user.id)}
              type="button">
                UNFOLLOW
              </Button>
          
            </ListItem>
            <Button className="btn btn-sm" onClick={() => handle_check_locations(user.id)}>CheckLocations</Button>
            <Divider variant="inset" component="li" />
          </>
        ))}
        <ListItem alignItems="flex-start">
          <AddFriend />
        </ListItem>
      </List>
      </Col>
      </Row>
    </>
  );
}
