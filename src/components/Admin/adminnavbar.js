import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useParams } from 'react-router';

function AdminNavbar({ func }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qStr, setQStr] = useState('');

  return (
    <div className='mb-4' >
      <Navbar bg="dark" data-bs-theme="dark" style={{ padding: 10 }}>
        <Navbar.Brand><h2>INFOLIBRA</h2></Navbar.Brand>
        <Nav className="me-auto  mr-4">
          <Nav.Link onClick={() => navigate(`/admin/dashboard/${id}`)}>Admin Dashboard</Nav.Link>
          <Nav.Link onClick={() => navigate(`/admin/add/${id}`)}>ADD BOOK</Nav.Link>
          
       
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Form onSubmit={(e) => { e.preventDefault(); func(qStr) }}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setQStr(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {localStorage.getItem('isLoggedIn') ?
            <>
              <Navbar.Text>
                Signed in as: <span style={{ color: "white" }}>{localStorage.getItem('username')}</span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-info btn-sm ml-4" onClick={() => {
                localStorage.clear();
                navigate('/auth/login?msg=you have logged out..');
              }}>Logout</button>
            </>
            :
            <button className="btn btn-primary" onClick={() => navigate('/auth/login')}>Login</button>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AdminNavbar;
