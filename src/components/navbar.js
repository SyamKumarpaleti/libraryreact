import React, { useState } from 'react';
import { Form, Nav, Navbar } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Navbarcomponent({ func }) {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [qStr, setQStr] = useState('');

  const handlePreviousOrdersClick = () => {
    navigate(`/previous_orders/${cid}`);
  };

  return (
    <div >
      <Navbar bg="dark" data-bs-theme="dark" style={{ padding: 10, marginBottom: 0 }}>
        <Navbar.Brand><h2 style={{ margin: 0 }}>INFOLIBRA</h2></Navbar.Brand>
        <Nav className="me-auto mr-4">
          <Nav.Link onClick={handlePreviousOrdersClick}>Previous orders</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          
          {
            localStorage.getItem('isLoggedIn') ?
              <>
                <Navbar.Text>
                  Signed in as: <span style={{ color: "white" }}>{localStorage.getItem('username')}</span>
                </Navbar.Text>
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-info btn-sm ml-4" onClick={() => { localStorage.clear(); navigate('/auth/login?msg=you have logged out..') }}>
                  Logout
                </button>
              </>
              :
              <button className="btn btn-primary" onClick={() => navigate('/auth/login')}>Login</button>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navbarcomponent;
