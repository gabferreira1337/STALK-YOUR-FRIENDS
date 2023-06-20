import React, { useState } from "react";
import NavbAuth from "../components/Navbar_auth";
import MapP from "../components/MapP";
import { Container, Row, Col } from "react-bootstrap";
import Coordinates from "../components/Coordinates";
import LocationComponent from "../components/FollowersLoc";
import SOS_B from "../components/SOSB";
import FastCoordinates from "../components/FastCoordinates";
import "../styles/MapP.css";

const HomePage = () => {
  const [addedValue, setAddedValue] = useState([]);
  const [addedFilterUser, setAddedFilterUser] = useState([]);
  const [addedFilterChange, setAddedFilterChange] = useState("");
  // <div style={{ paddingLeft: "10px" }}></div>

  return (
    <>
      <NavbAuth />
      <Container className="container  d-flex " id="form-container">
        <Row className="justify-content-between ">
          <Col sm={9} className="" id="col-1">
            <LocationComponent
              setAddedValue={setAddedValue}
              setAddedFilterUser={setAddedFilterUser}
              setAddedFilterChange={setAddedFilterChange}
            />
          </Col>
          <Col sm={3} className="col-2 flex-end">
            <MapP
              addedValue={addedValue}
              addedFilterUser={addedFilterUser}
              addedFilterChange={addedFilterChange}
            />
          </Col>
        </Row>
      </Container>
      <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Coordinates />
      </div>
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
