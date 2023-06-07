import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function CheckLocations({
  usersLocations,
  showmodal,
  setShowmodal,
}) {
  const locationsArray = Object.values(usersLocations);

  return (
    <>
      <Modal
        show={showmodal}
        onHide={() => setShowmodal(false)}
        id="modal-friends"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Locations History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {locationsArray.length > 0 ? (
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {locationsArray.map((location) => (
                    <tr key={location.ID} className="">
                      <td>{location.CreatedAt.slice(0, 10)}</td>
                      <td>{location.CreatedAt.slice(11, 16)}</td>
                      <td>{location.Latitude}</td>
                      <td>{location.Longitude}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>This user doesn't have locations registered</p>
            )}
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
