import React, { useState } from "react";
import NavBar from "./Navbar";
import '../Styles/calcstyle.css'

const CalculatorComponent = () => {

    const [equation, setEquation] = useState({calc:''})
    const [resultInfo, setResultInfo] = useState({result:''})

    const handleChange = (e) => {
        setEquation({
          ...equation,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = () => {
        console.log(equation)
        setResultInfo(equation.calc)
        console.log(resultInfo)
        setEquation({calc:''})
    }

    const handleReset = () => {
        setEquation({calc:''})
    }

    return (
        <>
        <NavBar/>
        <section className="calc-section">
        <h1 className="calc-title">Calculator</h1>
            <div className="calc-wrapper">
                <div className="calc-header">
                    <input className="calc-input" placeholder="Enter your equation" name='calc' value={equation.calc} onChange={handleChange}></input>
                </div>
                <div className="calc-results">
                    <h2>Result: </h2>
                    <h2>{resultInfo}</h2>
                </div>
                <div className="calc-body">
                    <button className="calc-button reset-calc-button" onClick={handleReset}>Reset</button>
                    <button className="calc-button" onClick={handleSubmit}>Enter</button> 
                </div>

            </div>
        </section>
        </>
    )
}

export default CalculatorComponent;