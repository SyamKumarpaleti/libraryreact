import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import AdminNavbar from './adminnavbar';
import axios from 'axios';
import { useParams } from 'react-router';

function CustomersTable() {
  const {id}=useParams();
  return (
    <div>
      <h2>Customers Table</h2>
      <Table striped bordered hover>
       
      </Table>
    </div>
  );
}

function BooksTable() {
  return (
    <div>
      <h2>Books Table</h2>
      <Table striped bordered hover>
       
      </Table>
    </div>
  );
}

function VSComponent() {
  const [showCustomersTable, setShowCustomersTable] = useState(false);
  const [showBooksTable, setShowBooksTable] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookId,customerId]=useState([])

  const handleCustomersClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8182/customerBook/customerid/${customerId}`);
      setCustomers(response.data);
      setShowCustomersTable(true);
      setShowBooksTable(false);
    } catch (error) {
      console.error('Error fetching customers:', error.message);
    }
  };
  

  const handleBooksClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8182/customerBook/bookid/${bookId}`);
      setBooks(response.data);
      setShowBooksTable(true);
      setShowCustomersTable(false);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container fluid>
        <Row>
          <Col md={3}>
            <h2>Overview</h2>
            <Button onClick={handleCustomersClick}>Customers</Button><br /><br />
            <Button onClick={handleBooksClick}>Books</Button>
          </Col>
          <Col md={9}>
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Search" />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>No. of Customers: {customers.length}</h4>
              </Col>
              <Col>
                <h4>No. of Books: {books.length}</h4>
              </Col>
            </Row>
            {showCustomersTable && <CustomersTable customers={customers} />}
            {showBooksTable && <BooksTable books={books} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default VSComponent;
