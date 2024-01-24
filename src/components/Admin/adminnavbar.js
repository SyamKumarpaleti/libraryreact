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
     <Navbar bg="dark" variant="dark" style={{ padding: 10 }}>
  <Navbar.Brand style={{ fontSize: '2rem', color: '#61dafb' }}><h2>INFOLIBRA</h2></Navbar.Brand>
  <Nav className="me-auto mr-4">
    <Nav.Link style={{ fontSize: '1.2rem', color: 'white' }} onClick={() => navigate(`/admin/dashboard/${id}`)}>Admin Dashboard</Nav.Link>
    <Nav.Link style={{ fontSize: '1.2rem', color: 'white' }} onClick={() => navigate(`/admin/add/${id}`)}>ADD BOOK</Nav.Link>
  </Nav>
  <Navbar.Collapse className="justify-content-end">
    {localStorage.getItem('isLoggedIn') ?
      <>
        <Navbar.Text style={{ fontSize: '1.2rem', color: 'white' }}>
          Signed in as: <span style={{ color: "#61dafb" }}>{localStorage.getItem('username')}</span>
        </Navbar.Text>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-info btn-sm ml-4" style={{ fontSize: '1rem' }} onClick={() => {
          localStorage.clear();
          navigate('/auth/login?msg=you have logged out..');
        }}>Logout</button>
      </>
      :
      <button className="btn btn-primary" style={{ fontSize: '1rem' }} onClick={() => navigate('/auth/login')}>Login</button>
    }
  </Navbar.Collapse>
</Navbar>

    </div>
  );
}

export default AdminNavbar;
