import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditCustomer() {

  // get customer details according to id
  const [customer, setCustomer] = useState<any>([])

  const { id } = useParams()
  console.log("id is", id);
  

  useEffect( () => {
     const getCustomerData = async () => {
       let baseUrl = "http://localhost:3001/"
       await axios.get(baseUrl + `customers/${id}`)
       .then((response) => setCustomer(response.data))
       .catch((error) => console.log(error)
       )
      
     }
 
     getCustomerData()
     
  }, [])


  // formik
  const formik = useFormik({
    initialValues: {
      name: customer.name,
      website: customer.website,
      address: customer.address,
    },
    enableReinitialize: true,
        isInitialValid: true,


    onSubmit: async (values) => {
      await axios.patch(`http://localhost:3001/customers/${id}` , values
      )
    },
  });
  return (
    <>
    
    <h2 className="text-center">Edit Customer</h2>
    <form className="w-50 mx-auto" onSubmit={formik.handleSubmit}>
 

  <div className="form-group">
  <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="form-control"
        />
  </div>
  <div className="form-group">
  <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.website}
          className="form-control"
        />
    </div>
  <div className="form-check">
  <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          type="address"
          onChange={formik.handleChange}
          value={formik.values.address}
          className="form-control"
        />
    </div>
  <button type="submit" className="btn btn-dark my-3 col-md-12">Submit</button>
</form>
    </>
  );
}

export default EditCustomer;
