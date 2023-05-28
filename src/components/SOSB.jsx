import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useState, useContext } from "react";
import "../styles/coordinates.css";
import { sosMode } from "../services/api";

export default function SOS_B() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    sosMode();

    
  };

  return (
    
         
        <Button
          className="btn btn-danger  btn-lg"
          type="submit"
          onClick={handleSubmit}
        >
          ACTIVATE SOS
        </Button>
        
  
  );
}
