// components/Auth/Signup.js

import React from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import "./signup.css"; // Import the CSS file

function Signup() {
  
  return (
    <div className="Signup-container">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="Signup-title fw-bold mb-2 text-uppercase">
                    Create an Account
                  </h2>
                  <p className="mb-5">
                    Please fill in the following details to sign up!
                  </p>
                  <div className="mb-3">
                    <Form className="Signup-form">
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" required placeholder="Enter your name" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formNumber">
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control type="text" required placeholder="Enter your number" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" required placeholder="Enter email" />
                      </Form.Group>


                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>City / Town</Form.Label>
                        <Form.Control type="city" required placeholder="Enter city" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control type="pincode" required placeholder="Enter pincode" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Create Password</Form.Label>
                        <Form.Control type="password" required placeholder="Create password" />
                      </Form.Group>

                      

                      <div className="d-grid">
                        <Button className="Signup-btn" variant="primary" type="submit">
                          <a href="/">Sign Up</a>
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Already have an account?{" "}
                        <a href="/" className="text-primary fw-bold">
                          Login
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

export default Signup;
