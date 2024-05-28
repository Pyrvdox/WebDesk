import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import '../Styles/singlenotestyle.css'
import { useLocation } from "react-router-dom";
import axios from "axios";
import refreshExpiredTokenHandler from "../utils/refreshexpired";

const Singlenote = () => {

    const [userNote, setUserNote] = useState('')

    const location = useLocation();
    const { user, noteId } = location.state || {};

    useEffect(()=>{
        const getUserNote = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                console.log('token: ', token)
                if (token) {
                    const config = {
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    };
                    const response = await axios.get(`http://127.0.0.1:8000/api/note/${user}/${noteId}/`, config)
                    setUserNote(response.data)
                }
                console.log("Notes: ",userNote)
            }
            catch(error) {
                console.log(error.response?.data);
                refreshExpiredTokenHandler()
                getUserNote()
            }
        }
        getUserNote()
    },[])

    return(
        <>
            <NavBar/>
            <section className="note-section">
            <div className="note-box">
                <div className="note-header">
                    <h1>{userNote.title}</h1>
                    <button>Edit</button>
                </div>
                <div className="note-body">
                    <p>{userNote.text}</p>
                </div>
            </div>

            </section>
        </>
    )
}

export default Singlenote;