import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../navbar";
import axios from "axios";
import { Button, Card, ListGroup, Nav, Row } from "react-bootstrap";

function CustomerDashboard({ setCart }) {
  const navigate = useNavigate();
  const {cid} = useParams();
  const [qStr, setQstr] = useState('');
  const [book, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {

    console.log(cid)
    axios.get('http://localhost:8182/Book/all')
      .then(response => setBooks(response.data))
      .catch(error => setMsg('Error in Fetching books'));

    axios.get('http://localhost:8182/category/getall')
      .then(response => setCategories(response.data))
      .catch(error => setMsg('Error in Fetching categories'));
  }, [])

  const searchBooks = (str) => {
    console.log('search func in parent comp called.....' + str)
    setQstr(str);
  };

  const navigateToAuthor = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  const getBookCategory = async (id) => {
    setLoading(true);
    const response = await axios.get(`http://localhost:8182/customer/getbycategoryid?id=${id}`);
    console.log('API response:', response);
    setBooks(response.data || []);
  };

  const addToCart = (selectedBook) => {
    setCart(prevCart => [...prevCart, selectedBook]);
  };

  const handleBooks = (selectedBook) => {
    if (localStorage.getItem('isLoggedIn')) {
      addToCart(selectedBook);
      navigate(`/cart/${cid}`);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div style={{ backgroundColor: "#3456", padding: 20, minHeight: "100vh" }}>
      <NavbarComponent func={searchBooks} />
      <Row>
        <div className="col-md-4">
          <Card style={{ width: "27rem", margin: 20, backgroundColor: "#fff" }}>
            <Card.Header style={{ backgroundColor: "#3498db", color: "#fff" }}>
              <h3 style={{ fontFamily: "Arial, sans-serif" }}>Categories</h3>
            </Card.Header>
            <ListGroup>
              {categories.map((c, index) => (
                <div key={index}>
                  <ListGroup.Item>
                    <Nav.Link onClick={() => { getBookCategory(c.id); }}>
                      <h4 style={{ color: "#2c3e50", fontWeight: "bold", fontFamily: "Verdana, sans-serif" }}>
                        {c.name}
                      </h4>
                    </Nav.Link>
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
                <Card style={{ width: '400px', backgroundColor: '#your_card_background_color_here' }}>
                  <Card.Body style={{ backgroundColor: '#your_card_body_background_color_here' }}>
                    <Link to={'/books?id='+b.id} >
                      <Card.Title>
                        {b.bookTitle}
                      </Card.Title>
                    </Link>
                    <hr />
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Rating:</span> {b.rating}
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Author:</span>
                          <Link to={'/authors?id='+b.id}>
                            {b.author}
                          </Link>
                        </div>
                       
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Price:</span> {b.bookPrice}
                        </div>
                      </div>
                      <Button onClick={() => handleBooks(b)} style={{ width: 200, alignSelf: "center", margin: 15 }} variant="outline-primary">Add to cart</Button>
                    </div>
                  </Card.Body>
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
