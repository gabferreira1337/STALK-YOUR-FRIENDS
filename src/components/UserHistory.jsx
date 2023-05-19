import React, { useState, useEffect,useRef } from 'react';
import { getHistory, getUserInfo,deletePosition } from '../services/api';
import FilterHistory from './Filter';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';







export default function UserLocationComponent() {

  const [userlocations, setUserLocations] = useState([]);
  const token = localStorage.getItem("token");



  //console.log(token);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getUserInfo(); 
        console.log(response.user.locations);
        setUserLocations(response.user.UserPositions);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    // Fetch locations initially
    fetchLocations();

    // Fetch locations every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchLocations, 5000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to only run the effect once



  const handleClick = (e) => {
    console.log(e);
  
    deletePosition(e);

  }






  return (
    <>
<FilterHistory/>
<div class="table-responsive-lg">
  <Row>
    <Col>
      <table class="table text-light ">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {userlocations.map(location => (<tr key={location.ID}>
      <td>{location.CreatedAt.slice(0,10)}</td>
      <td>{location.Latitude}</td>
      <td>{location.Longitude}</td>
      <td><Button type='submit' onClick={() =>handleClick(location.ID)}> </Button></td>
    </tr>))}
    </tbody>
  </table>
  </Col>
  <Col/>
  </Row>
  </div>
    </>
  );
};