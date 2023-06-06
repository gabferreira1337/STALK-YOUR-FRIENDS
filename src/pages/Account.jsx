import React, { useContext, useState, Profiler } from "react";
import { AuthContext } from "../contexts/auth";
import NavbAuth from "../components/Navbar_auth";
import { Row, Col } from "react-bootstrap";
import UserLocationComponent from "../components/UserHistory";
import FriendsList from "../components/FriendList";
import Profile from "../components/Profile";

const AccountPage = () => {
  const { logout } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [sosmode, setSosMode] = useState("");
  const [countlocations, setCountLocations] = useState(0);
  const [countfriends, setCountFriends] = useState(0);

  const setUserinfo = {
    setUserName: setUserName,
    setSosMode: setSosMode,
    setCountLocations: setCountLocations,
    setCountFriends: setCountFriends,
  };

  const userinfo = {
    username: username,
    sosmode: sosmode,
    countlocations: countlocations,
    countfriends: countfriends,
  };

  if (loading) {
    <div className="loading">Loading data...</div>;
  }

  return (
    <>
      <NavbAuth />

      <Row>
        <Col sm={8}>
          <Profile {...userinfo} />
          <UserLocationComponent {...setUserinfo} />
        </Col>
        <Col sm={4}>
          <FriendsList />
        </Col>
      </Row>
    </>
  );
};

export default AccountPage;
