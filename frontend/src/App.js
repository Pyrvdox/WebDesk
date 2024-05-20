import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar';
import LoginComponent from './Components/Login';
import RegisterComponent from './Components/Register';
import HomeComponent from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}/>
        <Route path='home' element={<HomeComponent />}/>
        <Route path='login' element={<LoginComponent />}/>
        <Route path='register' element={<RegisterComponent />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
