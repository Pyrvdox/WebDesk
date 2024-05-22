import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from './Components/Navbar';
import LoginComponent from './Components/Login';
import RegisterComponent from './Components/Register';
import HomeComponent from './Components/Home';
import Footer from './Components/Footer';
import NotesComponent from './Components/Notes';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<HomeComponent />}/>
        <Route path='' element={<LoginComponent />}/>
        <Route path='register' element={<RegisterComponent />}/>
        <Route path='notes' element={<NotesComponent />}/>
      </Routes>
    <Footer />  
    </BrowserRouter>
    </>

  );
}

export default App;
