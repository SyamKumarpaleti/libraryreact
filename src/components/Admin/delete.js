import { Card, Row } from "react-bootstrap";
import AdminNavbar from "./adminnavbar";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function DeleteComponent(b){
  const { id } = useParams();
    const [book, setBook] = useState({})
   

    return(
        <div>
            <AdminNavbar />
            <h1>Deleted Successfully</h1>
            
    </div>

       
    )
}
export default DeleteComponent;