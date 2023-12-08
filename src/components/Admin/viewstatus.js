import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import AdminNavbar from './adminnavbar';

function CustomersTable() {
  // Replace this with the actual logic to display the customers table
  return (
    <div>
      <h2>Customers Table</h2>
      <Table striped bordered hover>
        {/* Add the table headers and rows for customers */}
      </Table>
    </div>
  );
}

function BooksTable() {
  // Replace this with the actual logic to display the books table
  return (
    <div>
      <h2>Books Table</h2>
      <Table striped bordered hover>
        {/* Add the table headers and rows for books */}
      </Table>
    </div>
  );
}

function VSComponent() {
  const [showCustomersTable, setShowCustomersTable] = useState(false);
  const [showBooksTable, setShowBooksTable] = useState(false);

  const handleCustomersClick = () => {
    setShowCustomersTable(true);
    setShowBooksTable(false);
  };

  const handleBooksClick = () => {
    setShowBooksTable(true);
    setShowCustomersTable(false);
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
                <h4>No. of Customers: {/* Replace with the actual count of customers */}</h4>
              </Col>
              <Col>
                <h4>No. of Books: {/* Replace with the actual count of books */}</h4>
              </Col>
            </Row>
            {showCustomersTable && <CustomersTable />}
            {showBooksTable && <BooksTable />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VSComponent;