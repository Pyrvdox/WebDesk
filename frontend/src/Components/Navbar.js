import React, { useState, useEffect } from "react";
import axios from "axios";
import refreshExpiredTokenHandler from "../utils/refreshexpired";
import { useNavigate } from "react-router-dom";
import '../Styles/Navbarstyle.css'

const NavBar = () => {

    const[userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();
    
    useEffect (()=>{
        const getUserData = async () => {
            try{
                const token = localStorage.getItem("accessToken");
                console.log('token: ', token)
                if (token) {
                    const config = {
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/user/", config)
                    localStorage.setItem("user", response.data.username)
                    setUserInfo(response.data)
                    console.log(userInfo)
                }
            }catch(error){
                console.log(error.response?.data);
                setUserInfo(null)
                refreshExpiredTokenHandler()
                getUserData()
            }
        }
        getUserData();
    },[])   

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken")
            const accessToken = localStorage.getItem("accessToken")

            if(accessToken && refreshToken){
                const config = {
                    headers: {
                      "Authorization":`Bearer ${accessToken}`
                    }
                };

                await axios.post("http://127.0.0.1:8000/api/logout/", {"refresh": refreshToken}, config)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user")
                setUserInfo(null)
                console.log("Logout successful!")
                navigate('/')
                
            }
        } catch(error){
            console.log(error.response)
            refreshExpiredTokenHandler()
            handleLogout()
        }   
    }

    return(
        <>
        <div className="nav">
            <div>
                <h1>WebDesk</h1>
            </div>
            <div className="right-nav">
                {userInfo ? <a href="home" className="nav-link">{userInfo.username}</a> : ""}
                <a href="home" className="nav-link">Apps</a>
                <a href="home" className="nav-link">Settings</a>
                <button onClick={handleLogout} className="nav-button">Logout</button>
            </div>
        </div>
        </>

    )
};

export default NavBar;