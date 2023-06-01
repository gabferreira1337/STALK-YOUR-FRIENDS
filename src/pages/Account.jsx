import React, { useEffect, useContext, useState, Profiler } from "react";
import { AuthContext } from "../contexts/auth";
import NavbAuth from "../components/Navbar_auth";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { getUsers } from "../services/api";
import UserLocationComponent from "../components/UserHistory";
import FriendsList from "../components/FriendList";
import Followers from "../components/Followers";
import Profile from "../components/Profile";

const AccountPage = () => {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [sosmode, setSosMode] = useState("");
  const [uid, setUid] = useState("");
  const [countlocations, setCountLocations] = useState(0);
  const [countfriends, setCountFriends] = useState(0);

  const setUserinfo = {
    setUserName: setUserName,
    setSosMode: setSosMode,
    setUid: setUid,
    setCountLocations: setCountLocations,
    setCountFriends: setCountFriends,
  };

  const userinfo = {
    username: username,
    sosmode: sosmode,
    uid: uid,
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
          <Followers />
        </Col>
      </Row>
    </>
  );
};

export default AccountPage;
