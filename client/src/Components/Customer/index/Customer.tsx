import React, { useEffect, useState } from 'react'
import {customer} from "../../../Interface/Interface" 
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Customer.css"
function Customer() {

 const [customer, setCustomer] = useState<any>([])

 useEffect( () => {
    const getCustomerData = async () => {
      let baseUrl = "http://localhost:3001/"
      await axios.get(baseUrl + "customers")
      .then((response) => setCustomer(response.data))
      .catch((error) => console.log(error)
      )
    }

    getCustomerData()
 }, [])
 
 console.log(customer);
 

  const deleteCustomer = async (id: string) => {
  await axios.delete(`http://localhost:3001/customers/${id}`)
   .then((response: any) => alert("user Deleted"))
   .catch((error:Error) => alert("An error occureed in deleting a user"))
  }

  const showUser = (id: string) => {
    console.log("Show Users" , id);

    let userTh = document.getElementById('userth') as HTMLElement
    let userTd = document.getElementById(id)?.querySelector('#usertd') as HTMLElement
    
    userTd.style.display = 'block'
    userTh.style.display = 'block'
  }

  return (
    <div className=' mt-5 container mx-auto w-75'>
        <h2 className='text-center'>Customers</h2>
        <table className="table w-75">
  <thead className="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Website</th>
      <th scope="col">Address</th>
        {/* user which are linked to customers */}
      <th scope='col' id='userth'>User Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {
        customer.map((element: any) => {
            return <tr id={`${element.id}`}>
            <th scope="row">{element.id}</th>
            <td>{element.name}</td>
            <td>{element.website}</td>
            <td>{element.address}</td>
            <td id='usertd'>
              {element.users[0].firstname}
            </td>
            <td>
              <button className='btn btn-primary'>
                  <Link to={`/customer/edit/${element.id}`}>Edit</Link>
              </button>
              <button className='btn btn-danger mx-3' onClick={() => deleteCustomer(`${element.id}`)}>Delete</button>
              <button className='btn btn-success' onClick={() => showUser(`${element.id}`)}>Show Users</button>
            </td>
          </tr>
        })
    }
    
  </tbody>
</table>


    </div>
  )
}

export default Customer