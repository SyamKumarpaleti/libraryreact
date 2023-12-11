// components/Auth/login/Login.js
import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const doLogin = (e) => {
    e.preventDefault();
    let token = window.btoa(username + ':' + password);
    axios.post('http://localhost:8182/auth/login', {}, {
      headers: {
        'Authorization': 'Basic ' + token
      }
    })
      .then(function (response) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('isLoggedIn', true);
        let role = response.data.user.role;
        switch (role) {
          case 'Admin':
            navigate('/admin/dashboard/'+response.data.id)
            break;
          case 'CUSTOMER':
            navigate('/customer/dashboard/'+response.data.id)
            break;
          default:
        }
      })
      .catch(function (error) {
        setMsg('Invalid Credintials');
      });
  };

  return (
    <div style={{ backgroundImage: 'url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wallpaperflare.com%2Fsearch%3Fwallpaper%3Dlibrary&psig=AOvVaw0HLlVbHn42M1nw0062Bx9W&ust=1702355243192000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCLjsws7FhoMDFQAAAAAdAAAAABAE")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: "100vh" }}>
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
                    <Form onSubmit={doLogin}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
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
