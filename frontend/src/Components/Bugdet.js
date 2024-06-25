import React from "react";
import NavBar from "./Navbar";
import '../Styles/bugdetstyle.css'

const BudgetComponent = () => {
    return(
        <>
        <NavBar />
        <section className="b-section">
        <h1 className="budget-title">My Budget</h1>
        <h3 className="budget-subtitle"Enter the basic details of your income and expenses</h3>
        <div className="budget-wrapper">
            <div className="budget-form">
                <div className="budget-container">

                </div>
            </div>
            <div className="budget-results">
                <div className="budget-container">

                </div>
            </div>
        </div>  
        </section>
        </>
    )
}

export default BudgetComponent;