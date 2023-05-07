import React, { useState, useContext } from "react";            // hook para guardar estado
import { AuthContext } from "../contexts/auth";
import Navb from "../components/Navbar";
import Mapb from "../components/Mapb";
import axios from "axios";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "../styles/login.css"
import { getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";


const LOGIN_URL = '/auth/login';


export const Login = (props) => {

    const navvigate_register = useNavigate();
    const {authenticated, login} = useContext(AuthContext);

    const [username, setUsername] = useState('');     /* save email email = getter setEmail = setter*/
    const [password, setPassword] = useState('');       // save password


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
        

        console.log("Hello",{username, password});
        login(username, password)              // context + api implementation
    }

    return (
        <>
        <Navb/>
        <Container className="container  d-flex " id="form-container">
        <Row className="justify-content-between ">
            <Col sm={6} className="" id="col-1">
            <h2>Welcome Back!</h2>
            <Form className="login-form " onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                <Form.Label htmlFor="username">username</Form.Label>
                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)}type="text" placeholder="0x1337" id="username" name="username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Label htmlFor="password">password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                </Form.Group>

                <Button className="btn btn-light btn-outline-dark btn-lg" type="submit">Log In</Button>
            </Form>
            <button className="link-btn" onClick={() => navvigate_register('/register')}>Don't have an account? Register here.</button>
            </Col>

            <Col sm={6} className="col-2 " >

                <Mapb/>
             </Col>
            </Row>

        </Container>

        </>
    )

    /*return (
        <>
        <Navbar/>
        <div className="auth-form-container">
            <h2>Welcome Back!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="text" placeholder="0x1337" id="username" name="username" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button className="btn btn-light btn-outline-dark btn-lg" type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
        </>
    )*/
}