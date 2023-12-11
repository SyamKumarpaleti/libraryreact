
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SidebarComponent from "./sidebar";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Nav } from "react-bootstrap";
import axios from "axios";

function Books(){
    const [param] = useSearchParams();
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8182/customer/getallcategory'+ param.get('c.category'))
        .then(response=>setBooks(response.data))
    })
    return(
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SidebarComponent />
          </div>
          <div className="col-md-9">
            <div className="row">
              {books.map((p, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card
                    style={{
                      width: "18rem",
                      height: "12rem",
                    }}
                  >
                  
                    <CardBody>
                      <CardTitle tag="h5">{p.title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Price: INR. {p.price}
                      </CardSubtitle>
                      <CardText>{p.description}</CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                  <Nav.Link> </Nav.Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}
export default Books;