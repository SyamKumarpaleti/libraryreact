import React, { useEffect, useState } from "react";
import Navbarcomponent from "../navbar";
import { Button, NavDropdown, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";
import AdminNavbar from "./adminnavbar";
function UpdateComponent(bid) {
    const { id} = useParams();
    const [book, setBook] = useState({})

    const [bookTitle, setBookTitle] = useState('');
   
    const [author, setAuthor] = useState('');
    
    
    const [bookPrice, setBookPrice] = useState('');
    const [noOfCopies, setNoOfCopies] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = ({
            "bookTitle": bookTitle,
           
            "author": author,
            
           
            "bookPrice": bookPrice,
            "noOfCopies": noOfCopies,
        });
        axios.put(`http://localhost:8182/Book/update/${id}`,data)
        .then(response => {
            console.log("Updated Book Data:", response.data);
            setBook(response.data); // If you want to update state with the response, you can do it here.
          })
          .catch(error => console.error("Error updating book:", error));
      }
    return (
        <div>
            <AdminNavbar />

            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBookTitle">
                        <Form.Label><h5>Book Title</h5></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter book title"
                            name="bookTitle"

                            onChange={(e) => setBookTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAuthor">
                        <Form.Label><h5>Author</h5></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author"
                            name="author"

                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>

                   

                  

                    <Form.Group controlId="formNoOfCopies">
                        <Form.Label><h5>Number of Copies</h5></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter number of copies"
                            name="noOfCopies"

                            onChange={(e) => setNoOfCopies(e.target.value)}
                        />
                    </Form.Group>

                   

                  

                    <Form.Group controlId="formBookPrice">
                        <Form.Label><h5>Book Price</h5></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter book price"
                            name="bookPrice"

                            onChange={(e) => setBookPrice(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </div>
        </div>


    )
}
export default UpdateComponent;