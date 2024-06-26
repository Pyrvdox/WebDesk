import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import axios from "axios";
import refreshExpiredTokenHandler from "../utils/refreshexpired";
import "../Styles/Notesstyle.css"
import Delete from "../Assets/delete.png"
import Edit from "../Assets/edit.png"
import { useNavigate } from "react-router-dom";

const NotesComponent = () => {

    const [notesData, setNotesData] = useState(null)

    const navigate = useNavigate()

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

    const getSingleNoteHandler = (e, noteId) => {
        e.preventDefault();
        const user = localStorage.getItem("user")
        navigate(`/note/${user}/${noteId}`, { state: { user, noteId } })
    }

    const noteDeleteHandler = async (e, noteId) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const user = localStorage.getItem("user")
            if (token) {
                const config = {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                };
                const response = await axios.delete(`http://127.0.0.1:8000/api/note/${user}/${noteId}/`, config)
                setNotesData(response.data)
            }
            console.log("Notes: ",notesData)
        }
        catch(error) {
            console.log(error.response?.data);
            refreshExpiredTokenHandler()
            noteDeleteHandler(e, noteId)
        }
    }

    return(
        <>
            <NavBar />
            <section className="notes-section">
            <h1 className="notes-title">My notes</h1>
            <a href="note/new" className="new-note-button"><div>
                <h1>New note <img className="new-note-button-photo" src={Edit} alt="Edit" /></h1>
            </div></a>
                <div className="notes-container">
                    <ul className="note-list">
                        {notesData ?
                            notesData.map(note => (
                            <li key={note.id} value={note.id} className="note-container" >
                                <a href="" className="to-note"><span className="note-element" onClick={(e) => getSingleNoteHandler(e, note.id)}>
                                    <h2>{note.title}</h2>
                                </span></a>
                                <span className="note-element">
                                    <a href="" onClick={(e) => noteDeleteHandler(e, note.id)}><img className="note-button-photo" src={Delete} alt="Delete" /></a>
                                </span>

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