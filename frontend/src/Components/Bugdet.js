import React, { useState } from "react";
import NavBar from "./Navbar";
import '../Styles/bugdetstyle.css'
import refreshExpiredTokenHandler from "../utils/refreshexpired";
import axios from "axios";

const BudgetComponent = () => {

    const [budgetData, setBudgetData] = useState({
        income:"",
        commitments:"",
        house:"",
        othercommitments:"",
        other:""
    })

    const [budgetResponse, setBudgetResponse] = useState('');

    const [formSend, setFormSend] = useState(false);

    const handleChange = (e) => {
        setBudgetData({
          ...budgetData,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const config = {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                };
                const response = await axios.post(`http://127.0.0.1:8000/api/mybudget/`, budgetData, config)
                console.log("resp",response.data);
                setBudgetResponse(response.data);
                setFormSend(true);
            }
        }
        catch(error) {
            console.log(error.response?.data);
            refreshExpiredTokenHandler();
            handleSubmit(e);
        }
    }

    const budgetFormComponent = (
        <>
        <h3 className="budget-subtitle"> Enter the basic details of your income and expenses</h3>
        <div className="budget-wrapper">
        <div className="budget-form">
            <div className="budget-container">
            <form className="budget-form">
                <label>Income</label>
                <input value={budgetData.income} onChange={handleChange} name="income"></input>
                <label>Commitments (rent etc.)</label>
                <input value={budgetData.commitments} onChange={handleChange} name="commitments"></input>
                <label>Food and housekeeping</label>
                <input value={budgetData.house} onChange={handleChange} name="house"></input>
                <label>Other commitments (car, phone, internet)</label>
                <input value={budgetData.othercommitments} onChange={handleChange} name="othercommitments"></input>
                <label>Other expenses</label>
                <input value={budgetData.other} onChange={handleChange} name="other"></input>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            </div>
        </div>
        </div>  
        </>

    );

    const budgetResultComponent = (
        <div    className="result-wrapper">
            <p>Hello</p>
        </div>
    );

    return(
        <>
        <NavBar />
        <section className="b-section">
        <h1 className="budget-title">My Budget</h1>
            {formSend ? budgetResultComponent : budgetFormComponent}
        </section>
        </>
    )
}

export default BudgetComponent;