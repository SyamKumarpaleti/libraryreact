
import { Route, Router, Routes } from 'react-router';
import './App.css';
import Login from './components/Auth/login/login';
import Signup from './components/Auth/signup/signup';
import CustomerDashboard from './components/Customer/dashboard';

function App() {
  return (

    <div className="App">
    <Routes>
    <Route path="/" element={<CustomerDashboard/>}></Route>
    <Route path="/customer/dashboard" element={<CustomerDashboard/>}></Route>
    <Route path='/auth/login/login'element={<Login/>}></Route>
    <Route path='/auth/signup'element={<Signup/>}></Route>
    </Routes>
   </div>
    
  );
}

export default App;
