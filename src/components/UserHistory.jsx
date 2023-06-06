import React, { useState, useEffect } from "react";
import { getUserInfo, deletePosition } from "../services/api";
import { Button,Row, Col } from "react-bootstrap";
import "../styles/userHistory.css";
import "../styles/MapP.css";

export default function UserLocationComponent({
  setUserName,
  setSosMode,
  setCountLocations,
  setCountFriends,
}) {
  const [userlocations, setUserLocations] = useState([]);
  const [cpyUserLocations, setCpyUserLocations] = useState([]);
  const [filterOption, setFilterOption] = useState("newest");
  const [changedelete, setChangeDelete] = useState(0);
  

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getUserInfo();

        setUserName(response.user.username);
        setUserLocations(response.user.UserPositions);
        setSosMode(response.user.sos);
        setCountLocations(response.user.UserPositions.length);
        setCountFriends(response.user.UserFriends.length);
        setCpyUserLocations(response.user.UserPositions);
        
        
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    // Fetch locations initially
    fetchLocations();

    
  }, [changedelete]); 

  const handleClick = (e, locationID) => {
    e.preventDefault(e);

    deletePosition(locationID)
    .then(() =>{
      setChangeDelete((changedelete +1) % 100);
    })
    
  };



 // if user chooses newest reverse so it displays from newest to oldest
  useEffect(() => {
    if (filterOption === "oldest") {
      setCpyUserLocations([...userlocations].reverse());
    } else {
      setCpyUserLocations([...userlocations]);
    }
  }, [userlocations, filterOption]);


 
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
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
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
