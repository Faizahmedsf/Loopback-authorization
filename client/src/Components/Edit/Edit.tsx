import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getsingleUser } from "../../features/SingleUser/SingleUser";
import { updateUser } from "../../features/Update/Update";


function Edit() {
  let user = useAppSelector((state) => state.SingleUser);
  console.log(user);

  const dispatch = useAppDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getsingleUser(id));
  }, []);

  // create an enum for user's role
  enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber",
  }

  const dispatch2 = useAppDispatch();

  // formik function
  const formik = useFormik({
    // initial Values
    initialValues: {
      firstName: user.users.firstname,
      middleName: user.users.middlename,
      lastName: user.users.lastname,
      email: user.users.email,
      phone: user.users.phone,
      role: user.users.role,
      address: user.users.address,
      id: user.users.id
    },

    enableReinitialize: true,
    // isInitialValid: true,

    // Validation using yup
    validationSchema: yup.object({
      firstName: yup.string().required("First Name is Required"),
      middleName: yup.string().required("Middle Name is Required"),
      lastName: yup.string().required("Last Name is Required"),
      email: yup
        .string()
        .email("Invalid Email Address")
        .required("Last Name is Required"),
      phone: yup.number().required("Phone No is Required"),
      role: yup.string().required("Role is Required"),
      address: yup.string().required("Address is Required"),
    }),

    // OnSubmit Function
    onSubmit: (values) => {
      console.log(values);
      dispatch2(updateUser(values))
    },
  });

  return (
    <div className="createuser">
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>Edit User</h3>
          <div>
            <Link to="/">
              <button className="btn btn-primary mx-3">Go Back</button>
            </Link>
          </div>
        </div>

        <hr />

        <form onSubmit={formik.handleSubmit}>
          <>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="inputEmail4">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Jane"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <p className="errors">
                    {" "}
                    <> {formik.errors.firstName} </>{" "}
                  </p>
                ) : null}
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Middle Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="form-control"
                  id="inputPassword4"
                  name="middleName"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.middleName && formik.touched.middleName ? (
                  <p className="errors">
                    {" "}
                    <>{formik.errors.middleName}</>{" "}
                  </p>
                ) : null}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="form-control"
                  id="inputPassword2"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <p className="errors">
                    {" "}
                    <>{formik.errors.lastName}</>{" "}
                  </p>
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
                  <p className="errors">
                    {" "}
                    <>{formik.errors.email} </>{" "}
                  </p>
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
                  <p className="errors">
                    {" "}
                    <>{formik.errors.phone}</>{" "}
                  </p>
                ) : null}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
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
                  <p className="errors">
                    {" "}
                    <>{formik.errors.role}</>{" "}
                  </p>
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
                  <p className="errors">
                    {" "}
                    <>{formik.errors.address}</>{" "}
                  </p>
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
          </>
        </form>
      </div>
    </div>
  );
}

export default Edit;
