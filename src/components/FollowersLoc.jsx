import React, { useState, useEffect } from "react";
import { getUsersList } from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../services/api";
import "../styles/MapP.css";
import { Col, Row, Button } from "react-bootstrap";
import ModalSos from "../components/ModalSos";

export default function LocationComponent({ setAddedValue }) {
  const [locations, setLocations] = useState([]);

  const [selectedstart, setSelectedstart] = useState(new Date("2023-01-01"));
  const [selectedend, setSelectedend] = useState(new Date("2024-01-01"));
  const [selectedusername, setSelectedusername] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filterOption, setFilterOption] = useState("newest");
  const [matchedUser, setMatchedUser] = useState([]);
  const [showmodal, setShowmodal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: token },
        };

        // get friends list
        const response = await api.get("/follower/", config);
        const userData = Object.values(response.data.data);
        const allLocations = [];

        // for each friend get locations
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
      } catch (error) {
        throw new Error(error.response.data);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedend, selectedstart]);

  //getUsersList to get the sos state from the users friend ,when the username in the userData array === username in the userslist  and  the sos state is true ,store in the matcheduser aray
  let matchedUsers = [];
  const listusers = () => {
    getUsersList()
      .then((sosArray) => {
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // insert into updated locations each location of user comparing user id from friends list and locatins
  const updatedLocations = locations.map((location) => ({
    ...location,
    username:
      userData.find((user) => user.id === location.UserId)?.username || "N/A",
  }));

  let cpyUserLocations = [...updatedLocations];

  // check if each username in cpyuserlcations array is included in the matchedUsers and add true sos state if it is included
  const testfunction = () => {
    let cpyUserLocations = [...updatedLocations];
    cpyUserLocations = cpyUserLocations.map((location) => {
      if (matchedUser.includes(location.username)) {
        location.sos = true;
      } else {
        location.sos = false;
      }
      return location;
    });
  };

  // store in addedValue array to send via props to map everytime locations array change
  useEffect(() => {
    setAddedValue(cpyUserLocations);
  }, [locations, setAddedValue]);

  useEffect(() => {
    listusers();
  }, [userData]);

  // if b - a return negative sort date a before date b
  if (filterOption === "newest") {
    cpyUserLocations.sort(
      (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
    );
  } else {
    cpyUserLocations.sort(
      (a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt)
    );
  }

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  };

  // when click on SOS btn set username to show modal with the users friend loation
  const HandleSosB = (username) => {
    setSelectedusername(username);
    setShowmodal(true);
  };

  testfunction();

  //when click on SOS save username and filter inside the cpyUserLocations only the locations of that user
  const filteredLocations = selectedusername
    ? cpyUserLocations.filter(
        (location) => location.username === selectedusername
      )
    : cpyUserLocations;

  return (
    <>
      <Row>
        <Col>
          <p className="text-light">Start-date:</p>
          <DatePicker
            selected={selectedstart}
            onChange={(date) => setSelectedstart(date)}
            dateFormat="yyyy/MM/dd" // Set the desired date format
          />
        </Col>
        <Col>
          <p className="text-light">End-date:</p>
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
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table text-light">
          <thead>
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {cpyUserLocations.map((location) => {
              // if location.sos === true return red btn
              const sosButton = location.sos ? (
                <Button
                  className="btn btn-danger"
                  onClick={() => HandleSosB(location.username)}
                >
                  SOS
                </Button>
              ) : null;

              return (
                <tr key={location.ID}>
                  <td>{location.username}</td>
                  <td>{location.CreatedAt.slice(0, 10)}</td>
                  <td>{location.CreatedAt.slice(11, 16)}</td>
                  <td>{location.Latitude}</td>
                  <td>{location.Longitude}</td>
                  <td>{sosButton}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalSos
        showmodal={showmodal}
        setShowmodal={setShowmodal}
        filteredLocations={filteredLocations}
      />
    </>
  );
}
