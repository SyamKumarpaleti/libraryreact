import React, { useEffect, useState } from "react";
import Navbarcomponent from "../navbar";
import axios from "axios";
import { Card, Row } from "react-bootstrap";
import { useParams } from "react-router";

function BookingStatus() {
  const [customerBook, setCustomerBook] = useState([]);
  const { id } = useParams();
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8182/customerBook/customerid/${id}`)
      .then((response) => {
        setCustomerBook(response.data);
        calculateTotals(response.data);
      })
      .catch((error) => console.error("Error fetching customer books:", error));
  }, [id]);

  const calculateTotals = (data) => {
    let uniqueBooks = new Set();
    let amount = 0;

    data.forEach((cb) => {
      uniqueBooks.add(cb.id);
      amount += cb.amount;
    });

    setTotalBooks(uniqueBooks.size);
    setTotalAmount(amount);
  };

  return (
    <div>
      <Navbarcomponent />
      <Row>
  {customerBook.map((cb, index) => (
    <div key={index} className="col-md-4 mb-4">
      <Card
        style={{
          width: "450px",
          border: "2px solid #3498db",
          borderRadius: "0.5rem",
          marginBottom: "30px",
          boxShadow: "0 8px 16px rgba(52, 152, 219, 0.2)",
          transition: "transform 0.3s ease-in-out",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        <Card.Body>
          <Card.Title
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#3498db",
            }}
          >
            BookId: {cb.id}
          </Card.Title>
          <hr />
          <div>
            <div>
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Name:</span>{" "}
              {cb.book.bookTitle}
            </div>
            <div>
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Issue Date:</span>{" "}
              {cb.issueDate}
            </div>
            <div>
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Return Date:</span>{" "}
              {cb.returnDate}
            </div>
            <div>
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Fine:</span> ${cb.amount}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  ))}
</Row>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h4>Total Books: {totalBooks}</h4>
        <h4>Total Amount: ${totalAmount}</h4>
      </div>
      <h1>Booked Successfully</h1>
    </div>
  );
}

export default BookingStatus;
