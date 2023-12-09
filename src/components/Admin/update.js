import React, { useState } from "react";
import { Button, Form, Card, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";
import AdminNavbar from "./adminnavbar";

function UpdateComponent(bid) {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [bookPrice, setBookPrice] = useState('');
    const [noOfCopies, setNoOfCopies] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!bookTitle || !author || !noOfCopies || !bookPrice) {
            setErrorMsg("Please provide all information.");
            return;
        }

        if (isNaN(parseFloat(bookPrice)) || isNaN(parseInt(noOfCopies))) {
            setErrorMsg("Invalid input for Book Price or Number of Copies. Please enter valid numbers.");
            return;
        }

        if (parseFloat(bookPrice) <= 0 || parseInt(noOfCopies) <= 0) {
            setErrorMsg("Book Price and Number of Copies must be greater than zero.");
            return;
        }

        let data = {
            "bookTitle": bookTitle,
            "author": author,
            "bookPrice": bookPrice,
            "noOfCopies": noOfCopies,
        };

        axios.put(`http://localhost:8182/Book/update/${id}`, data)
            .then(response => {
                console.log("Updated Book Data:", response.data);
                setBook(response.data);
                setErrorMsg("");
            })
            .catch(error => {
                console.error("Error updating book:", error);
                setErrorMsg("Error updating book, please try again.");
            });
    }

    return (
        <div>
            <AdminNavbar />
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="border p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                    <Card style={{ width: '800px', padding: '40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Card.Body>
                            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBookTitle">
                                    <Form.Label style={{ color: '#007bff', fontSize: '18px', fontWeight: 'bold' }}>Book Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter book title"
                                        name="bookTitle"
                                        onChange={(e) => setBookTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuthor">
                                    <Form.Label style={{ color: '#007bff', fontSize: '18px', fontWeight: 'bold' }}>Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter author"
                                        name="author"
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formNoOfCopies">
                                    <Form.Label style={{ color: '#007bff', fontSize: '18px', fontWeight: 'bold' }}>Number of Copies</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter number of copies"
                                        name="noOfCopies"
                                        onChange={(e) => setNoOfCopies(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBookPrice">
                                    <Form.Label style={{ color: '#007bff', fontSize: '18px', fontWeight: 'bold' }}>Book Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter book price"
                                        name="bookPrice"
                                        onChange={(e) => setBookPrice(e.target.value)}
                                    />
                                </Form.Group>
                                <br />

                                <Button variant="primary" type="submit" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default UpdateComponent;
