import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { api } from "../services/api";

const ModalAlertTime = ({ showAlertModal, setShowAlertModel }) => {
  const [changeAlert, setChangeAlert] = useState(0);
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

    postAlertTime(alertTime).then(() => {
      setChangeAlert((changeAlert + 1) % 100);
    });
  };

  return (
    <>
      <Modal
        show={showAlertModal}
        onHide={() => setShowAlertModel(false)}
        id="modal-alert"
      >
        <Modal.Header closeButton className="modal-follower"></Modal.Header>
        <Modal.Body className="modal-follower">
          <input
            type="text"
            value={alertTime}
            onChange={(e) => setAlertTime(e.target.value)}
            placeholder="Your alert time: "
          />
        </Modal.Body>
        <Modal.Footer className="modal-follower">
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleAlert}
          >
            Change Alert Time
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlertTime;
