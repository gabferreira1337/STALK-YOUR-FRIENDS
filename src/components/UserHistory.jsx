import React, { useState, useEffect,useRef } from 'react';
import { getHistory, getUserInfo,deletePosition } from '../services/api';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "../styles/userHistory.css"



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
   // console.log(e);
  //e.preventDefault();
    deletePosition(e);
  }


  const [filterOption, setFilterOption] = useState('oldest');

  let  cpyUserLocations = [...userlocations];


  // if user chooses newest reverse so it displays from newest to oldest
if(filterOption === "newest"){

  cpyUserLocations = cpyUserLocations.reverse();

}

const handleFilterOptionChange = (e) => {
  setFilterOption(e.target.value);
};



  return (
    <>
  <br/>
  <h2>Your Locations History:</h2>
  <Row>
    <Col>
   <div className="filter-container ">
  <label className='filter-label border rounded text-black' htmlFor="filterOption">
    Filter:
    <select id="filterOption" value={filterOption} onChange={handleFilterOptionChange} >
      <option value="oldest">Newest</option>
      <option value="newest">Oldest</option>
    </select>
  </label>
</div>
<br/>
<br/>
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
    {cpyUserLocations.map(location => (<tr key={location.ID}>
      <td>{location.CreatedAt.slice(0,10)}</td>
      <td>{location.Latitude}</td>
      <td>{location.Longitude}</td>
      <td><Button className='btn btn-sm btn-danger' type='submit' onClick={() =>handleClick(location.ID)}>DELETE</Button></td>
    </tr>))}
    </tbody>
  </table>
  </Col>
  </Row>
    </>
  );
};