import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./adminnavbar";

function AdminDashboard() {
  const {id}=useParams();
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showCustomerBookings, setShowCustomerBookings] = useState(false);
  const navigate = useNavigate(); // Use navigate hook for navigation

  useEffect(() => {
    // Fetch data when component mounts
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

  const navigateToAddBook = () => {
    navigate(`/admin/add/${id}`);
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
  const renderUniqueBooks = (books) => {
    const uniqueBooks = [];
    const bookIds = new Set();

    for (const book of books) {
      if (!bookIds.has(book.id)) {
        uniqueBooks.push(book);
        bookIds.add(book.id);
      }
    }

    return uniqueBooks;
  };

  const renderUniqueCustomers = (customers) => {
    const uniqueCustomers = [];
    const customerIds = new Set();

    for (const customer of customers) {
      if (!customerIds.has(customer.id)) {
        uniqueCustomers.push(customer);
        customerIds.add(customer.id);
      }
    }

    return uniqueCustomers;
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
 

  return (
    <div>
      <AdminNavbar />

      <div className="container mt-5">
        <h1 className="mb-4">Admin Dashboard</h1>

        <button
          className={`btn ${showBooks ? "btn-danger" : "btn-success"} mb-2`}
          onClick={() => setShowBooks(!showBooks)}
        >
          {showBooks ? `Hide Books (${books.length})` : `Show Books (${books.length})`}
        </button>

        {showBooks && (
          <div className="d-flex flex-wrap">
            {books.map((book) => (
              <Card key={book.id} className="m-2" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{book.bookTitle}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {book.author}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> {book.bookPrice}
                  </Card.Text>
                  <Card.Text>
                    <strong>ISBN:</strong> {book.isbn}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => navigateToAddBook()}
                  >
                    ADD
                  </Button> &nbsp;
                  <Button
                    variant="info"
                    onClick={() => navigateToUpdateBook(book.id)}
                  >
                    UPDATE
                  </Button> &nbsp;
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    DELETE
                  </Button>
                 
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        &nbsp;&nbsp;&nbsp;&nbsp;

        <button
          className={`btn ${showCustomers ? "btn-danger" : "btn-success"} mb-2 ml-2`}
          onClick={() => setShowCustomers(!showCustomers)}
        >
          {showCustomers ? `Hide Customers (${customers.length})` : `Show Customers (${customers.length})`}
        </button>

        {showCustomers && (
          <div className="d-flex flex-wrap">
            {customers.map((customer) => (
              <Card key={customer.id} className="m-2" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{customer.name}</Card.Title>
                  <Card.Text>
                    <strong>City:</strong> {customer.city}
                  </Card.Text>
                  <Card.Text>
                    <strong>Contact:</strong> {customer.contact}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        &nbsp;&nbsp;&nbsp;&nbsp;

        <button
          className={`btn ${showCustomerBookings ? "btn-danger" : "btn-success"} mb-2 ml-2`}
          onClick={() => setShowCustomerBookings(!showCustomerBookings)}
        >
          {showCustomerBookings ? "Hide Customer Bookings" : "Show Customer Bookings"}
        </button>

        {showCustomerBookings && (
          <div className="d-flex flex-wrap">
            {renderUniqueCustomerBookings(customerBookings).map((booking) => (
              <Card key={booking.id} className="m-2" style={{ width: "18rem" }}>
                
                <Card.Body>
                  <Card.Title>{booking.customer ? booking.customer.name : ""}</Card.Title>
                  <Card.Text>
                    <strong>Issue Date:</strong> {booking.issueDate}
                  </Card.Text>
                  <Card.Text>
                    <strong>Return Date:</strong> {booking.returnDate}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fine Amount:</strong> {booking.amount}
                  </Card.Text>
                  <Card.Text>
                    <strong>Book id:</strong> {booking.id}
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
