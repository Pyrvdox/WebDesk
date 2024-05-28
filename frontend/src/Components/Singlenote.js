import React, { useState } from "react";
import NavBar from "./Navbar";
import '../Styles/singlenotestyle.css'
import { useLocation } from "react-router-dom";

const Singlenote = () => {

    const [userNote, setUserNote] = useState(null)

    const location = useLocation();
    const { user, noteId } = location.state || {};

    return(
        <>
            <NavBar/>
            <section className="note-section">
            <h1>User: {user}</h1>
            <h1>Note ID: {noteId}</h1>
            </section>
        </>
    )
}

export default Singlenote;