import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toast'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [role, setRole] = useState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (auth) {
  //     // navigate("/");
  //     alert("please logout 1st after you sign up");
  //   }
  // },[]);

  // genrate UID number logic
  // return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);

  const UID = Math.random().toString(36).substring(2).toUpperCase();
  console.log("random", UID);

  let CheckPassword = (inputtxt) => {
    let decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputtxt.value.match(decimal)) {
      alert("Correct, try another...");
      return true;
    } else {
      alert("Wrong...!");
      return false;
    }
  };

  const savedata = async (e) => {
    e.preventDefault();

   
    // const result = await fetch("http://localhost:3100/rejister", {
    //   method: "post",

    //   body: JSON.stringify({ UID, fName , lName , role , phone , email , password  }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // let data = await result.json();
    // console.log(data);
    // // localStorage.setItem("user", JSON.stringify(data.result));
    // // localStorage.setItem("token",JSON.stringify(data.auth));
    // alert("all data save successfully")
    // navigate("/login");

   
    if (!fName || !lName || !role || !phone || !email || !password) {
      alert("Please provide value into each input field ");
    }else if (password.length < 8) {
     alert( "Password must be more than 8 characters");
    } else if (password.length > 16) {
     alert ("Password cannot exceed more than 16 characters") 
    }else {
      axios
        .post("http://localhost:3100/register", {UID,fName,lName, role, phone, email, password }
        ).then(() => {
          alert("user added successfuly");
        })
        
      toast.success("User added successfuly");
      setTimeout(() => navigate("/login"), 500);
    }
  };

  return (
    <div>
      <form
        style={{
          float: "left",
          margin: "auto",
        }}
      >
        <h6>New user Added</h6>
        <div
          style={{
            width: 400,
            height: "auto",
            border: "2px solid black",
            float: "left",
            padding: "5px",
          }}
        >
          {/* <label>UID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          /> */}

          <label>First_Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => setFName(e.target.value)}
          />
          <label>Last_Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => setLName(e.target.value)}
          />
          <label>Role</label>
          <select
            onChange={(e) => {
              const selectRole = e.target.value;
              setRole(selectRole);
            }}
            className="form-control"
          >
            <option>Choose Role</option>
            <option vlaue={role}>Admin</option>
            <option value={role}>Trainer</option>
            <option value={role}>Member</option>

            {/* <option>Please choose one option</option> */}

            {/* {role.map((option, index) => {
                   return <option key={index} >
                        {option}
                  </option>
                 })} */}
          </select>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          /> */}

          <label>Mobile</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="form-group">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              // onChange={(e) => passwordFun(e)}
              onChange={(e) => {
                setPassword(e.target.value);
                // let val = e.target.value
                //  setPassword( CheckPassword(val));
              }}
            />
          </div>
          {/* <div className="form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Remember me </label>
          </div> */}
          <br />
          {/* <div className="form-group">
            <label>Upload Your picture</label>
            <input type="file" className="form-control-file" />
          </div> */}
          <br />
          <button
            type="submit"
            className="btn btn-primary "
            style={{ float: "right" }}
            onClick={savedata}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
