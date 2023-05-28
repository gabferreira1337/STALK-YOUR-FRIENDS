import React, { useState, useEffect, useRef, useContext, useCallback, useMemo } from "react";
import { deletePosition, getHistory } from "../services/api";
import  SOS  from "../components/SOS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../services/api";
import "../styles/Mapb.css";
import FilterHistory from "./Filter";
import { Col, Row } from "react-bootstrap";

export default function LocationComponent({ addedValue }) {
  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("token");

  const [time_end, setTime_end] = useState("");
  const [selectedstart, setSelectedstart] = useState(new Date('2021-01-01'));
  const [selectedend, setSelectedend] = useState(new Date('2024-01-01'));
  const [selectedIds, setSelectedIds] = useState([]);
  const [valuef, setValuef] = useState({});
  
  const [flag, setFlag] = useState(false);

 

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: token },
      };

      const response = await api.get("/follower/", config);
      const userData = Object.values(response.data.data);
      const allLocations = [];

      for (const user of userData) {
        const data = {
          end: selectedend.toISOString().slice(0, 10),
          start: selectedstart.toISOString().slice(0, 10),
          userID: user.id,
        };

       

        try {
          const response = await api.post('/position/history/user', data, config);
          allLocations.push(...response.data.locations);
        } catch (error) {
          console.error(error);
        }
      }

      setLocations(allLocations);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  fetchData();

  const intervalId = setInterval(fetchData, 100000);
  
    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
}, [selectedend, selectedstart]);



 
  return (
    <>
    <Row>
      <Col>
      <DatePicker
        selected={selectedstart}
        onChange={(date) => setSelectedstart(date)}
        dateFormat="yyyy/MM/dd" // Set the desired date format
      />
      </Col>
      <Col >
      <DatePicker
        selected={selectedend}
        onChange={(date) => setSelectedend(new Date(date))}
        dateFormat="yyyy/MM/dd" // Set the desired date format
      />
      </Col>
      </Row>
      <FilterHistory />
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <table class="table text-light">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.ID}>
              <td>{location.UserId}</td>
              <td>{location.Latitude}</td>
              <td>{location.Longitude}</td>
              <td><SOS/></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
