import React, { useState, useEffect } from "react";
import { deletePosition, getUsersList } from "../services/api";
import SOS from "./SOS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../services/api";
import "../styles/Mapb.css";
import FilterHistory from "./Filter";
import { Col, Row, Button } from "react-bootstrap";

export default function LocationComponent({ setAddedValue }) {
  const [locations, setLocations] = useState([]);

  const [selectedstart, setSelectedstart] = useState(new Date("2021-01-01"));
  const [selectedend, setSelectedend] = useState(new Date("2024-01-01"));
  const [selectedIds, setSelectedIds] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filterOption, setFilterOption] = useState("oldest");
  const [matchedUser, setMatchedUser] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
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
            const response = await api.post(
              "/position/history/user",
              data,
              config
            );
            allLocations.push(...response.data.locations);
          } catch (error) {
            throw new Error(error.response.data);
          }
        }

        setLocations(allLocations);
        setUserData(userData);
        listusers();
        // testfunction();
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

 
  let matchedUsers = [];
  const listusers = () => {
    getUsersList()
      .then((sosArray) => {
        // console.log(sosArray);

        for (let i = 0; i < userData.length; i++) {
          for (let j = 0; j < sosArray.length; j++) {
            if (
              userData[i].username === sosArray[j].username &&
              sosArray[j].sos == true
            ) {
              matchedUsers.push(sosArray[j].username);
            }
          }
        }
        setMatchedUser(matchedUsers);

        //testfunction();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // insert into updated locations each
  const updatedLocations = locations.map((location) => ({
    ...location,
    username:
      userData.find((user) => user.id === location.UserId)?.username || "N/A",
  }));

  let cpyUserLocations = [...updatedLocations];

  const testfunction = () => {
    //console.log(matchedUser)
    cpyUserLocations = cpyUserLocations.map((location) => {
      //console.log(location.username)
      if (matchedUser.includes(location.username)) {
        location.sos = true;
      } else {
        location.sos = false;
      }
      return location;
    });
  };

  useEffect(() => {
    setAddedValue(locations);
  }, [locations, setAddedValue]);

  useEffect(() => {
    listusers();
  }, []);


  if (filterOption === "newest") {
    cpyUserLocations = cpyUserLocations.reverse();
  }

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  };
  /*useEffect(() => {
    testfunction();
  }, [matchedUser]);*/

  testfunction();
  //console.log(cpyUserLocations);
  return (
    <>
      <Row>
        <Col>
          <p>Start-date:</p>
          <DatePicker
            selected={selectedstart}
            onChange={(date) => setSelectedstart(date)}
            dateFormat="yyyy/MM/dd" // Set the desired date format
          />
        </Col>
        <Col>
          <p>End-date:</p>
          <DatePicker
            selected={selectedend}
            onChange={(date) => setSelectedend(new Date(date))}
            dateFormat="yyyy/MM/dd" // Set the desired date format
          />
        </Col>
      </Row>
      <div className="filter-container ">
        <label
          className="filter-label border rounded text-black"
          htmlFor="filterOption"
        >
          Filter:
          <select
            id="filterOption"
            value={filterOption}
            onChange={handleFilterOptionChange}
          >
            <option value="oldest">Newest</option>
            <option value="newest">Oldest</option>
          </select>
        </label>
      </div>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table text-light">
          <thead>
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">Date</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {cpyUserLocations.map((location) => {
              return (
                <tr key={location.ID}>
                  <td>{location.username}</td>
                  <td>{location.CreatedAt.slice(0, 10)}</td>
                  <td>{location.Latitude}</td>
                  <td>{location.Longitude}</td>
                  <td>
                    {location.sos ? (
                      <Button className="btn btn-danger">SOS</Button>
                    ) : (
                      <p ></p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
