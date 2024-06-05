import React from "react";
import NavBar from "./Navbar";
import '../Styles/calcstyle.css'

const CalculatorComponent = () => {
    return (
        <>
        <NavBar/>
        <section className="calc-section">
        <h1 className="calc-title">Calculator</h1>
            <div className="calc-wrapper">
                <div className="calc-header">
                    <input className="calc-input" placeholder="Enter your equation"></input>
                </div>
                <div className="calc-results">
                    <h2>Result: </h2>
                    <h2></h2>
                </div>
                <div className="calc-body">
                    <button className="calc-button reset-calc-button">Reset</button>
                    <button className="calc-button">Enter</button> 
                </div>

            </div>
        </section>
        </>
    )
}

export default CalculatorComponent;