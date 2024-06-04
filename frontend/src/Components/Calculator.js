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
                    <input className="calc-input" placeholder="0.0"></input>
                </div>
                
            </div>
        </section>
        </>
    )
}

export default CalculatorComponent;