import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
// import { ROLE } from '../../Role';

const RequireRole = ({ allowedRole }) => {
   const userRole = localStorage.getItem("role")?.toLowerCase();

// const userRole = ROLE;
   console.log("current role:", userRole, "allowed role:", allowedRole);

    if(userRole !== allowedRole){
        return <Navigate to="/" replace/>
    }
  return <Outlet/>
}

export default RequireRole