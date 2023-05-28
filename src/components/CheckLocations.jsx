import React, { useState, useEffect, useRef, Table } from "react";
import { getHistory, getUserInfo, deletePosition } from "../services/api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { fetchUsersHistory } from "../services/api";
import "../styles/userHistory.css";

export default function CheckLocations({ usersLocations }) {
  const locationsArray = Object.values(usersLocations);

  return (
    <>
      <div>
        {locationsArray.length > 0 ? (
          <table className="table text-light ">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                {}
              </tr>
            </thead>
            <tbody>
              {locationsArray.map((location, index) => (
                <tr key={index}>
                  <td>{location.CreatedAt.slice(0, 10)}</td>
                  <td>{location.Latitude}</td>
                  <td>{location.Longitude}</td>
                  {}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <b> </b>
        )}
      </div>
    </>
  );
}
