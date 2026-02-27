import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { ROLE } from '../../Role';

const RequireRole = ({ allowedRole }) => {
    const userRole = ROLE

    if(userRole !== allowedRole){
        return <Navigate to="/" replace/>
    }
  return <Outlet/>
}

export default RequireRole