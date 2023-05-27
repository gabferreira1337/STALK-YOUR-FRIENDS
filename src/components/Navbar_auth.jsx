import React, { useEffect, useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/nav.css";
import { AuthContext } from "../contexts/auth";
import  SOS  from "../components/SOS";

export default function NavbAuth() {
  const { logout } = useContext(AuthContext);

  const navigate_account = useNavigate();

  function handleClick() {
    navigate_account("/account");
  }

  return (
    <Navbar className="navbar text-white" expand="lg" id="nav">
      <Container className="nav-auth">
        <Navbar.Brand className="title " href="/">
          STALK YOUR FRIENDS
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav text-white"
          variant="light"
        />
        
        <Navbar.Collapse className="text-white  me-auto" id="basic-navbar-nav">
          <Nav className=" me-auto " variant="light">
            <NavDropdown
              className="about "
              title="Account"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => handleClick()}>
                Overview
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
