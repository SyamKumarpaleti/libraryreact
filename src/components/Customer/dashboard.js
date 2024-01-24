import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../navbar";
import axios from "axios";
import { Button, Card, ListGroup, Nav, Row, Pagination, Form } from "react-bootstrap";

function CustomerDashboard({ setCart }) {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [qStr, setQstr] = useState("");
  const [book, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);

  useEffect(() => {
    axios
      .get("http://localhost:8182/Book/all")
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => setMsg("Error in Fetching books"));

    axios
      .get("http://localhost:8182/category/getall")
      .then((response) => setCategories(response.data))
      .catch((error) => setMsg("Error in Fetching categories"));
  }, []);

  const searchBooks = (str) => {
    setQstr(str);
    const filtered = book.filter((b) =>
      b.bookTitle.toLowerCase().includes(str.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const getBookCategory = async (id) => {
    setLoading(true);
    setSelectedCategory(id);
    const response = await axios.get(
      `http://localhost:8182/customer/getbycategoryid?id=${id}`
    );
    setFilteredBooks(response.data || []);
  };

  const addToCart = (selectedBook) => {
    setCart((prevCart) => [...prevCart, selectedBook]);
  };

  const handleBooks = (selectedBook) => {
    if (localStorage.getItem("isLoggedIn")) {
      addToCart(selectedBook);
      navigate(`/book/cart/${cid}`);
    } else {
      navigate("/auth/login");
    }
  };

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    getBookCategory(id);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={{ 
      padding: 20, 
      minHeight: "100vh", 
      fontFamily: "Arial, sans-serif", 
      backgroundColor: "#f8f9fa", 
      backgroundImage: 'url("https://img.freepik.com/premium-photo/book-table-with-library-background_865967-29196.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <NavbarComponent func={searchBooks} /><br />
      <Row>
        <div className="col-md-4">
          <Card style={{ width: "27rem", margin: 20 }}>
            <Card.Header style={{ backgroundColor: "#343a40", color: "#fff" }}>
              <h3 style={{ fontFamily: "Arial, sans-serif", margin: 0 }}>Categories</h3>
            </Card.Header>
            <ListGroup>
              {categories.map((c, index) => (
                <div key={index}>
                  <ListGroup.Item
                    style={{ cursor: 'pointer', backgroundColor: selectedCategory === c.id ? '#007bff' : '' }}
                    onClick={() => handleCategoryClick(c.id)}
                  >
                    <Nav.Link>
                      <h4 style={{ color: selectedCategory === c.id ? "#fff" : "#007bff", fontWeight: "bold", fontFamily: "Verdana, sans-serif", margin: 0 }}>
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
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder="Search books..."
              value={qStr}
              onChange={(event) => searchBooks(event.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Form.Group>
          {filteredBooks.length > 0 ? (
            <>
              <Row>
                {currentBooks.map((b, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <Card style={{ width: '400px', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <Card.Body>
                        <Card.Title style={{ fontSize: '1.5rem', marginBottom: '10px', color: "#212529" }}>
                          {b.bookTitle}
                        </Card.Title>
                        <hr />
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <div>
                              <span style={{ fontWeight: 'bold' }}>Rating:</span> {b.rating}
                            </div>
                            <div>
                              <span style={{ fontWeight: 'bold' }}>Author:</span>&nbsp;&nbsp;
                              <Link to={'/authors?id='+b.id} style={{ color: '#007bff' }}>
                                {b.author}
                              </Link>
                            </div>
                            <div>
                              <span style={{ fontWeight: 'bold' }}>Price:</span> {b.bookPrice}
                            </div>
                            <div>
                              <Link to={'/books?id='+b.id} style={{ color: '#007bff' }}>
                                Info
                              </Link>
                            </div>
                          </div>
                          <Button onClick={() => handleBooks(b)} style={{ width: 200, alignSelf: "center", margin: 15 }} variant="outline-primary">Add to cart</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>
              <Pagination>
                <Pagination.Prev onClick={handlePrev} style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }} />
                {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                    style={{ backgroundColor: "#007bff", color: "#fff" }}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={handleNext} style={{ cursor: currentPage < Math.ceil(filteredBooks.length / booksPerPage) ? 'pointer' : 'not-allowed' }} />
              </Pagination>
            </>
          ) : (
            <p style={{ color: 'red', fontFamily: 'Arial, sans-serif', fontSize: '1.5rem', textAlign: 'center' }}>No Books found, try again.</p>
          )}
        </div>
      </Row>
      <div></div>
    </div>
  );
}

export default CustomerDashboard;




