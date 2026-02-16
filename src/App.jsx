import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import Home from "./pages/Home";
import UserRegister from "./Register";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import Dashboard from "./pages/superadminPages/Dashboard";
import ProjectManagerDashboard from "./pages/ProjectManagerPages/ProjectManagerDashboard";






const App = () => {
  return (
    <>
   

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
       <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/projectmanager-dashboard" element={<ProjectManagerDashboard />} />
         <Route path="/superadmin-dashboard" element={<Dashboard />} />
     

     
    </Routes>
     
      </>
  );
};

export default App;
