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
      // Refresh the books list after deletion
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
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => navigateToUpdateBook(book.id)}
                  >
                    UPDATE
                  </Button>
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































// import React, { Component } from "react";
// import { Button, Card, Row, Container, Col } from "react-bootstrap";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import AdminNavbar from "./adminnavbar";
// import UpdateComponent from "./update";

// class AdminDashboard extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       book: [],
//       customer: [],
//       customerBook: [],
//       delBook: [],
//     };
//   }

//   componentDidMount() {
//     this.fetchBooks();
//   }

//   fetchBooks() {
//     axios.get("http://localhost:8182/Book/all").then((response) => {
//       this.setState({ book: response.data });
//     });
//   }

//   handleAllCustomers = () => {
//     axios.get("http://localhost:8182/customer/getall").then((response) => {
//       this.setState({ customer: response.data });
//     });
//   };

//   handleAllCustomerBooks = () => {
//     axios.get("http://localhost:8182/customerBook/getall").then((response) => {
//       this.setState({ customerBook: response.data });
//     });
//   };

//   handleDelete = (bookId) => {
//     console.log("Deleting book with ID:", bookId);

//     axios
//       .delete(`http://localhost:8182/Book/delete/${bookId}`)
//       .then((response) => {
//         console.log(response.data);
//         this.setState({ delBook: response.data });
//       })
//       .catch((error) => {
//         console.error("Error deleting book:", error);
//       });
//   };

//   render() {
//     const { book, customer, customerBook } = this.state;

//     return (
//       <div>
//         <AdminNavbar />
//         <Container className="mt-5">
//           <h1 className="text-center">Admin Dashboard</h1>
//           <Button onClick={this.handleAllCustomers}>Get All Customers</Button>
//           <Button onClick={this.handleAllCustomerBooks}>Get All Bookings</Button>

//           <Row className="justify-content-md-center">
//             <Col className="col-md-3 mb-3">
//               {book.map((b, index) => (
//                 <div key={index} className="col-md-4 mb-4">
//                   <Card style={{ width: "400px", border: "1px solid #dee2e6", borderRadius: "0.25rem" }}>
//                     <Card.Body>
//                       <Link to={`/books?id=${b.id}`}>
//                         <Card.Title>{b.bookTitle}</Card.Title>
//                       </Link>
//                       <hr />
//                       <div>
//                         <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
//                           <div>
//                             <span style={{ fontWeight: "bold" }}>Rating:</span> {b.rating}
//                           </div>
//                           <div>
//                             <span style={{ fontWeight: "bold" }}>Author:</span>
//                             <Link to={`/authors?id=${b.id}`}>{b.author}</Link>
//                           </div>
//                           <div>
//                             <span style={{ fontWeight: "bold" }}>Price:</span> {b.bookPrice}
//                           </div>
//                         </div>
//                         <Button
//                           onClick={() => this.props.history.push(`/admin/update/${b.id}`)}
//                           style={{ width: 200, alignSelf: "center", margin: 15 }}
//                           variant="outline-primary"
//                         >
//                           UPDATE
//                         </Button>
//                         <Button
//                           onClick={() => this.handleDelete(b.id)}
//                           style={{ width: 200, alignSelf: "center", margin: 15 }}
//                           variant="outline-primary"
//                         >
//                           DELETE
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </div>
//               ))}
//             </Col>

//             <Col className="col-md-3 mb-3">
//               {customer.map((c, index) => (
//                 <div key={index} className="col-md-4 mb-4">
//                   <Card style={{ width: "400px", border: "1px solid #dee2e6", borderRadius: "0.25rem" }}>
//                     <Card.Body>
//                       <Card.Title>{c.name}</Card.Title>
//                       <hr />
//                       <div>
//                         <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
//                           <div>
//                             <span style={{ fontWeight: "bold" }}>Contact:</span> {c.contact}
//                           </div>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </div>
//               ))}
//             </Col>

//             <Col className="col-md-3 mb-3">
//               {customerBook.map((cb, index) => (
//                 <div key={index} className="col-md-4 mb-4">
//                   <Card style={{ width: "400px", border: "1px solid #dee2e6", borderRadius: "0.25rem" }}>
//                     <Card.Body>
//                       <Card.Title>{cb.customer.name}</Card.Title>
//                       <hr />
//                       <div>
//                         <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
//                           <div>
//                             <span style={{ fontWeight: "bold" }}>IssueDate:</span> {cb.issueDate}
//                           </div>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </div>
//               ))}
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// export default AdminDashboard;
