import { useEffect, useState } from "react";
import Navbarcomponent from "../navbar";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useParams } from "react-router";

function PreviousOrders() {
  const { cid } = useParams();  

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    axios.get(`http://localhost:8182/customerBook/customerid/${cid}`)
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [cid]); 

  const calculateTotalFine = () => {
    return orders.reduce((total, order) => total + order.amount, 0);
  };

  return (
    <div>
      <div>
        <Navbarcomponent />
      </div>
      <h1>Previous orders</h1>
      <Table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Fine</th>
          
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.issueDate}</td>
              <td>{order.returnDate}</td>
              <td>{order.amount}</td>
             
            </tr>
          ))}
          <tr>
            <td colSpan="3"></td>
            <td>Total Fine: {calculateTotalFine()}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default PreviousOrders;