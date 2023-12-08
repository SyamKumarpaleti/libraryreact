import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const [params] = useSearchParams();
  const [id,setId] = useState(params.get('id'))
  const [bookDetails, setBookDetails] = useState({});

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log(id);
        const response = await axios.get('http://localhost:8182/Book/getbybook/'+id);
        console.log('response:', response);
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, []); // Include id in the dependency array

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book Name...<br /></h1>
      <h2>{bookDetails.bookTitle}</h2>
      <p style={{ backgroundColor: "#f0f0f0", padding: "100px", fontFamily: "Arial, sans-serif", fontSize: "36px" , color: "purple" }}>
      {bookDetails.bookDesc}
      </p>
    </div>

  );
}

export default BookDetails;
