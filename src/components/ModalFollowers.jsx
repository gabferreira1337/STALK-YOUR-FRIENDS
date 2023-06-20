import React from "react";
import { Modal } from "react-bootstrap";
import Followers from "./Followers";
import "../styles/coordinates.css";
import "../styles/ModalFollowers.css";

export default function ModalFollowers({
  showmodal,
  setShowmodal,
  addedfollower,
  setAddedFollower,
}) {
  return (
    <>
      <Modal
        show={showmodal}
        onHide={() => setShowmodal(false)}
        id="modal-follower"
      >
        <Modal.Header closeButton className="modal-follower">
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-follower">
          <div
            className="follower-div"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Followers
              addedfollower={addedfollower}
              setAddedFollower={setAddedFollower}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
