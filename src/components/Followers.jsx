import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getfollowing } from "../services/api";
import "../styles/FriendsList.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Followers() {
  const [following, setFollowing] = useState({});

  useEffect(() => {
    getfollowing().then((resolved) => {
      setFollowing(resolved);
    });

    // Fetch locations every 1 minute
    const intervalId = setInterval(getfollowing, 10000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const followersArray = Object.values(following);

  console.log(followersArray[0]);

  return (
    <>
      <Row>
        <h2>Followers</h2>
        {followersArray.length > 0 ? (
          <Col sm={13}>
            <List
              className="friends-list"
              sx={{ width: "100%", maxWidth: 260 }}
            >
              {followersArray[0].map((follower, index) => (
                <>
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemText
                      className="list-text"
                      primary={
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="black"
                        >
                          Username: {follower.username}
                        </Typography>
                      }
                      secondary={"ID: " + follower.id}
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Col>
        ) : (
          <p> Couldn't get followers list </p>
        )}
      </Row>
    </>
  );
}
