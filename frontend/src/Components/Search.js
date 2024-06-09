import React from 'react'
import NavBar from "./Navbar";
import '../Styles/searchstyle.css'
import Loupe from '../Assets/loupe.png'

const SearchComponent = () => {

    const searchHandler = () => {
        console.log("click")
    }

    return(
        <>
            <NavBar />
            <section className='search-box'>
                <h1>Web Search</h1>
                <div className='search-wrapper'>
                    <input className='search-input-field' placeholder='Type or paste the web address'></input>
                    <button className='search-button' onClick={searchHandler}><img src={Loupe} alt="Loupe" className='search-loupe'/></button>
                </div>
            </section>
        </>
    )
};

export default SearchComponent;