import React, { useState, useEffect } from "react";
import axios from "axios";
import refreshExpiredTokenHandler from "../utils/refreshexpired";

const HomeComponent = () => {

    const[userInfo, setUserInfo] = useState(null);

    
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
                setUserInfo(false)
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

            }
        } catch(error){
            console.log(error.response)
        }
    }

    return(
        <>
            <h1>Home Page</h1>
            <h1>{userInfo ? userInfo.username : "Loading..."}</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default HomeComponent;