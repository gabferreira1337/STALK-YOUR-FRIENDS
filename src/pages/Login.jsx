import React, { useState, useContext } from "react";            // hook para guardar estado
import { AuthContext } from "../contexts/auth";
import Navb from "../components/Navbar";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "../styles/login.css"



export const Login = (props) => {


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
        <Container className="container-lg border border-light " id="form-container">
        <Row>
            <Col sm={6} className="">
            <h2>Welcome Back!</h2>
            <Form className="login-form " onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                <Form.Label htmlFor="username">username</Form.Label>
                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)}type="text" placeholder="0x1337" id="username" name="username" />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                <Form.Label htmlFor="password">password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                </Form.Group>

                <Button className="btn btn-light btn-outline-dark btn-lg" type="submit">Log In</Button>
            </Form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
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