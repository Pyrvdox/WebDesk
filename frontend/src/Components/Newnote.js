import React from 'react'
import NavBar from './Navbar';
import '../Styles/singlenotestyle.css'

const Newnote = () => { 

    return(
        <>
            <NavBar />
            <section className="note-section">
                <div className="note-box">
                <form>
                    <div className="note-header">
                        <input 
                            type="text"  
                            className="note-title-input"
                        />
                        <button>Save</button>
                    </div>
                    <div className="note-body">
                        <textarea  
                            className="note-textarea"
                        />
                    </div>
                </form>
                </div>
            </section>
        </>
    )
}

export default Newnote;