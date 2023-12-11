// HomeComponent.js
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle, Nav } from 'react-bootstrap';
import SidebarComponent from './sidebar';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


function HomeComponent(props) {
  const [param] = useSearchParams();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [msg, setMsg] = useState('');
  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
    if (props.strVal !== '') {
      axios.get('http://localhost:8182/Book/all' + props.strVal)
        .then(response => setSearchBooks(response.data))
    } else {
      setSearchBooks([]);
    }
    axios.get('http://localhost:8182/customer/getbook/' + param.get('bookTitle'))
      .then(response => setFeaturedBooks(response.data))
      .catch(error => setMsg('Error in Fetching Books'));
  }, [props.strVal]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SidebarComponent />
        </div>
        <div className="col-md-9">
        
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
