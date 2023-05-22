import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateUser from './Components/Create User/CreateUser';
import NotFound from './Components/NotFound/NotFound';
import Edit from './Components/Edit/Edit';
import Customer from './Components/Customer/index/Customer';
import EditCustomer from './Components/Customer/EditCustomer/EditCustomer';
import AddCustomer from './Components/Customer/AddCustomer/AddCustomer';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
// getUser

function App() {
  return (
    <div className="App">

      <BrowserRouter>
<Navbar />
      <Routes>
     
        <Route path='/' element={<Header />} />
        <Route path='/createuser' element={<CreateUser />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/customer/edit/:id' element={<EditCustomer />} />
        <Route path='/customer/add' element={<AddCustomer />} />
        <Route path='/auth' element={<Login />} />
        <Route path='/signup' element={<Signup />} />



      </Routes>  

      
      </BrowserRouter>
    </div>
  );

}

export default App;
