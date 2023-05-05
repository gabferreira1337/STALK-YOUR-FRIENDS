import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  "../styles/nav.css"
import {Link} from "react-router-dom" ;

const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';

export default function Navb() {

    return(

      <Navbar  className="navbar text-white border border-light"  expand="lg" id='nav'>
      <Container>
        <Navbar.Brand className="title" href="/login">STALK YOUR FRIENDS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="text-white  me-auto"id="basic-navbar-nav">
          <Nav className="text-white  me-auto">
            <NavDropdown className="about" title="About" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">About</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );

   /* return (
      <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/login" className="navbar-logo">
            SOSOSOS
          </Link>
        </div>
      </nav>
        
      </>
    )*/
  }


