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
  const [changevar, setChangevar] = useState("");
  const [showmodal, setShowmodal] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [changevar]);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");

    const config = {
      headers: { Authorization: token },
    };

    try {
      const response = await api.get("/follower/", config);

      setUsers(response.data.data);

      //console.log(response.data.data);
    } catch (error) {
      alert("Can't update your friends list");

      throw new Error(error.response.data); // Throw an error with the error message from the API
    }
  };

  const handle_event_click_unfollow = (e) => {
    unfollowfriend(e);
  };

  //once  promise resolved update the usersLocations state variable with  user history data
  const handle_check_locations = (id) => {
    setShowmodal(true);
    setUsersLocations(() =>
      fetchUsersHistory(id).then((resolved) => {
        //console.log(resolved);
        setUsersLocations(resolved);
      })
    );
  };

  return (
    <>
      <Row>
        <Col sm={9}>
          <CheckLocations
            usersLocations={usersLocations}
            setShowmodal={setShowmodal}
            showmodal={showmodal}
          />
        </Col>
        <div className="friends-title">
          <h2>Friends </h2>
        </div>
        <Col sm={12} className="col-size ">
          <List className="friends-list" sx={{ width: "100%", maxWidth: 260 }}>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem alignItems="flex-start">
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
                    type="button"
                  >
                    UNFOLLOW
                  </Button>
                </ListItem>
                <Button
                  className="btn btn-sm"
                  onClick={() => handle_check_locations(user.id)}
                >
                  CheckLocations
                </Button>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            <ListItem alignItems="flex-start">
              <AddFriend setChangevar={setChangevar} />
            </ListItem>
          </List>
        </Col>
      </Row>
    </>
  );
}
