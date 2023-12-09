import React, { Component } from "react";
import { Button, Card, Row, Container, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "./adminnavbar";
import UpdateComponent from "./update";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: [],
      customer: [],
      customerBook: [],
      delBook: [],
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    axios.get("http://localhost:8182/Book/all").then((response) => {
      this.setState({ book: response.data });
    });
  }

  handleAllCustomers = () => {
    axios.get("http://localhost:8182/customer/getall").then((response) => {
      this.setState({ customer: response.data });
    });
  };

  handleAllCustomerBooks = () => {
    axios.get("http://localhost:8182/customerBook/getall").then((response) => {
      this.setState({ customerBook: response.data });
    });
  };

  handleDelete = (bookId) => {
    console.log("Deleting book with ID:", bookId);

    axios
      .delete(`http://localhost:8182/Book/delete/${bookId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ delBook: response.data });
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  render() {
    const { book, customer, customerBook } = this.state;

    return (
      <div>
        <AdminNavbar />
        <Container className="mt-5">
          <h1 className="text-center">Admin Dashboard</h1>
          <Button onClick={this.handleAllCustomers}>Get All Customers</Button>
          <Button onClick={this.handleAllCustomerBooks}>Get All Bookings</Button>

          <Row className="justify-content-md-center">
            <Col className="col-md-3 mb-3">
              {book.map((b, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card style={{ width: "400px", border: "1px solid #dee2e6", borderRadius: "0.25rem" }}>
                    <Card.Body>
                      <Link to={`/books?id=${b.id}`}>
                        <Card.Title>{b.bookTitle}</Card.Title>
                      </Link>
                      <hr />
                      <div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Rating:</span> {b.rating}
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Author:</span>
                            <Link to={`/authors?id=${b.id}`}>{b.author}</Link>
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Price:</span> {b.bookPrice}
                          </div>
                        </div>
                        <Button
                          onClick={() => this.props.history.push(`/admin/update/${b.id}`)}
                          style={{ width: 200, alignSelf: "center", margin: 15 }}
                          variant="outline-primary"
                        >
                          UPDATE
                        </Button>
                        <Button
                          onClick={() => this.handleDelete(b.id)}
                          style={{ width: 200, alignSelf: "center", margin: 15 }}
                          variant="outline-primary"
                        >
                          DELETE
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Col>

            <Col className="col-md-3 mb-3">
              {customer.map((c, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card style={{ width: "400px", border: "1px solid #dee2e6", borderRadius: "0.25rem" }}>
                    <Card.Body>
                      <Card.Title>{c.name}</Card.Title>
                      <hr />
                      <div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Contact:</span> {c.contact}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Col>

            <Col className="col-md-3 mb-3">
              {customerBook.map((cb, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card style={{ width: "400px", border: "1px solid #dee2e6", borderRadius: "0.25rem" }}>
                    <Card.Body>
                      <Card.Title>{cb.customer.name}</Card.Title>
                      <hr />
                      <div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                          <div>
                            <span style={{ fontWeight: "bold" }}>IssueDate:</span> {cb.issueDate}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminDashboard;
