import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import '../Styles/singlenotestyle.css'
import { useLocation } from "react-router-dom";
import axios from "axios";
import refreshExpiredTokenHandler from "../utils/refreshexpired";

const Singlenote = () => {

    const [userNote, setUserNote] = useState({
        title:'',
        text:'',
    })


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

    const titleChangeHandler = (e) => {
        setUserNote({
            ...userNote,
            title: e.target.value
        })
    }

    const textChangeHandler = (e) => {
        setUserNote({
            ...userNote,
            text: e.target.value
        })
    }

    const updateNoteHanlder = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const config = {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                };
                const response = await axios.put(`http://127.0.0.1:8000/api/note/${user}/${noteId}/`,userNote, config)
                console.log('Note updated:', response.data);
            }
        }
        catch(error) {
            console.log(error.response?.data);
            refreshExpiredTokenHandler()
            updateNoteHanlder()
        }
    }

    return(
        <>
            <NavBar />
            <section className="note-section">
                <div className="note-box">
                <form>
                    <div className="note-header">
                        <input 
                            type="text" 
                            value={userNote.title} 
                            onChange={titleChangeHandler} 
                            className="note-title-input"
                        />
                        <button onClick={updateNoteHanlder}>Save</button>
                    </div>
                    <div className="note-body">
                        <textarea 
                            value={userNote.text} 
                            onChange={textChangeHandler} 
                            className="note-textarea"
                        />
                    </div>
                </form>
                </div>
            </section>
        </>
    )
}

export default Singlenote;