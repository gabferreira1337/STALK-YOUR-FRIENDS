import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { api } from "../services/api";

const ModalAlertTime = ({ showAlertModal, setShowAlertModel }) => {
  useEffect(() => {
    const getAlertTime = async (alertTime) => {
      const token = sessionStorage.getItem("token");

      const config = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await api.get("/user/alert-time", config);

        setAlertTime(response.data.AlertTime);
      } catch (error) {
        throw new Error(error.response.data);
      }
    };
    getAlertTime();
  }, []);

  const [alertTime, setAlertTime] = useState(null);

  const postAlertTime = async (alertTime) => {
    const token = sessionStorage.getItem("token");

    const data = {
      alertTimeInHours: parseInt(alertTime),
    };

    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.put("/user/alert/time", data, config);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  const handleAlert = (e) => {
    e.preventDefault();

    postAlertTime(alertTime);
  };
  return (
    <>
      <Modal show={showAlertModal} onHide={() => setShowAlertModel(false)}>
        <Modal.Header closeButton className="modal-follower">
          <Modal.Title>Set Alert Time</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-follower">
          <input
            type="text"
            value={alertTime}
            onChange={(e) => setAlertTime(e.target.value)}
            placeholder="Enter alert time in hours"
          />
        </Modal.Body>
        <Modal.Footer className="modal-follower">
          <Button variant="secondary" onClick={() => setShowAlertModel(false)}>
            Close
          </Button>
          <button type="button" class="btn btn-primary" onClick={handleAlert}>
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlertTime;
