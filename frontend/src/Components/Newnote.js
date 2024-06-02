import React, { useState } from 'react'
import NavBar from './Navbar';
import '../Styles/singlenotestyle.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import refreshExpiredTokenHandler from '../utils/refreshexpired';


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("accessToken");
            if (token) {
                const config = {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                };
            const response = await axios.post(`http://127.0.0.1:8000/api/notes/`, newNoteForm, config)
            console.log('Note created:', response.data);
            
            }
        }
        catch (error){
            console.log(error.response)
            await refreshExpiredTokenHandler()
            handleSubmit(e)
        }
        navigate('/notes')
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
                        <button type="submit" onClick={handleSubmit}>Save</button>
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