import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { deletePosition, getHistory } from "../services/api";
import SOS from "./SOS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../services/api";
import "../styles/Mapb.css";
import FilterHistory from "./Filter";
import { Col, Row } from "react-bootstrap";

export default function LocationComponent({ setAddedValue }) {
  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("token");

  const [time_end, setTime_end] = useState("");
  const [selectedstart, setSelectedstart] = useState(new Date("2021-01-01"));
  const [selectedend, setSelectedend] = useState(new Date("2024-01-01"));
  const [selectedIds, setSelectedIds] = useState([]);
  const [valuef, setValuef] = useState({});

  const [flag, setFlag] = useState(false);
  const [filterOption, setFilterOption] = useState("oldest");

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
            const response = await api.post(
              "/position/history/user",
              data,
              config
            );
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

  let cpyUserLocations = [...locations];

  setAddedValue(locations);

  //console.log(setAddedValue)

  if (filterOption === "newest") {
    cpyUserLocations = cpyUserLocations.reverse();
  }

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  };

  console.log(cpyUserLocations);
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
        <table class="table text-light">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Date</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {cpyUserLocations.map((location) => (
              <tr key={location.ID}>
                <td>{location.UserId}</td>
                <td>{location.CreatedAt.slice(0, 10)}</td>
                <td>{location.Latitude}</td>
                <td>{location.Longitude}</td>
                <td>
                  <SOS />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
