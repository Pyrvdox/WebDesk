import React from "react";
import NavBar from "./Navbar";
import '../Styles/homestyles.css'

const HomeComponent = () => {

    return(
        <section className="home-section">
            <NavBar />
            <h1>Home Page</h1>
        </section>
    )
};

export default HomeComponent;