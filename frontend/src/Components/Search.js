import React from 'react'
import NavBar from "./Navbar";
import '../Styles/searchstyle.css'
import Loupe from '../Assets/loupe.png'

const SearchComponent = () => {

    return(
        <>
            <NavBar />
            <section className='search-box'>
                <h1>Web Search</h1>
                <div className='search-wrapper'>
                    <input className='search-input-field'></input>
                    <button className='search-button'><img src={Loupe} alt="Loupe" className='search-loupe'/></button>
                </div>
            </section>
        </>
    )
};

export default SearchComponent;