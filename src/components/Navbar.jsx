import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Row, Col } from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/nav.css";

export default function Navb() {
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
            <NavDropdown
              className="about"
              title="About"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
