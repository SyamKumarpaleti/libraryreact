import { useEffect, useState } from "react";
import Navbarcomponent from "../navbar";
import axios from "axios";
import { Card, Row } from "react-bootstrap";
import { useParams } from "react-router";

function BookingStatus() {
  const [customerBook, setCustomerBook] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8182/customerBook/customerid/${id}`)
      .then((response) => {
        console.log("API response:", response.data);
        setCustomerBook(response.data);
      })
      .catch((error) => console.error("Error fetching customer books:", error));
  }, [id]);

  return (
    <div>
      <div>
        <Navbarcomponent />
      </div>
  {customerBook.map((cb, index) => (
    <div key={index} className="col-md-4 mb-4">
      <Card style={{ width: "400px", border: "1px solid #dee2e6", borderRadius: "0.25rem", marginBottom: "20px" }}>
        <Card.Body>
          <Card.Title>{cb.customer.name}</Card.Title>
          <hr />
          <div>
          <div>
              <span style={{ fontWeight: "bold" }}>Id :</span> {cb.id}
            </div>
          
            <div>
              <span style={{ fontWeight: "bold" }}>Issue Date:</span> {cb.issueDate}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Return Date:</span> {cb.returnDate}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Fine:</span> {cb.amount}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  ))}




    </div>
  );
}

export default BookingStatus;
