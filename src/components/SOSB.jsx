import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../styles/coordinates.css";
import { getUserInfo, sosMode } from "../services/api";

export default function SOS_B() {
  const [sos, setSos] = useState(); // store the users sos state
  const [sosVar, setSosVar] = useState(0);

  // get the users info and store sos state , everytime user click on the sos button change the sosVar and do the request again
  useEffect(() => {
    getUserInfo()
      .then((response) => {
        setSos(response.user.sos);
      })
      .catch((response) => {
        console.error("Couldn't get users sos state");
      });
  }, [sosVar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sosMode(); // activate sos

    // circular so increment until 100 and return to 0
    setSosVar((sosVar + 1) % 100);
  };

  return (
    <Button
      className={`btn btn-lg ${sos ? "btn-danger active" : "btn-primary"}`}
      onClick={handleSubmit}
    >
      {sos ? "SOS ON" : "ACTIVATE SOS"}
    </Button>
  );
}
