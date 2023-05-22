import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Auth() {
  // signup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      name: yup.string().max(10).required("First Name is Required"),
      email: yup
        .string()
        .email("Invalid Email Address")
        .required("Password is Required"),
        password: yup.string().max(10).required("Password is required")
      
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  // login 

  return (
    <div className="container w-50">
      <h2 className="mb-3">Login</h2>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
     
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Login
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <form onSubmit={formik.handleSubmit}>
           

            <div className="my-3">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-control"
                placeholder="johndoe@mail.com"
              />
                {formik.errors.email && formik.touched.email ? (
                <p className="errors"> {formik.errors.email} </p>
              ) : null}
            </div>

            <div className="my-3">
              <label htmlFor="email">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="form-control"
                placeholder="password"
              />
                {formik.errors.password && formik.touched.password ? (
                <p className="errors"> {formik.errors.password} </p>
              ) : null}
            </div>

            <button type="submit"  className="mt-3 btn btn-dark col-md-12">Submit</button>
          </form>
        </div>
      
      </div>

 
    </div>
  );
}

export default Auth;
