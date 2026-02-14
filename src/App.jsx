import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import Home from "./pages/Home";
import UserRegister from "./Register";






const App = () => {
  return (
    <>
   

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
     

     
    </Routes>
     
      </>
  );
};

export default App;
