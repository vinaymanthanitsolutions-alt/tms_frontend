import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'

import Home from './pages/Home'
import AdminDashboard from './pages/adminPages/AdminDashboard'
import Dashboard from './pages/superadminPages/Dashboard'






const App = () => {
  return (

     
       
       <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<UserLogin/>}/>
         
      </Routes>
     
  )
}

export default App