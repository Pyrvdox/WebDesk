import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import axios from "axios";
import refreshExpiredTokenHandler from "../utils/refreshexpired";
import "../Styles/Notesstyle.css"

const NotesComponent = () => {

    const [notesData, setNotesData] = useState(null)

    useEffect(()=>{
        const getNotes = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                console.log('token: ', token)
                if (token) {
                    const config = {
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/notes/", config)
                    setNotesData(response.data)
                }
                console.log("Notes: ",notesData)
            }
            catch(error) {
                console.log(error.response?.data);
                refreshExpiredTokenHandler()
                getNotes()
            }
        }
        getNotes()
    },[])

    return(
        <>
            <NavBar />
            <section className="notes-section">
                <div className="notes-container">
                    <ul className="note-list">
                        {notesData ?
                            notesData.map(note => (
                            <li key={note.id} className="note-container">
                                <h2>{note.title}</h2>
                                <p>{note.text}</p>
                            </li>
                        ))
                        :
                        <h2>No notes</h2>
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default NotesComponent;