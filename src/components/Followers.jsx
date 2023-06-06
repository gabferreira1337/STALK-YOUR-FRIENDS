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
  const [followersArray, setFollowersArray] = useState([]);

  // get followers and store it in following
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getfollowing();
        setFollowersArray(Object.values(response));
      } catch (error) {
        console.error("Couldn't get followers list");
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Row>
        {followersArray.length > 0 ? (
          <Col sm={13}>
            <List
              className="friends-list"
              sx={{ width: "100%", maxWidth: 260 }}
            >
              {followersArray[0].map((follower) => (
                <React.Fragment key={follower.id}>
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
                          Username: {follower.username}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </React.Fragment>
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
