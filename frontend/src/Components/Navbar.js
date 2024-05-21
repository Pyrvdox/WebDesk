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
                console.log("Logout successful!")
                navigate('/')
            }
        } catch(error){
            console.log(error.response)
        }
    }

    return(
        <div className="nav">
            <span>
                <h1>{userInfo ? userInfo.username : "Loading..."}</h1>
            </span>
            <span>
                <a href="home"><h1>WebDesk</h1></a>
            </span>
            <span>
                <button onClick={handleLogout}>Logout</button>
            </span>
        </div>
    )
};

export default NavBar;