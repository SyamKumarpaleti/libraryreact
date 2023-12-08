// ... (your imports)
import React, { useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbarcomponent from "../navbar";
import axios from "axios";

// TotalInfoCard component
function TotalInfoCard({ totalBooks, totalPrice }) {
  return (
    <Card
      style={{
        width: '400px',
        backgroundColor: '#your_card_background_color_here',
        marginBottom: '20px',
      }}
    >
      <Card.Body
        style={{
          backgroundColor: '#your_card_body_background_color_here',
        }}
      >
        <Card.Title>Total Information</Card.Title>
        <hr />
        <div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Total Books:</span> {totalBooks}
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Total Price:</span> ${totalPrice}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

// CartComponent
function CartComponent({ cart, setCart }) {
  const {cid}=useParams();
  const navigate = useNavigate();

  const HandleButtonClick = async () => {
    try {
      const customerId = cid; // Assuming you have the customer ID from useParams
      //const [returnDate,setReturnDate]= useState('');

      // Assuming your API endpoint is /api/create/{cid}
      const response = await axios.post(`http://localhost:8182/customerBook/customerid/${customerId}`, {
  books: cart,
});


      if (response.status === 200) {
        // Successfully created customer books
        setCart([]); // Clear the cart after purchase
        navigate("/booking");
      } else {
        console.error(`Error: ${response.data}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, book) => sum + book.bookPrice, 0);
  const totalBooks = cart.length;

  return (
    <div>
      <div>
        <Navbarcomponent />
      </div>

      <br />
      <h2>Cart</h2>
      <br />
      <br />
      <br />
      <br />
      <div className="container col-md-8">
        <Row>
          {cart.map((b, index) => (
            <div key={index} className="col-md-4 mb-4">
              {/* Your existing card code */}
              <Card
                style={{
                  width: '400px',
                  backgroundColor: '#your_card_background_color_here',
                }}
              >
                <Card.Body
                  style={{
                    backgroundColor: '#your_card_body_background_color_here',
                  }}
                >
                  <Link to={'/books?id=' + b.id}>
                    <Card.Title>{b.bookTitle}</Card.Title>
                  </Link>
                  <hr />
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '10px',
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Rating:</span>{' '}
                        {b.rating}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Author:</span>
                        <Link to={'/authors?id=' + b.id}>{b.author}</Link>
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Category:</span>{' '}
                        {b.category.name}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Price:</span>{' '}
                        {b.bookPrice}
                      </div>
                      <Button
                        onClick={() =>
                          setCart((prevCart) =>
                            prevCart.filter((item) => item.id !== b.id)
                          )
                        }
                      >
                        Remove from Cart
                      </Button>
                      <span style={{ margin: '0 5px' }}>{b.quantity}</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
          <div class="page-content page-container" id="page-content">
            <div class="padding">
              <div class="row container d-flex justify-content-center">
                
              </div>
              <br /><br /><br /><br />
              {/* Add the TotalInfoCard component below the button */}
              <div className="col-md-4 mb-4 mx-auto d-flex justify-content-center">
            <TotalInfoCard totalBooks={totalBooks} totalPrice={totalPrice} />
          </div>
              <button
                  type="button"
                  onClick={HandleButtonClick}
                  class="btn btn-success btn-icon-text bouncebutton"
                  style={{ fontSize: '30px' }}
                >
                  <i class="fa fa-check btn-icon-prepend"></i>Proceed to Purchase
                </button>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default CartComponent;
