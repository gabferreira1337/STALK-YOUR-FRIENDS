import { Button } from "react-bootstrap";

import "../styles/coordinates.css";

export default function SOSBuser({ sosmode }) {
  return (
    <Button
      className={`btn btn-sm ${sosmode ? "btn-danger" : "btn-primary"}`}
      id="btn-2"
    >
      {sosmode ? "SOS ON" : "SOS OFF"}
    </Button>
  );
}
