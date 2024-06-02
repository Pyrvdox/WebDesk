import React, { useState } from 'react'
import NavBar from './Navbar';
import '../Styles/singlenotestyle.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Newnote = () => { 

    const [newNoteForm, setNewNoteForm] = useState({
        title:'',
        text:'',
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewNoteForm({
          ...newNoteForm,
          [e.target.name]: e.target.value,
        });
      };

    const checkForm = (e) => {
        e.preventDefault();
        console.log(newNoteForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post()
        }
        catch (error){
            console.log(error)
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
                            name='title'
                            value={newNoteForm.title}
                            className="note-title-input"
                            placeholder='title'
                            onChange={handleChange}
                        />
                        <button onClick={checkForm}>Save</button>
                    </div>
                    <div className="note-body">
                        <textarea  
                            name='text'
                            value={newNoteForm.text}
                            className="note-textarea"
                            placeholder='text'
                            onChange={handleChange}
                        />
                    </div>
                </form>
                </div>
            </section>
        </>
    )
}

export default Newnote;