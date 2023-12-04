// BookDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8182/Book/getone/${bookId}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{bookDetails.bookTitle}</h1>
      <p>{bookDetails.bookDescription}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default BookDetails;
