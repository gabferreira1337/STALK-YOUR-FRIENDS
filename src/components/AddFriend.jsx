import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { addFriend, getUsersName } from "../services/api";
import "../styles/FriendsList.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function AddFriend({ setChangevar }) {
  const [userFriend, setUserFriend] = useState();
  const [usernames, setUsernames] = useState([]);
  const [userid, setUserID] = useState("");

  const handle_Click = (e) => {
    // console.log(userFriend);

    e.preventDefault();

    addFriend(userid);

    setChangevar(userid);
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await getUsersName(userFriend);
        setUsernames(response); // Assuming the API response returns an array of usernames
      } catch (error) {
        throw new Error(error.response.data);
      }
    };

    fetchUsernames();
  }, [userFriend]);

  const usernamesArray = usernames.users;

  const handleUsernameClick = (username, user_id) => {
    setUserFriend(username); // set input value

    setUserID(user_id); // get the userID for the request

    setUsernames([]); // clear array with usernames
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder=""
          aria-label=""
          aria-describedby="basic-addon1"
          value={userFriend}
          onChange={(e) => setUserFriend(e.target.value)}
        />

        <div className="input-group">
          <div className="usernames-scrollable">
            {usernamesArray && usernamesArray.length > 0 ? (
              <ul>
                {userFriend &&
                  usernamesArray.map((username, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleUsernameClick(username.username, username.ID)
                      }
                    >
                      {username.username}
                    </li>
                  ))}
              </ul>
            ) : (
              <p></p>
            )}
          </div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handle_Click}
          >
            ADD FRIEND
          </button>
        </div>
      </div>
    </>
  );
}
