import { useEffect, useState } from "react";

import Login from "../Auth/login/login";
import Books from "./book";
import eternity from "/JAVA react/react_ui/library/library/src/assets/download.jpeg"
import { useSearchParams } from "react-router-dom";
import NavbarComponent from "../navbar";
import axios from "axios";


import { Button, Card, CardHeader, Image, ListGroup, ListGroupItem, Nav, Row } from "react-bootstrap";

function CustomerDashboard() {
  const [param] = useSearchParams();
  const [qStr, setQstr] = useState('');
  const [book, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8182/Book/all')
      .then(response => setBooks(response.data))
     
      axios.get('http://localhost:8182/category/getall')
      .then(response => setCategories(response.data))
      .catch(error => setMsg('Error in Fetching categories'));
  },[ ])




  const searchBooks = (str) => {
    console.log('search func in parent comp called.....' + str)
    setQstr(str);
  };

  const headingStyle = {
    fontFamily: 'Verdana, sans-serif',
    fontSize: '28px',
    color: '#4CAF50', // Green color
    fontWeight: 'bold',
    margin: '10px 0',
  };


  const getbookcategory = async (id) => {
    
      
      setLoading(true);
      const response = await axios.get(`http://localhost:8182/customer/getbycategoryid?id=${id}`);

      console.log('API response:', response);
      setBooks(response.data || []);
     
    
  };





  // const process = () => {
  //     if (!param.get('page')) {
  //         return (
  //             <div>
  //                 <h2 style={headingStyle}>WELCOME TO INFOLIBRA</h2>
  //                 <HomeComponent strVal={qStr} />
  //             </div>
  //         );
  //     }
  //     if (param.get('page') === 'books') {
  //         return (
  //             <div>
  //                 <h2 style={headingStyle}>Books Page</h2>
  //                 <Books />
  //             </div>
  //         );
  //     }
  //     if (param.get('page') === 'cart') {
  //         return (
  //             <div>
  //                 <h1 style={{ color: '#FF5733' }}>Cart Page</h1>
  //             </div>
  //         );
  //     }
  //     if (param.get('page') === 'previous_orders') {
  //         if (localStorage.getItem('isLoggedIn') === null) {
  //             localStorage.setItem('url', '/customer/dashboard?page=previous_orders');
  //             return (
  //                 <div>
  //                     <h2 style={headingStyle}>Login Required</h2>
  //                     <Login />
  //                 </div>
  //             );
  //         }
  //         return (
  //             <div>
  //                 <h2 style={headingStyle}>Previous Orders Page</h2>
  //                 <h1 style={{ color: '#3366CC' }}>Previous Orders Content</h1>
  //             </div>
  //         );
  //     }
  // };

  return (
    <div style={{backgroundColor:'aquamarine'}}>
      <NavbarComponent func={searchBooks} />
      {/* {process()} */}
      <Row style={{ padding: 20 }}>
    <div className="col-md-4">
      <Card style={{ width: "27rem",margin:20 }}>
        <Card.Header style={{backgroundColor:"black" ,color:"white"}}><h3>Categories</h3></Card.Header>
        <ListGroup>
          {categories.map((c, index) => (
            <div key={index}>
              <ListGroup.Item>
                <Nav.Link onClick={() => { getbookcategory(c.id); }}><h4>{c.name}</h4></Nav.Link>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </Card>
    </div>
    <div className="col-md-8">
      <Row>
        {book.map((b, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card style={{ width: '350px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
  <center><Image width={280} src={eternity} /></center>
  <Card.Body>
    <Card.Title>{b.bookTitle}</Card.Title>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroup.Item>Author: <h6>{b.author}</h6></ListGroup.Item>
    <ListGroup.Item>Category: <h6>{b.category.name}</h6></ListGroup.Item>
    <ListGroup.Item>Price: <h6>{b.bookPrice}</h6></ListGroup.Item>
  </ListGroup>
  <Button style={{ width: 200, alignSelf: "center", margin: 15 }} variant="outline-primary" href='/auth/login/login'>Add to cart</Button>
</Card>

          </div>
        ))}
      </Row>
    </div>
  </Row>
    </div>
  );
}

export default CustomerDashboard;
