import { Button } from "react-bootstrap";
import React, { useState } from "react";
import "../styles/coordinates.css";
import { submitCoord } from "../services/api";

export default function FastCoordinates() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLng(longitude);

          submitCoord(lat, lng);
        },
        (error) => {
          alert("This browser doesn't support this feature");
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Button
      className="btn btn-light btn-outline-dark btn-lg"
      type="submit"
      onClick={handleSubmit}
    >
      Fast Submit
    </Button>
  );
}
