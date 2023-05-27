import React, { useState, useEffect, useRef,Table } from "react";
import { getHistory, getUserInfo, deletePosition } from "../services/api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { fetchUsersHistory } from "../services/api";
import "../styles/SOS.css";





  


export default function SOS() {

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        //const response = await ;
        //console.log(response);

        //setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    // Fetch locations initially
    fetchLocations();

    // Fetch locations every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchLocations, 50000);

     //Clean up the interval when the component is unmounted
     return () => {
     clearInterval(intervalId);
    };
  }, []);




 

  return (
    <>

      <Button className="btn btn-sm btn-danger">Utilizador X ativou modo sos</Button>

</>
  );
 
 
  
}
