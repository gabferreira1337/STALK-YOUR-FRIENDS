import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState, useEffect} from "react";
import { api, unfollowfriend, fetchUsersHistory } from "../services/api";
import "../styles/FriendsList.css";
import {Button, Row, Col } from "react-bootstrap";
import AddFriend from "./AddFriend";
import CheckLocations from "./CheckLocations";

export default function FriendsList() {
  const [users, setUsers] = useState([]);
  const [usersLocations, setUsersLocations] = useState([]);
  const [usersLastLoc, setUsersLastLoc] = useState([]);
  const [userids, setUserIds] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [changevar, setChangevar] = useState(0);
  const [changeunf, setChangeUnf] = useState(0);
  const [showmodal, setShowmodal] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [changevar, changeunf]);

  useEffect(() => {
    getLastPos();
  }, []);

  useEffect(() => {
    // userLocations is an array of objects with user and last loc info
    const userLocations = users.map((user) => {
      const locations = usersLastLoc.filter(
        (location) => location.UserID === user.id
      );
      return { user, locations }; // return object with user info including last location
    });

    setUserInfo(userLocations);
  }, [users, usersLastLoc, changevar, changeunf]); // update whenever these variabels change

  // get friends and store in Array to render on a list
  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");

    const config = {
      headers: { Authorization: token },
    };

    try {
      const response = await api.get("/follower/", config);

      setUsers(response.data.data);
      setUserIds(response.data.data);

      // console.log(response.data.id);
    } catch (error) {
      alert("Can't update your friends list");

      throw new Error(error.response.data); // Throw an error with the error message from the API
    }
  };

  const handle_event_click_unfollow = (e) => {
    unfollowfriend(e);

    setChangeUnf((changeunf + 1) % 100);
  };

  //once  promise resolved update the usersLocations state variable with  user history data
  const handle_check_locations = (id) => {
    setShowmodal(true);
    setUsersLocations(() =>
      fetchUsersHistory(id)
        .then((response) => {
          setUsersLocations(response);
        })
        .catch((error) => {
          console.error("Couldn't get friend location");
        })
    );
  };

  const getLastPos = async () => {
    const token = sessionStorage.getItem("token");

    const config = {
      headers: { Authorization: token },
    };

    try {
      const response = await api.get("/user/last-positions", config);

      setUsersLastLoc(response.data.userLocs);
    } catch (error) {
      alert("Can't update your friends list");

      throw new Error(error.response.data); // Throw an error with the error message from the API
    }
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
          <h2>Friends</h2>
        </div>
        <Col sm={12} className="col-size ">
          <List className="friends-list" sx={{ width: "100%", maxWidth: 260 }}>
            <div
              className="friends-list-container"
              style={{ maxHeight: "650px", overflowY: "auto" }}
            >
              {userInfo.map((user) => (
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
                          {user.user.username}
                        </Typography>
                      }
                    />
                    <div className="d-flex flex-column">
                    <Button
                      className="btn btn-sm " id="btn-unf"
                      onClick={(e) => handle_event_click_unfollow(user.user.id)}
                      type="button"
                    >
                      UNFOLLOW
                    </Button>
                    </div>
                  </ListItem>
                  {user.locations.length > 0 && (
                    <>
                    <div className="last-loc">
                      <Typography variant="subtitle2" color="text.primary">
                        Last Location Registered:
                      </Typography>
                      <Typography variant="body2" color="text.primary" >
                        Latitude: {user.locations[0].Lat}
                      </Typography>
                      <Typography variant="body2" color="text.primary" >
                        Longitude: {user.locations[0].Long}
                      </Typography>
                      </div>
                    </>
                  )}
                  <Button
                    className="btn btn-sm"
                    onClick={() => handle_check_locations(user.user.id)}
                  >
                    CheckLocations
                  </Button>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </div>
            <ListItem alignItems="flex-start">
              <AddFriend setChangevar={setChangevar} changevar={changevar} />
            </ListItem>
          </List>
        </Col>
      </Row>
    </>
  );
}
