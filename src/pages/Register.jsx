import React, { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { createSession } from '../services/api';
import Navb from "../components/Navbar";
import Mapb from "../components/Mapb";
import axios from "axios";
import  {AuthContext, AuthProvider}  from "../contexts/auth";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const Register = (props) => {
    
    const navigate_home = useNavigate('');
    const {authenticated, login,register} = useContext(AuthContext);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    // stop using default action of form

    const validatePassword = () => {
        const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passRegex.test(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            alert('Password must be at least 8 characters long and contain at least one capital letter');
            return;
        }

       // console.log("submit");

        register(firstname,lastname,email,password);
       
    }

    return (
        <>
        <Navb/>
        <Container className="container  d-flex " id="form-container">
        <Row className="justify-content-between ">
            <Col sm={6} className="" id="col-1">
            <h2>Register</h2>
            <Form className="register-form" onSubmit={handleSubmit}>

            <Form.Group controlId="formBasicFirsName">
            <Form.Label htmlFor="fname">First name</Form.Label>
            <Form.Control value={firstname} name="firstname" onChange={(e) => setFirstName(e.target.value)} id="firstname" placeholder="first Name" />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
            <Form.Label htmlFor="lastname">Last name</Form.Label>
            <Form.Control value={lastname}  onChange={(e) => setLastName(e.target.value)}  placeholder="Doe" id="password" name="password" />
            </Form.Group>

            <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            </Form.Group>
            <Button className="btn btn-light btn-outline-dark btn-lg" type="submit">Register</Button>
        </Form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </Col>
         <Col sm={6} className="col-2 " >
            <Mapb/>
         </Col>
         </Row>
    </Container>
    </>
    )
}




export default Register