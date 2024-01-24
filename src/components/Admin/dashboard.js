import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./adminnavbar";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showCustomerBookings, setShowCustomerBookings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchCustomers();
    fetchCustomerBookings();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8182/Book/all");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8182/customer/getall");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  };

  const fetchCustomerBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8182/customerBook/getall");
      setCustomerBookings(response.data);
    } catch (error) {
      console.error("Error fetching customer bookings:", error.message);
    }
  };

  const navigateToUpdateBook = (bookId) => {
    navigate(`/admin/update/${bookId}`);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8182/Book/delete/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const renderUniqueCustomerBookings = (customerBookings) => {
    const uniqueCustomerBookings = [];
    const bookingIds = new Set();

    for (const booking of customerBookings) {
      if (!bookingIds.has(booking.id)) {
        uniqueCustomerBookings.push(booking);
        bookingIds.add(booking.id);
      }
    }

    return uniqueCustomerBookings;
  };

  const filterData = (data, query) => {
    const lowercaseQuery = query.toLowerCase();
    return data.filter(item => {
      return (
        (item.bookTitle && item.bookTitle.toLowerCase().includes(lowercaseQuery)) ||
        (item.author && item.author.toLowerCase().includes(lowercaseQuery)) ||
        (item.name && item.name.toLowerCase().includes(lowercaseQuery)) ||
        (item.city && item.city.toLowerCase().includes(lowercaseQuery)) ||
        (item.contact && item.contact.toLowerCase().includes(lowercaseQuery)) ||
        (item.issueDate && item.issueDate.toLowerCase().includes(lowercaseQuery)) ||
        (item.returnDate && item.returnDate.toLowerCase().includes(lowercaseQuery)) ||
        (item.amount && item.amount.toString().toLowerCase().includes(lowercaseQuery)) ||
        (item.isbn && item.isbn.toLowerCase().includes(lowercaseQuery))
      );
    });
  };

  const filteredBooks = filterData(books, searchQuery);
  const filteredCustomers = filterData(customers, searchQuery);
  const filteredCustomerBookings = filterData(customerBookings, searchQuery);

  const shouldShowBooks = showBooks || searchQuery !== '';
const shouldShowCustomers = showCustomers || searchQuery !== '';

  return (
    <div style={{ backgroundColor: "#15202B", minHeight: "100vh", color: "#FFFFFF", fontFamily: "Arial, sans-serif" }}>
      <AdminNavbar />

      <div className="container mt-5">
      <h1 className="mb-4 text-center" style={{ color: "#61dafb", fontSize: "3.5rem" }}>Admin Dashboard</h1>

        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontSize: "1.2rem" }}
          />
        </Form.Group>
        <br />

        <div className="text-center">
          <button
            className={`btn btn-${showBooks ? "danger" : "success"} mb-2 mx-2`}
            onClick={() => setShowBooks(!showBooks)}
            style={{ fontSize: "1.2rem" }}
          >
            {showBooks ? `Hide Books (${filteredBooks.length})` : `Show Books (${filteredBooks.length})`}
          </button>

          <button
            className={`btn btn-${showCustomers ? "danger" : "success"} mb-2 mx-2`}
            onClick={() => setShowCustomers(!showCustomers)}
            style={{ fontSize: "1.2rem" }}
          >
            {showCustomers ? `Hide Customers (${filteredCustomers.length})` : `Show Customers (${filteredCustomers.length})`}
          </button>

          <button
            className={`btn ${showCustomerBookings ? "btn-danger" : "btn-success"} mb-2 mx-2`}
            onClick={() => setShowCustomerBookings(!showCustomerBookings)}
            style={{ fontSize: "1.2rem" }}
          >
            {showCustomerBookings ? "Hide Customer Bookings" : "Show Customer Bookings"}
          </button>
        </div>

        {shouldShowBooks && (
          <div className="d-flex flex-wrap justify-content-center">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="m-2" style={{ width: "22rem", backgroundColor: "#343a40", color: "#FFFFFF", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#61dafb", fontSize: "1.5rem" }}>{book.bookTitle}</Card.Title>
                  <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
                  <Card.Text><strong>Price:</strong> {book.bookPrice}</Card.Text>
                  <Card.Text><strong>ISBN:</strong> {book.isbn}</Card.Text>
                  <Button variant="info" onClick={() => navigateToUpdateBook(book.id)} style={{ fontSize: "1.2rem" }}>
                    UPDATE
                  </Button> &nbsp;
                  <Button variant="danger" onClick={() => handleDeleteBook(book.id)} style={{ fontSize: "1.2rem" }}>
                    DELETE
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        {shouldShowCustomers && (
          <div className="d-flex flex-wrap justify-content-center">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="m-2" style={{ width: "18rem", backgroundColor: "#343a40", color: "#FFFFFF", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#61dafb", fontSize: "1.5rem" }}>{customer.name}</Card.Title>
                  <Card.Text><strong>City:</strong> {customer.city}</Card.Text>
                  <Card.Text><strong>Contact:</strong> {customer.contact}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
        {showCustomerBookings && (
          <div className="d-flex flex-wrap">
            {renderUniqueCustomerBookings(customerBookings).map((booking) => (
              <Card key={booking.id} className="m-2" style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Card.Body>
                  <Card.Title className="custom-card-title" style={{ fontWeight: "bold" }}>
                    {booking.customer ? booking.customer.name : " "}
                  </Card.Title>

                  <Card.Text className="custom-card-text" style={{ fontSize: "1rem" }}>
                    <strong>Book Title:</strong> {booking.book.bookTitle}
                  </Card.Text>
                  <Card.Text style={{ fontSize: "1.2rem", color: "#495057" }}>
                    <strong>Issue Date:</strong> {booking.issueDate}
                  </Card.Text>
                  <Card.Text style={{ fontSize: "1.2rem", color: "#495057" }}>
                    <strong>Return Date:</strong> {booking.returnDate}
                  </Card.Text>
                  <Card.Text style={{ fontSize: "1.2rem", color: "#ff4500" }}>
                    <strong>Fine Amount:</strong> ${booking.amount.toFixed(2)}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}

export default AdminDashboard;


