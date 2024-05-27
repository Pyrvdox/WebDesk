import React, { useState } from "react";
import NavBar from "./Navbar";
import '../Styles/singlenotestyle.css'

const Singlenote = () => {

    const [userNote, setUserNote] = useState(null)

    return(
        <>
            <NavBar/>
            <section className="note-section">

            </section>
        </>
    )
}

export default Singlenote;