import "./App.css";
import Nav from "./Components/nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/home'

// import AddProducts from './Components/Addproducts';
// import Footer from "./Components/footer";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import PrivateCom from "./Components/PrivateCom";
import AddUser from './Components/AddUser';

import UpdateUser from "./Components/UpdateUser";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateCom />}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/addUser" element={<AddUser/>}></Route>
          
            <Route path="/Upproducts/:id" element={<UpdateUser/>}></Route>      
          </Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
