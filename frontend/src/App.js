import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginComponent from './Components/Login';
import RegisterComponent from './Components/Register';
import HomeComponent from './Components/Home';
import Footer from './Components/Footer';
import NotesComponent from './Components/Notes';
import Singlenote from './Components/Singlenote';
import Newnote from './Components/Newnote';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<HomeComponent />}/>
        <Route path='' element={<LoginComponent />}/>
        <Route path='register' element={<RegisterComponent />}/>
        <Route path='notes' element={<NotesComponent />}/>
        <Route path='note/:user/:id' element={<Singlenote />}/>
        <Route path='note/new' element={<Newnote />}/>
      </Routes>
    <Footer />  
    </BrowserRouter>
    </>

  );
}

export default App;
