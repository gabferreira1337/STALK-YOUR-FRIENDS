import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/nav.css";

export default function Navb() {
  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>
      This is a project for a location tracking application that allows users to
      register their locations and share them with their friends.
    </Tooltip>
  );
  return (
    <Navbar className="navbar text-white " expand="lg" id="nav">
      <Container>
        <Navbar.Brand className="title" href="/login">
          STALK YOUR FRIENDS
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav text-white"
          variant="light"
        />
        <Navbar.Collapse className="text-white me-auto" id="basic-navbar-nav">
          <Nav className="me-auto" variant="light">
            <OverlayTrigger
              placement="bottom"
              trigger="click"
              overlay={renderTooltip}
              rootClose
            >
              <NavDropdown
                className="about"
                title="About"
                id="basic-nav-dropdown"
                disabled
              ></NavDropdown>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
