import { useFormik } from "formik";
import React from "react";
import "./CreateUser.css";
import * as yup from "yup";
import "./CreateUser.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUser } from "../../features/Post/Post";
import { Role } from "../../Interface/Interface";


function CreateUser() {
  const dispatch = useAppDispatch();
  const initialData = useAppSelector((state) => state.postSlice);

  // formik function
  const formik = useFormik({
    // initial Values
    initialValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      phone: 0,
      role: "",
      address: "",
    },

    // Validation using yup
    validationSchema: yup.object({
      firstname: yup.string().max(10).required("First Name is Required"),
      middlename: yup.string().max(10).required("Middle Name is Required"),
      lastname: yup.string().max(10).required("Last Name is Required"),
      email: yup
        .string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      // phone: yup.number().required("Phone No is Required"),
      // role: yup.string().required("Role is Required"),
      // address: yup.string().required("Address is Required"),
    }),

    // OnSubmit Function
    onSubmit: (values) => {
      dispatch(addUser(formik.values));
      alert("New User Added")
    },
  });
  console.log("values is values", formik.values);

  return (
    <div className="createuser">
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>Create a new User</h3>
          <div>
            {/* <Link to="/">
              <button className="btn btn-primary mx-3">Go Back</button>
            </Link> */}
          </div>
        </div>

        <hr />

        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputEmail4">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Jane"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.firstname && formik.touched.firstname ? (
                <p className="errors"> {formik.errors.firstname} </p>
              ) : null}
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="inputPassword4">Middle Name</label>
              <input
                type="text"
                placeholder="John"
                className="form-control"
                id="inputPassword4"
                name="middlename"
                value={formik.values.middlename}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.middlename && formik.touched.middlename ? (
                <p className="errors"> {formik.errors.middlename} </p>
              ) : null}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputPassword4">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="form-control"
                id="inputPassword2"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.lastname && formik.touched.lastname ? (
                <p className="errors"> {formik.errors.lastname} </p>
              ) : null}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputAddress">Email</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="johnDoe@mail.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="errors"> {formik.errors.email} </p>
              ) : null}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputAddress2">Phone</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="+91-123-987-6767"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <p className="errors"> {formik.errors.phone} </p>
              ) : null}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">Role</label>
              <select
                id="inputState"
                className="form-control"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option selected>Choose...</option>
                <option value={Role.SuperAdmin}>{Role.SuperAdmin}</option>
                <option value={Role.Admin}>{Role.Admin}</option>
                <option value={Role.Subscriber}>{Role.Subscriber}</option>
              </select>
              {formik.errors.role && formik.touched.role ? (
                <p className="errors"> {formik.errors.role} </p>
              ) : null}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="inputAddress2">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress4"
                placeholder="Apartment, studio, or floor"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.address && formik.touched.address ? (
                <p className="errors"> {formik.errors.address} </p>
              ) : null}
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                required
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <button type="submit" className="col-md-3 btn btn-dark">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
