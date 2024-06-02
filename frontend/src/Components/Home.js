import React from "react";
import NavBar from "./Navbar";
import '../Styles/homestyles.css'
import Notes from '../Assets/notes.png'
import Map from '../Assets/map.png'
import Calculator from '../Assets/calculator.png'
import Wallet from '../Assets/wallet.png'
import Profile from '../Assets/profile.png'
import Settings from '../Assets/settings.png'
import Info from '../Assets/ainfo.png'
import Docs from '../Assets/docs.png'
import Pictures from '../Assets/pictures.png'
import Store from '../Assets/store.png'

const HomeComponent = () => {

    return(
        <>
        <NavBar />
        <section className="home-section">
        <h1 className="app-section-title">My applications</h1>
            <div className="content-bar">
                <a href="notes" className="div-link"><div className="app-container">
                    <img src={Notes} alt="Notes" />
                    <h2>Notes</h2>
                </div></a>
                <a href="" className="div-link"><div className="app-container">
                    <img src={Map} alt="Map" />
                    <h2>Maps</h2>
                </div></a>
                <a href="" className="div-link"><div className="app-container">
                    <img src={Calculator} alt="Calculator" />
                    <h2>Calculator</h2>
                </div></a>
                <a href="" className="div-link"><div className="app-container">
                    <img src={Wallet} alt="Wallet" />
                    <h2>MyBudget</h2>
                </div></a>
                <a href="" className="div-link"><div className="app-container">
                    <img src={Docs} alt="Docs" />
                    <h2>Documents</h2>
                </div></a>
                <a href="" className="div-link"><div className="app-container">
                    <img src={Pictures} alt="Pictures" />
                    <h2>Gallery</h2>
                </div></a>

                
            </div>
            <h1 className="app-section-title">Utilites</h1>
            <div className="content-bar">
                <a href="" className="div-link"><div className="app-container">
                    <img src={Profile} alt="Profile" />
                    <h2>Profile</h2>
                </div></a>
                <a href="" className="div-link"><div className="app-container">
                    <img src={Settings} alt="Settings" />
                    <h2>Settings</h2>
                </div></a>
                <a href="https://github.com/Pyrvdox" className="div-link"><div className="app-container">
                    <img src={Info} alt="Info" />
                    <h2>Informations</h2>
                </div></a>
                <a href="" className="div-link"><div className="app-container">
                    <img src={Store} alt="Store" />
                    <h2>More Apps</h2>
                </div></a>
            </div>
        </section>
        </>

    )
};

export default HomeComponent;