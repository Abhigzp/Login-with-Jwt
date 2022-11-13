import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";


const UpdateUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role,setRole] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:3100/getUser/${params.id}`);
    result = await result.json();
    console.log("val",result);
    setFName(result[0].fName);
    setLName(result[0].lName);
    setRole(result[0].role);
    setPhone(result[0].phone);
    setEmail(result[0].email);
  };

  const updateUser = async () => {
    console.log(fName,lName , role, phone,email);
    let result = await fetch(`http://localhost:3100/updateUser/${params.id}`,{
      method:"put",
      body:JSON.stringify({fName,lName,phone,role,email}),
      headers:{
        "Content-type":"application/json"
      }
    });
    result =await result.json()
    console.log(result);
    alert("updated successful")
    navigate("/");
  };

  return (
    <div style={{ marginLeft: "30%" }}>
      <h4>Update User</h4>
      <div
        style={{
          textAlign: "center",
          padding: "7px",
          display: "block",
          border: "1px solid skyblue",
          width: "300px",
          margin: "20px",
        }}
      >
        <label>First Name:-</label>
        <input
        className="form-control"
          type="text"
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name.."
          value={fName}
        />
        <label>Last Name:-</label>
        <input
        className="form-control"
          type="text"
          onChange={(e) => setLName(e.target.value)}
          placeholder="last Name.."
          value={lName}
        />
        <label>phone:-</label>
        <input
        className="form-control"
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="phone"
          value={phone}
        />
        <label>Role</label> 
          <select  onChange={(e)=> {
            const selectRole = e.target.value;
            setRole(selectRole);
          }}  className="form-control">
            
            <option>Choose Role</option>
            <option vlaue={role}>Admin</option>
            <option value={role}>Trainer</option>
            <option value={role}>Member</option>
            </select>
        <label>email:-</label>
        <input
        className="form-control"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email..."
          value={email}
        />
      </div>
      <button
        type="button"
        onClick={updateUser}
        style={{
          margin: "20px",
          width: "150px",
          padding: "10px",
          backgroundColor: "skyblue",
          border: "solid 1px",
          cursor: "pointer",
        }}
      >
        Update User
      </button>
    </div>
  );
};

export default UpdateUser;
