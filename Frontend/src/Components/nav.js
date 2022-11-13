import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("user");
 
 
  const user=JSON.parse(data);
 

  
  const handle = () => {
    localStorage.clear();
    navigate("/Login");
  };
  return (
    <div>
      <span>
        <img
          style={{
            width: "45px",
            float: "left",
            borderRadius: "50%",
            marginTop: "1px",
            marginLeft: "20px",
          }}
          alt="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrcyxOsd-HevF-jDcb3lq-Cu_fXOEUMlzaQnRX4YDjlA&s"
        />{" "}
      </span>
      {data ? (
        <ul className="nav-ul ">
          <li>
            {" "}
            <Link to="/">Home </Link>
          </li>
          <li>
            {" "}
            <Link to="/AddUser">Add User </Link>
          </li>
          <li style={{ float: "right" }}>
            {" "}
            <Link onClick={handle} to="/Logout">
              <span style={{ fontWeight: "bold" }}> Logout </span>
              {""} {user.fName}{" "}
            </Link>{" "}
          </li>
        </ul>
      ) : (
        <ul className="nav-ul" style={{ textAlign: "right" }}>
          <li>
            {" "}
            <Link to="/Login">Login </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/SignUp">SignUp </Link>{" "}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
