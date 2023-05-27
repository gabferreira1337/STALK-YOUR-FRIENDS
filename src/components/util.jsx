import React, { useState, useEffect, useRef, useContext, useCallback, useMemo } from "react";
import { deletePosition, getHistory } from "../services/api";
import  SOS  from "../components/SOS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../services/api";
import "../styles/Mapb.css";
import FilterHistory from "./Filter";

export default function LocationComponent({ addedValue }) {
  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("token");

  const [time_end, setTime_end] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [valuef, setValuef] = useState({});
  
  const [flag, setFlag] = useState(false);

  //console.log(token);

  useEffect(() => {
    
    // Fetch locations initially
    const fetchData = async () => {
       fetchUsers();
  
      const userData = Object.values(valuef);
      const allLocations = [];
  
      console.log(userData)
      for (const user of userData) {
        const config = {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        
       // console.log("Hello");
        const data = {
          end: '2030-07-01',
          start: '2021-07-01',
          userID: user.id,
        };
       // console.log("Hello");
        try {
          const response = await api.post('/position/history/user', data, config);
          allLocations.push(...response.data.locations);
        } catch (error) {
          console.error(error);
        }
      }
  
      setLocations(allLocations);
    };
  
    // Fetch locations initially
    fetchData();
  
    // Fetch locations every 5 seconds
    const intervalId = setInterval(fetchData, 5000);
  
    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

    


  
  const fetchUsers = async () => {

    const token = localStorage.getItem("token"); 

    const config = {

      headers: { Authorization: token },

    };

    try {

      const response = await api.get("/follower/", config);

       //console.log(response.data);
      // return response;
      setValuef(response.data.data);
      
      //console.log(response.data);
    } catch (error) {

      throw new Error(error.response.data); // Throw an error with the error message from the API
    }
  };

 
  //console.log(userData);

 // console.log(locations);

  return (
    <>
    <SOS/>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy" // Set the desired date format
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy" // Set the desired date format
      />
      <FilterHistory />
      <table class="table text-light">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.ID}>
              <td>{location.ID}</td>
              <td>{location.Latitude}</td>
              <td>{location.Longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
