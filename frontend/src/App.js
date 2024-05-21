import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from './Components/Navbar';
import LoginComponent from './Components/Login';
import RegisterComponent from './Components/Register';
import HomeComponent from './Components/Home';
import Footer from './Components/Footer';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<HomeComponent />}/>
        <Route path='' element={<LoginComponent />}/>
        <Route path='register' element={<RegisterComponent />}/>
      </Routes>
    <Footer />  
    </BrowserRouter>
    </>

  );
}

export default App;
