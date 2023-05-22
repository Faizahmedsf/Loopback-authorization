import React from 'react'
import {
     NavLink
} from "react-router-dom"

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/">Navbar</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
     
      
      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
          Users
     </NavLink>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-item"> <NavLink  to={'/createuser'}>Add Users</NavLink> </li>
             <li className="dropdown-item"> <NavLink  to={'/edit/:id'}>Edit Users</NavLink> </li>
        </div>

      </li>
      
      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle" to="/customer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
          Customer
     </NavLink>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-item"> <NavLink  to={'/customer/add'}>Add Customer</NavLink> </li>
             <li className="dropdown-item"> <NavLink  to={'/customer/edit/:id'}>Edit Customer</NavLink> </li>
        </div>

      </li>
     
    </ul>
    
  </div>
</nav>
{/* <p className='btn btn-dark my-3'> <Link to="/"> Go Back </Link></p> */}
    </div>
  )
}

export default Navbar