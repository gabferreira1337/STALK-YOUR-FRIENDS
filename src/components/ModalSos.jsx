import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/coordinates.css";

export default function ModalSos({
  showmodal,
  setShowmodal,
  filteredLocations,
}) {
  return (
    <>
      <Modal show={showmodal} onHide={() => setShowmodal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Locations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {filteredLocations.map((location) => (
                  <tr key={location.ID} className="table-danger">
                    <td>{location.username}</td>
                    <td>{location.CreatedAt.slice(0, 10)}</td>
                    <td>{location.CreatedAt.slice(11, 16)}</td>
                    <td>{location.Latitude}</td>
                    <td>{location.Longitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowmodal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
