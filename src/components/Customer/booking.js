import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Navbarcomponent from '../navbar';
import { useNavigate } from 'react-router-dom';

function BookingComponent({ cart }) {
  const navigate = useNavigate();

  const handleCancelClick = () => {
   
    navigate('/cart');
  };

  const handleContinueClick = () => {
   
    navigate('/bookingStatus');
  };

 
  if (!cart) {
    return (
      <div>
        <div>
          <Navbarcomponent />
        </div>
        <div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, book) => sum + book.bookPrice, 0);
  const totalBooks = cart.length;

  return (
    <div>
      <div>
        <Navbarcomponent />
      </div>
      <div>
        <h1>Booking Info...</h1>
        <Card style={{ width: '18rem', margin: '20px' }} className="mx-auto text-center">
          <Card.Body>
            <Card.Title style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}></Card.Title>
            <Card.Text style={{ fontSize: '18px', marginBottom: '10px' }}>
              <p>Total Price: ${totalPrice}</p>
              <p>Total Books to Buy: {totalBooks}</p>
            </Card.Text>
            <Button variant="success" onClick={handleCancelClick}>
              Cancel
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="success" onClick={handleContinueClick}>
              Continue
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default BookingComponent;
