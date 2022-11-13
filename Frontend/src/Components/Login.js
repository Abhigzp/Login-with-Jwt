import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [users,setUsers] = useState("");

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //    console.log("dataLogin",auth)
  // //   if (auth) {
  // //     navigate("/");
  //   // }
  // }, []);


  // useEffect(() => {
  //   allData();
  // }, []);

  // const allData = async () => {
  //   let result = await fetch("http://localhost:3100/api/get");
  //   result = await result.json();
  //   setUsers(result);
  // };
  const formHandle = async (e) => {
    e.preventDefault();
    if(!email || !role || !password){
      alert ("please fill all detailes before login")
    }else {
      let result = await fetch("http://localhost:3100/login", {
        method: "post",
        body: JSON.stringify({ email,role,password}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await result.json();
     
    // console.log(data.message);
      if(data.message==="Wrong credentials"){
        alert("User Not rejisted "); 
        return;   
      }else if ( data.email===email){
         alert("email not exist  ")
         return;
      } else if(data.role===role){
        alert("roel not match with email ")
        return;
      }else
      { 
        localStorage.setItem("user",JSON.stringify(data));
        // localStorage.setItem("token", JSON.stringify(result.auth));
        alert("login  successful");
        navigate("/");
      }
      
    }
     
    
    
    
 

    
  };
  return (
    <div>
      <h3>Login USER</h3>
      <form>
        <label>Email -- -:</label>
        <input
          type="input"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label>Role---:</label>
        
        <select
            onChange={(e) => {
              const selectRole = e.target.value;
              setRole(selectRole);
            }}
            className="form-control"
          >
            <option>Choose Role</option>
            <option >Admin</option>
            <option >Trainer</option>
            <option >Member</option>

            {/* <option>Please choose one option</option> */}
{/* vlaue */}
            {/* {role.map((option, index) => {
                   return <option key={index} >
                        {option}
                  </option>
                 })} */}
          </select>
        <br />
        <br />
        <label>Password</label>
        <input
          type="input"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" onClick={formHandle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
