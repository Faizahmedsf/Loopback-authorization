import React from 'react'

function AddCustomer() {
  return (
    <div>
        <div className="container mt-5">
          <h2 className='text-center mb-5'>Add Customer</h2>
        <form className='w-50 mx-auto'>
  <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control"placeholder="John Doe" />
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Website</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="johndoe.com" />
  </div>
  <div className="form-group">
  <label htmlFor="exampleInputPassword1">Address</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}     placeholder="NYC">

    </textarea>
  </div>
  <button type="submit" className="btn btn-dark col-md-12">Submit</button>
</form>
        </div>
    </div>
  )
}

export default AddCustomer