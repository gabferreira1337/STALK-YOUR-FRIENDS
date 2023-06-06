import React from "react";
import { Modal, Button } from "react-bootstrap";
import Followers from "./Followers";
import "../styles/coordinates.css";
import "../styles/ModalFollowers.css"

export default function ModalFollowers({
  showmodal,
  setShowmodal,
}) {
  return (
    <>
      <Modal show={showmodal} onHide={() => setShowmodal(false)} >
        <Modal.Header closeButton className="modal-follower">
          <Modal.Title >Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-follower">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
           <Followers />
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-follower">
          <Button variant="secondary" onClick={() => setShowmodal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
