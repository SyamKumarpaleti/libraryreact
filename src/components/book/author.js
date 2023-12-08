import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function AuthorDetails() {
  const [params] = useSearchParams();
  const [id,setId] = useState(params.get('id'))
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id)
        const response = await axios.get('http://localhost:8182/Book/getbybook/'+id);
        console.log("Response:", response);
        setBooks(response.data);

        
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      <h1>Author... <br/></h1>
      <h2>{books.author}</h2>
      <p style={{ backgroundColor: "#f0f0f0", padding: "100px", fontFamily: "Arial, sans-serif", fontSize: "36px" , color: "purple" }}><br />{books.authorDesc}</p>
     
    </div>
  );
}

export default AuthorDetails;
