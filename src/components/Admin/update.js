import React, { useState } from "react";
import { Button, Form, Card, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";
import AdminNavbar from "./adminnavbar";

const UpdateComponent = (bid) => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [bookPrice, setBookPrice] = useState('');
    const [noOfCopies, setNoOfCopies] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!bookTitle && !author && !noOfCopies && !bookPrice) {
            setErrorMsg("Please provide at least one piece of information to update.");
            return;
        }

        if ((bookPrice && isNaN(parseFloat(bookPrice))) || (noOfCopies && isNaN(parseInt(noOfCopies)))) {
            setErrorMsg("Invalid input for Book Price or Number of Copies. Please enter valid numbers.");
            return;
        }

        if ((bookPrice && parseFloat(bookPrice) <= 0) || (noOfCopies && parseInt(noOfCopies) <= 0)) {
            setErrorMsg("Book Price and Number of Copies must be greater than zero.");
            return;
        }

        let updatedData = {
            "bookTitle": bookTitle !== '' ? bookTitle : book.bookTitle,
            "author": author !== '' ? author : book.author,
            "bookPrice": bookPrice !== '' ? bookPrice : book.bookPrice,
            "noOfCopies": noOfCopies !== '' ? noOfCopies : book.noOfCopies,
        };

        axios.put(`http://localhost:8182/Book/update/${id}`, updatedData)
            .then(response => {
                console.log("Updated Book Data:", response.data);
                setBook(response.data);
                setErrorMsg("Updated successfully."); // Set your success message
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