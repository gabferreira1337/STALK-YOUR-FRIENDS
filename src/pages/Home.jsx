import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import NavbAuth from "../components/Navbar_auth";
import MapP from "../components/MapP";
import { Container, Row, Col } from "react-bootstrap";
import Coordinates from "../components/Coordinates";
import LocationComponent from "../components/FollowersLoc";
import SOS_B from "../components/SOSB";
import FastCoordinates from "../components/FastCoordinates";
import "../styles/Mapb.css";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const [addedValue, setAddedValue] = useState([]);

  if (loading) {
    <div className="loading">Loading data...</div>;
  }

  return (
    <>
      <NavbAuth />
      <Container className="container  d-flex " id="form-container">
        <Row className="justify-content-between ">
          <Col sm={9} className="" id="col-1">
            <LocationComponent setAddedValue={setAddedValue} />
          </Col>
          <Col sm={3} className="col-2 flex-end">
            <MapP addedValue={addedValue} />
          </Col>
        </Row>
      </Container>

      <Coordinates />
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
