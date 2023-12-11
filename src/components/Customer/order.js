import React from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function BookingPage() {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  if (!bookingData || !bookingData.cart) {
    
    return (
      <div>
        <h2>Invalid Booking Data</h2>
       
      </div>
    );
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>Booking ID: {bookingData.id}</Card.Title>
          <Card.Text>
            Issue Date: {bookingData.issueDate}<br />
            Return Date: {bookingData.returnDate}<br />
            Amount: {bookingData.amount}<br />
            
            <h4>Cart Items:</h4>
            {bookingData.cart.map((book, index) => (
              <div key={index}>
                <p>Title: {book.bookTitle}</p>
                <p>Author: {book.author}</p>
                <p>Price: {book.bookPrice}</p>
                <p>Quantity: {book.quantity}</p>
                <hr />
              </div>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
      
    </div>
  );
}

export default BookingPage;
