import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navb from "../components/Navbar";
import Mapb from "../components/Mapb";
import { AuthContext, AuthProvider } from "../contexts/auth";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const Register = (props) => {
  const navigate_home = useNavigate("");
  const navigate_login = useNavigate("");

  const { authenticated, login, register } = useContext(AuthContext);
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
      return;
    }


    register(username, password);
  };

  return (
    <>
      <Navb />
      <Container className="container  d-flex " id="form-container">
        <Row className="justify-content-between ">
          <Col sm={6} className="" id="col-1">
            <h2>Register</h2>
            <Form className="register-form" onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  value={username}
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="0x1337"
                  autoComplete="off"
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
                {!validatePassword() && (
                  <div className="password-validation-message">
                    Password must be at least 8 characters long and contain at
                    least one capital letter, one digit and one special
                    character.
                  </div>
                )}
              </Form.Group>
              <Button
                className="btn btn-light btn-outline-dark btn-lg"
                type="submit"
              >
                Register
              </Button>
            </Form>
            <button
              className="link-btn"
              onClick={() => navigate_login("/login")}
            >
              Already have an account? Login here.
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

export default Register;
