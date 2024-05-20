import React, { useState } from "react";
import axios from "axios";

const RegisterComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password1:"",
        password2:""
    })

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
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div>
        <h2>Register:</h2>
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
        </form>
    </div>
    )
};

export default RegisterComponent;