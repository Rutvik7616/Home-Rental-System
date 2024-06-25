import React from 'react'
import {BrowserRouter,Routes,Route}from "react-router-dom"
import Homepage from './pages/Homepage'
import Registerpage from './pages/Registerpage'
import Loginpage from './pages/Loginpage'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Registerpage/>} />
        <Route path='/login' element={<Loginpage/>} />

     
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
