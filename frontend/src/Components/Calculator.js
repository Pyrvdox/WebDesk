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
                <input></input>
            </div>
        </section>
        </>
    )
}

export default CalculatorComponent;