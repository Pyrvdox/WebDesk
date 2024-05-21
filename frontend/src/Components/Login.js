import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
            if(isLoading){
                return
            }
      
            setIsLoading(true);
      
            try{
                const response = await axios.post("http://127.0.0.1:8000/api/login/", formData)
                console.log("Success!", response.data)
                localStorage.setItem("accessToken", response.data.tokens.access);
                localStorage.setItem("refreshToken", response.data.tokens.refresh);
                navigate('home')

            }
            catch(error){
                console.log(error.response?.data);

                }
            setIsLoading(false);        

            }
            
    return(
        <section className="centered-section">
        <div className="front-container">
        	<h1>WebDesk</h1>
			<form>
	
				<label>Email:</label>

				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				></input>
				<br />
				<label>Password:</label>

				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				></input>
				
				<br />
                <br/>
				<button type="submit" disabled={isLoading} onClick={handleSubmit}>
					Login
				</button>
                <br/>
                <br/>
                <a href="register">Don't have an account? Sign Up</a>
			</form>
        </div>
        </section>
        
    )
};

export default LoginComponent;