import React , {useState} from "react";
import { Link } from "react-router-dom";
import Table from "../Table/Table";
import "./Header.css";

function Header() {
    const [show, setShow] = useState<boolean>(false);

    const loadUser = () =>{
        setShow(true)
    } 
    
  return (
    <div className="header">
      <div className="container">
        <div className="d-flex justify-content-between">
            <h2>Http Methods</h2>
            <div>
                <button data-testid="Button" className="btn btn-success mx-3" onClick={loadUser}>Load User</button>
                    {/* <Link to="/createuser"><button className="btn btn-dark mx-3" >
                    Create user</button></Link> */}
            </div>
        </div>
        {
            show ?  <Table /> : <div className="load-user-message"> <h2>Click Load User to see the Data!!</h2> </div>
        }
      </div>
    </div>
  );
}

export default Header;
