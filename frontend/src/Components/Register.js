import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styles/frontpages.css'

const RegisterComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password1:"",
        password2:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isLoading){
            return
        }
        setIsLoading(true)

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/register/", formData)
            console.log(response.data)
            navigate('/')
        }
        catch(error){
            console.log(error)
        }
        setIsLoading(false)
    }

    return(
        <section className="centered-section">
        <div className="front-container">
        <h2>Register</h2>
        <form>
            <label>username:</label>
            <br />
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            ></input>
            <br />
            <br />
            <label>email:</label>
            <br />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            ></input>
            <br />
            <br />
            <label>password:</label>
            <br />
            <input
                type="password"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
            ></input>
            <br />
            <br />
            <label>confirm password:</label>
            <br />
            <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
            ></input>
            <br />
            <br />
            <button type="submit" disabled={isLoading} onClick={handleSubmit}>
                Register
            </button>
            <br/>
            <br/>
            <a href="/">Already have an account ? Log in</a>
        </form>
    </div>
        </section>
        
    )
};

export default RegisterComponent;