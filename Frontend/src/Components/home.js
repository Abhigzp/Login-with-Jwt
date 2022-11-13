import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios"

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    allData();
  }, []);

  const allData = async () => {
   let result = await axios.get("http://localhost:3100/api/get");
   setData(result.data);
   console.log(result.data);
    
  };
  const deleteUser = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
             await axios.delete(`http://localhost:3100/delete/${id}`
              );
            
       
              
              allData();
            
          },
        },
        { label: "No" },
      ],
    });
  };


// const deleteUser =  (id)=>{
//   debugger;
//    axios.delete(`http://localhost:3100//delete/${id}`);
//   setTimeout(()=>allData(),500);
// }






  const handlesrch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3100/search/${key}`);
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      allData();
    }
  };

  return (
    <div className="product-list">
      <h3>User List</h3>
      <input
        type="search"
        onChange={handlesrch}
        className="search-product-box"
        placeholder="search-user"
      />
      <ul>
        <li style={{ width: "5%" }}>S.No</li>
        <li style={{ width: "11%" }}>UID</li>
        <li style={{ width: "10%" }}>First Name</li>
        <li style={{ width: "10%" }}>last Name</li>
        <li style={{ width: "7%" }}>Role</li>
        <li style={{ width: "10%" }}>phone</li>
        <li style={{ width: "18%" }}>Email</li>
        <li style={{ width: "7%" }}>Status</li>
        <li >Action</li>
      </ul>
      {data.length > 0 ? (
        data.map((item, i) => (
          <ul key={item._id}>
            <li style={{ width: "5%" }}>{i + 1}</li>
            <li style={{ width: "11%" }}>{item.UID}</li>
            <li style={{ width: "10%" }}>{item.fName}</li>
            <li style={{ width: "10%" }}>{item.lName}</li>
            <li style={{ width: "7%" }}>{item.role}</li>
            <li style={{ width: "10%" }}>{item.phone}</li>
            <li style={{ width: "18%" }}>{item.email}</li>
            <li style={{ width: "7%" }}>{item.status}</li>
            <li>
              {" "}
              <button
                className="btn btn-danger"
               
                onClick={() =>
                   deleteUser(item.id)}
              >
                delete
              </button>
              <Link to={"/upproducts/" + item.id}> update</Link>{" "}
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result found </h1>
      )}
    </div>
  );
};

export default Home;
