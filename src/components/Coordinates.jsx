import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import "../styles/coordinates.css";
import { submitCoord } from "../services/api";

export default function Coordinates() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // check lng and lat values before making request
    if (lat <= -90 || (lat >= 90 && lng <= -180) || lng >= 180) {
      alert(
        "Couldn't add location : coordinates must be between -90 and 90  and for longitude -180 to 180 "
      );
      return;
    }

    submitCoord(lat, lng);

    // clear input
    setLat([]);
    setLng([]);
  };

  return (
    <Form>
      <Row>
        <Col sm={6}>
          <Form.Label>Latitude:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </Col>
        <Col sm={6}>
          <Form.Label>Longitude:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </Col>
        <Button
          className="btn btn-light btn-outline-dark btn-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Submit Coordinates
        </Button>
      </Row>
    </Form>
  );
}
