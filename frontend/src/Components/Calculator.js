import React, { useState } from "react";
import NavBar from "./Navbar";
import '../Styles/calcstyle.css'
import axios from "axios";
import refreshExpiredTokenHandler from "../utils/refreshexpired";

const CalculatorComponent = () => {

    const [equation, setEquation] = useState({calc:''});
    const [resultInfo, setResultInfo] = useState('');

    const handleChange = (e) => {
        setEquation({
          ...equation,
          [e.target.name]: e.target.value,
        });
      };


    const validateEquation = (equation) => {
        if (!equation) {
            return 'null';
        }

    const validEquationRegex = /^[0-9+\-*/(). ]+$/;
        if (!validEquationRegex.test(equation)) {
            return 'invalid characters';
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(equation);


        const validationError = validateEquation(equation.calc);
        if (validationError) {
            setResultInfo(validationError);
            return;
        }
        
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const config = {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                };
                const response = await axios.post(`http://127.0.0.1:8000/api/calculator/`,equation, config)
                console.log(response.data);
                setResultInfo(response.data);
            }
        }
        catch(error) {
            console.log(error.response?.data);
            refreshExpiredTokenHandler();
            handleSubmit(e);
        }
        console.log(resultInfo);
        setEquation({calc:''});
    }

    const handleReset = () => {
        setEquation({calc:''});
        setResultInfo('');
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
                    <h2 className="results-info">Result: </h2>
                    <h2 className="results-info">{resultInfo}</h2>
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