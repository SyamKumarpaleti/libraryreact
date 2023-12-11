

import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import "./signup.css";
import { useNavigate } from "react-router";
import axios from "axios";

function Signup() {
  const [name,setName] = useState('');
  const [contact,setContact] = useState('');
  const [city,setCity] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [showPassword,setShowPassword]=useState([]); 



  const[customer,setCustomer]=useState({});
  const navigate = useNavigate();
  const [msg,setMsg] = useState('');
  const contactRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  

  

  const doSignUp=(e)=>{
    e.preventDefault();
    if (!contactRegex.test(contact)) {
      setMsg('Invalid contact number');
      return;
    }

    if (!emailRegex.test(email)) {
      setMsg('Invalid email address');
      return;
    }

    
    let customerObj={
      "name":name,
      "contact":contact,
      "email":email,
      "city":city,
      "user":{
        "username":username,
        "password":password

      }

    }
    axios.post('http://localhost:8182/customer/post',customerObj)
        .then(response=>{
            setCustomer(response.data)
            navigate('/auth/login')
        })
        .catch(function(error){
            setMsg('Issue in processing sign up')
        })

  }
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
                        <Form.Control type="text" name="name" onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formNumber">
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control type="text" name="contactno" onChange={(e) => setContact(e.target.value)} required placeholder="Enter your number" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" name="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your number" />
                        
                      </Form.Group>


                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>City / Town</Form.Label>
                        <Form.Control type="text" name="city" onChange={(e) => setCity(e.target.value)} required placeholder="Enter your number" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type="text" name="username" onChange={(e) => setUsername(e.target.value)} required placeholder="Enter your number" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Create Password</Form.Label>
                        <Form.Control type={showPassword? "text":"password"} onChange={(e) => setPassword(e.target.value)} required placeholder="Create password" />
                      
                      </Form.Group>

                      

                      <div className="d-grid">
                        <Button className="Signup-btn" variant="primary" type="submit" onClick={doSignUp}>
                          <a href="/">Sign Up</a>
                        </Button>
                      </div> 
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Already have an account?{" "}
                        <a href="/" className="text-primary fw-bold" onClick={() => navigate("/user/login")}>
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
