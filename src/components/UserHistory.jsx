import React, { useState, useEffect } from "react";
import { getHistory, getUserInfo, deletePosition } from "../services/api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/userHistory.css";
import "../styles/MapP.css";

export default function UserLocationComponent({
  setUserName,
  setSosMode,
  setCountLocations,
  setCountFriends,
}) {
  const [userlocations, setUserLocations] = useState([]);
  

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getUserInfo();

        setUserName(response.user.username);
        setUserLocations(response.user.UserPositions);
        setSosMode(response.user.sos);
        setCountLocations(response.user.UserPositions.length);
        setCountFriends(response.user.UserFriends.length);
        //console.log(response.user);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    // Fetch locations initially
    fetchLocations();

    
  }, []); 

  const handleClick = (e, locationID) => {
    e.preventDefault(e);
    deletePosition(locationID);
  };

  const [filterOption, setFilterOption] = useState("newest");

  let cpyUserLocations = [...userlocations];

  // if user chooses newest reverse so it displays from newest to oldest
  if (filterOption === "oldest") {
    cpyUserLocations = cpyUserLocations.reverse();
  }

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <>
      <h2>Your Locations History:</h2>
      <Row>
        <Col>
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
          <br />
          <br />
          <table className="table text-light ">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cpyUserLocations.map((location) => (
                <tr key={location.ID}>
                  <td>{location.CreatedAt.slice(0, 10)}</td>
                  <td>{location.Latitude}</td>
                  <td>{location.Longitude}</td>
                  <td>
                    <Button
                      className="btn btn-sm btn-danger"
                      type="submit"
                      onClick={(e) => handleClick(e, location.ID)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
}
