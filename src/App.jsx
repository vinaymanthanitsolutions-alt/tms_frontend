import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'

import Home from './pages/Home'
import AdminDashboard from './pages/adminPages/AdminDashboard'

const App = () => {
  return (
       <Routes>
        <Route path='/' element={<AdminDashboard/>}/>
        <Route path='/login' element={<UserLogin/>}/>
      </Routes>
  )
}

export default App