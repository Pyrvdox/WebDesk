import React, { useState } from 'react'
import NavBar from "./Navbar";
import '../Styles/searchstyle.css'
import Loupe from '../Assets/loupe.png'

const SearchComponent = () => {

    const [searchLink, setSearchLink] = useState('')

    const handleChange = (e) => {
        setSearchLink({
          ...searchLink,
          [e.target.name]: e.target.value,
        });
      };

    const searchHandler = (e) => {
        e.preventDefault();

        let link = String(searchLink.link); 

        if(link === ''){
            return
        }
        if (!link.startsWith('http://') && !link.startsWith('https://')) {
            link = 'http://' + link;
        }
        window.location.href = link;
    }

    return(
        <>
            <NavBar />
            <section className='search-box'>
                <h1>Web Search</h1>
                <div className='search-wrapper'>
                    <input className='search-input-field' placeholder='Type or paste the web address' type='link' name='link' onChange={handleChange}></input>
                    <button className='search-button' onClick={searchHandler}><img src={Loupe} alt="Loupe" className='search-loupe'/></button>
                </div>
            </section>
        </>
    )
};

export default SearchComponent;