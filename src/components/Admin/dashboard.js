import { Navbar } from "react-bootstrap";
import AdminNavbar from "./adminnavbar";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Button, Card, Row, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateComponent from "./update";

function AdminDashboard() {
  const navigate = useNavigate('');
  const [book, setBook] = useState([]);
  const [delBook, setDelBook] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8182/Book/all')
      .then(response => setBook(response.data));
  }, []);
  const handleDelete = (bid) => {
    console.log('Deleting book with ID:', bid);
  
    axios.delete(`http://localhost:8182/Book/delete/${bid}/${id}`)
      .then(response => {
        console.log( response.data);
        setDelBook(response.data);
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };
    
  
  

  return (
    <div>
      <AdminNavbar />
      <Container className="mt-5">
        <h1 className="text-center">Admin Dashboard</h1>
        <Row className="justify-content-md-center">
          {book.map((b, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card style={{ width: '400px', border: '1px solid #dee2e6', borderRadius: '0.25rem' }}>
                <Card.Body>
                  <Link to={`/books?id=${b.id}`}>
                    <Card.Title>{b.bookTitle}</Card.Title>
                  </Link>
                  <hr />
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Rating:</span> {b.rating}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Author:</span>
                        <Link to={`/authors?id=${b.id}`}>
                          {b.author}
                        </Link>
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Price:</span> {b.bookPrice}
                      </div>
                    </div>
                    <Button onClick={() => navigate(`/admin/update/${b.id}`)} style={{ width: 200, alignSelf: "center", margin: 15 }} variant="outline-primary">
                      UPDATE
                    </Button>
                    <Button onClick={() => handleDelete(b.id)} style={{ width: 200, alignSelf: "center", margin: 15 }} variant="outline-primary">
                      DELETE
                    </Button>

                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
