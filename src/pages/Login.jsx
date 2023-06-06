import React, { useState, useContext } from "react"; // hook para guardar estado
import { AuthContext } from "../contexts/auth";
import Navb from "../components/Navbar";
import Mapb from "../components/Mapb";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate_register = useNavigate();
  const { authenticated, login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validatePassword = () => {
    const passRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$.;%^&*`~+=-])[A-Za-z\d!@#$.;%^&*`~,<>=+-]{8,}$/;

    return passRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      alert("Password invalid");

      return;
    }

    login(username, password);
  };

  return (
    <>
      <Navb />
      <Container className="container  d-flex " id="form-container">
        <Row className="justify-content-between ">
          <Col sm={6} className="" id="col-1">
            <h2>Welcome Back!</h2>
            <Form className="login-form ">
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="0x1337"
                  id="username"
                  name="username"
                  autoComplete="on"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="********"
                  id="password"
                  name="password"
                  autoComplete="off"
                />
              </Form.Group>

              <Button
                className="btn btn-light btn-outline-dark btn-lg"
                type="button"
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Form>
            <button
              className="link-btn"
              onClick={() => navigate_register("/register")}
            >
              Don't have an account? Register here.
            </button>
          </Col>

          <Col sm={6} className="col-2 ">
            <Mapb />
          </Col>
        </Row>
      </Container>
    </>
  );
};
