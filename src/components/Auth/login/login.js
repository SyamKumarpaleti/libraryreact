// components/Auth/login/Login.js

import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import './login.css'; // Import the CSS file
import { useSearchParams } from "react-router-dom";

function Login() {
  const [param] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    // Assuming your Spring Boot backend is running on http://localhost:8182
    const apiUrl = "http://localhost:8182/user/login";
    const formData = new FormData(event.target);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle successful login
        console.log("Login successful");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Welcome to INFOLIBRA</h2>
                  <p className="mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="checkbox-container">
                            <Form.Check
                              type="checkbox"
                              label="Show Password"
                              onChange={togglePasswordVisibility}
                            />
                          </div>
                          <p className="small checkbox-label">
                            <a className="text-primary" href="#!">
                              Forgot password?
                            </a>
                          </p>
                        </div>
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Don't have an account?{" "}
                        <a href="/auth/signup" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
