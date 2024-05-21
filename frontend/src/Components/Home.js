import React from "react";
import NavBar from "./Navbar";
import '../Styles/homestyles.css'

const HomeComponent = () => {

    return(
        <>
        <NavBar />
        <section className="home-section">
            <div className="content-bar">
                <h1>Hello</h1>
            </div>
        </section>
        </>

    )
};

export default HomeComponent;