import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import NavbAuth from "../components/Navbar_auth";
import MapP from "../components/MapP";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import SOS from "../components/SOS";
import { getUsers } from "../services/api";
import Coordinates from "../components/Coordinates";
import LocationComponent from "../components/FollowersLoc";
import SOS_B from "../components/SOSB";
import FastCoordinates from "../components/FastCoordinates";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addedValue, setAddedValue] = useState("");

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    <div className="loading">Loading data...</div>;
  }

  return (
    <>
      <NavbAuth />
      <Container className="container  d-flex " id="form-container">
        <Row className="justify-content-between ">
          <Col sm={6} className="" id="col-1">
            <LocationComponent addedValue={addedValue} />
          </Col>
          <Col sm={6} className="col-2 ">
            <MapP />
          </Col>
        </Row>
      </Container>

      <Coordinates setAddedValue={setAddedValue} />
      <Row>
        <FastCoordinates />
      </Row>
      <Row>
        <SOS_B />
      </Row>
    </>
  );
};

export default HomePage;
