import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.css"
function NotFound() {
  return (
    <div className='NotFound'>
        <h2>Page Not Found 404</h2>
        <button className='btn btn-dark my-3'> <Link to="/"> Go Back </Link></button>
    </div>
  )
}

export default NotFound