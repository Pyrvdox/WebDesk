import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginComponent from './Components/Login';
import RegisterComponent from './Components/Register';
import HomeComponent from './Components/Home';
import Footer from './Components/Footer';
import NotesComponent from './Components/Notes';
import Singlenote from './Components/Singlenote';
import Newnote from './Components/Newnote';
import MapsComponent from './Components/Maps';
import CalculatorComponent from './Components/Calculator';
import SearchComponent from './Components/Search';
import BudgetComponent from './Components/Bugdet';

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
        <Route path='maps' element={<MapsComponent />}/>
        <Route path='calculator' element={<CalculatorComponent />}/>
        <Route path='search' element={<SearchComponent />}/>
        <Route path='budget' element={<BudgetComponent />}/>
      </Routes>
    <Footer />  
    </BrowserRouter>
    </>

  );
}

export default App;
