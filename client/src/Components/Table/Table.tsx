import React, { useEffect , useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/Get/Get";
import "./Table.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table() {
  const user = useAppSelector((state) => state.getSlice);
  // console.log('user is' , user.users[0]);

  const [userDeleted, setuserDeleted] = useState<boolean>(false)

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [userDeleted]);

  const deleteUser = async (id: string) => {
  await axios.delete(`http://localhost:8001/users/${id}`)
   .then((response) => toast.success( response.data.message))
   .catch((error) => toast.warning( error.message))
   setuserDeleted(true)
  }

  return (
    <div>
    <ToastContainer />
<h1 className="text-center">List of users</h1>
      <table data-testid="tablesas" className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>


        <tbody>
          {/* check if loading is true */}
          <tr>{user.loading ? <div>Loading...</div> : null}</tr>

          {/* check if there is an error */}
          <tr> {!user.loading && user.error ? <div> {user.error} </div> : null}</tr>
          {user.users
            ? user.users.map((element: any) => {
                return console.log("element is", user.users[0].role.name);
                
              })
            : null}
        </tbody>

      </table>
    </div>
  );
}

export default Table;
