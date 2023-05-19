import React, { useState, useEffect,useRef } from 'react';
import { deletePosition, getHistory } from '../services/api';
import mapboxgl from 'mapbox-gl';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import '../styles/Mapb.css'
import FilterHistory from './Filter';





export default function LocationComponent() {

  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("token");

  const [time_end, setTime_end] = useState('');
  const [startDate, setStartDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);  

 let handleClick = (e) => {

  //e.prevent.default

  

 }


  //console.log(token);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getHistory(); 
        console.log(response);
        setLocations(response.data.locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    // Fetch locations initially
    fetchLocations();

    // Fetch locations every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchLocations, 50000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to only run the effect once

 // console.log("hello" + locations);



  return (
    <>
    <DatePicker
  selected={selectedDate}
  onChange={date => setSelectedDate(date)}
  dateFormat="dd/MM/yyyy" // Set the desired date format
/>
<DatePicker
  selected={selectedDate}
  onChange={date => setSelectedDate(date)}
  dateFormat="dd/MM/yyyy" // Set the desired date format
/>
<FilterHistory/>
      <table class="table text-light">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
    </tr>
  </thead>
  <tbody>
    {locations.map(location => (<tr key={location.ID}>
      <td>{location.ID}</td>
      <td>{location.Latitude}</td>
      <td>{location.Longitude}</td>
    </tr>))}
    </tbody>
  </table>
    </>
  );
};