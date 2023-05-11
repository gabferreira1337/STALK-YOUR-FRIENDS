import React, {useEffect, useContext,useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  "../styles/nav.css";
import { AuthContext } from "../contexts/auth";








export default function NavbAuth() {

  const {logout} = useContext(AuthContext);

    return(

      <Navbar  className="navbar text-white "  expand="lg" id='nav'>
      <Container>
        <Navbar.Brand className="title" href="/">STALK YOUR FRIENDS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav text-white"  variant='light' />
        <Navbar.Collapse className="text-white  me-auto"id="basic-navbar-nav">
          <Nav className=" me-auto " variant='light' >
            <NavDropdown className="about" title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/account">Overview</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={() => logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
         
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }


