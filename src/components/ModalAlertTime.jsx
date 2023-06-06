import React, { useState } from "react";
import { Modal, Button }  from "react-bootstrap";
import { api } from "../services/api";




const ModalAlertTime = ({showAlertModal, setShowAlertModel}) => {

  const [alertTime, setAlertTime] = useState(1);


  const postAlertTime =  async(alertTime) =>{
    const token =  sessionStorage.getItem("token");

    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

      try {
        
        const response = await api.put('/user/alert/time/',"alertTimeInHours"=alertTime,config);

        console.log(response);
      } catch (error) {

        throw new Error(error.response.data);
        
      }

  }
  return (
    <>
    <Modal show={showAlertModal} onHide={() => setShowAlertModel(false)} >
        <Modal.Header closeButton className="modal-follower">
          <Modal.Title >Set Alert Time</Modal.Title>
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
          <button type="button" class="btn btn-primary">Save changes</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlertTime;
