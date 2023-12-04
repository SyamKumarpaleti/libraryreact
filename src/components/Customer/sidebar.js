// import React, { useEffect, useState } from 'react';
// import { Card, CardHeader, ListGroup, ListGroupItem, Nav } from 'react-bootstrap';
// import { useNavigate } from 'react-router';
// import axios from 'axios';




// function SidebarComponent() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
  
//   useEffect(() => {
//     axios.get('http://localhost:8182/customer/getallcategory')
//       .then(response => {
//         // Use Set to remove duplicates
//         const uniqueCategories = [...new Set(response.data.map(c => c.category))];
//         setCategories(uniqueCategories.map(category => response.data.find(c => c.category === category)));
//       })
//       .catch(error => setMsg('Error in Fetching categories'));
//   }, []);

//   return (
//     <div>
//       <Card
//         style={{
//           width: "18rem",
//         }}
//       >
//         <CardHeader>Categories</CardHeader>
//         <ListGroup>
//           {categories.map((c, index) => (
//             <div key={index}>
//               <ListGroupItem>
//                 <Nav.Link onClick={() => navigate('/customer/dashboard?page=books&cid=' + c.id)}>{c.category}</Nav.Link>
//               </ListGroupItem>
//             </div>
//           ))}
//         </ListGroup>
//       </Card>
//     </div>
//   );
// }

// export default SidebarComponent;
