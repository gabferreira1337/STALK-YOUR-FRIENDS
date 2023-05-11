import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import React, { useState, useContext } from "react";  
import "../styles/coordinates.css"
import { submitCoord } from '../services/api';
import locations from '../services/api'







export default function Coordinates() {

  const [lat, setLat] = useState('');     
  const [lng, setLng] = useState('');   





  const handleSubmit = (e) => {
    e.preventDefault();
  
    submitCoord(lat, lng);

    console.log(locations)
  
  };
  




  return(

    <Form  onSubmit={handleSubmit}>
    <Row>
      <Col sm={6}>
        <Form.Label>Latitude:</Form.Label>
        <Form.Control type="text" placeholder="Enter latitude" value={lat} onChange={(e) => setLat(e.target.value)}/>
      </Col>
      <Col sm={6}>
        <Form.Label>Longitude:</Form.Label>
        <Form.Control type="text" placeholder="Enter longitude" value={lng} onChange={(e) => setLng(e.target.value)}/>
      </Col>
      <Button className="btn btn-light btn-outline-dark btn-lg" type="submit">
        Submit
        </Button>
    </Row>
  </Form>
  );
}

