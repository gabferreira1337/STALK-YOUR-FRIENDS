import { useState, useEffect } from "react";
import { addFriend, getUsersName } from "../services/api";
import "../styles/FriendsList.css";

export default function AddFriend({ setChangevar, changevar }) {
  const [userFriend, setUserFriend] = useState();
  const [usernamesArray, setUsernamesArray] = useState([]);
  const [userid, setUserID] = useState("");

  const handle_Click = (e) => {
    e.preventDefault();

    addFriend(userid);

    //circular so increment until 100 and back to 0
    setChangevar((changevar + 1) % 100);
    setUserFriend("");
  };

  //get all users and store the names to show while searching in
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await getUsersName(userFriend);

        setUsernamesArray(response.users);
      } catch (error) {
        throw new Error(error.response.data);
      }
    };

    fetchUsernames();
  }, [userFriend]);

  const handleUsernameClick = (username, user_id) => {
    setUserFriend(username); // set input value

    setUserID(user_id); // get the userID for the request

    setUsernamesArray([]); // clear array with usernames
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
                      key={username.ID}
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
            className="btn btn-outline-primary "
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
