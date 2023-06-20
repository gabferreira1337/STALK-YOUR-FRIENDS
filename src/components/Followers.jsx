import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getfollowing, addFriend } from "../services/api";
import "../styles/FriendsList.css";
import { Button, Row, Col } from "react-bootstrap";

export default function Followers({ addedfollower, setAddedFollower }) {
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

  const handle_Click = (id) => {
    addFriend(id);

    //circular so increment until 100 and back to 0
    setAddedFollower((addedfollower + 1) % 100);
  };

  return (
    <>
      <Row>
        {followersArray.length > 0 ? (
          <Col sm={13}>
            <List
              className="friends-list"
              sx={{ width: "100%", maxWidth: 260 }}
            >
              {followersArray[0].map((follower, index) => (
                <React.Fragment key={index}>
                  <Row>
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
                            {follower.username}
                          </Typography>
                        }
                      />
                      <Button
                        className="btn btn-sm"
                        type="button"
                        onClick={() => handle_Click(follower.id)}
                      >
                        Follow
                      </Button>
                    </ListItem>
                    <Divider component="li" />
                  </Row>
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
