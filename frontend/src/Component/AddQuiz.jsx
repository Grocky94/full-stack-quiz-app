import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { QuizContext } from '../context/QuizHolder'
import { useNavigate } from 'react-router-dom'
import "./AddQuiz.css"
const AddQuiz = () => {
    const { state } = useContext(QuizContext)
    const redirect = useNavigate()
    const [userData, setUserData] = useState({ question: "", option1: "", option2: "", option3: "", option4: "", answer: "" })

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.question && userData.option1 && userData.option2 && userData.option3 && userData.option4 && userData.answer) {
            try {
                const token = JSON.parse(localStorage.getItem("token"))
                if (token) {
                    const response = await axios.post("http://localhost:5000/addQuiz",
                        { userData, token })
                    if (response?.data?.success) {
                        alert(response.data.message)
                        setUserData({ question: "", option1: "", option2: "", option3: "", option4: "", answer: "" })
                    }
                    alert(response.data.message)

                } else {
                    return alert("Admin not valid")
                }
            } catch (error) {
                alert(error.response.data.message)
            }

        } else {
            alert("please fill all fields")
        }
    }

    useEffect(() => {
        if (state && state.user) {
            if (state.user.role == 'Admin') {
                //show them this page
            } else {
                alert('Page not accessible');
                redirect('/');
            }
        }
    }, [state]);

    return (
        <div id='add-quiz-screen'>
            <div id='add-quiz-div'>
                <h1 id='add-quiz-headline'>Add Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <label className='add-quiz-label'>Question</label><br />
                    <textarea className='add-quiz-textarea' type='text' name='question' onChange={handleChange} value={userData.question} /><br />
                    <label className='add-quiz-label'>Option 1 : </label><br />
                    <input className='add-quiz-input' type='text' name='option1' onChange={handleChange} value={userData.option1} /><br />
                    <label className='add-quiz-label'>Option 2 : </label><br />
                    <input className='add-quiz-input' type='text' name='option2' onChange={handleChange} value={userData.option2} /><br />
                    <label className='add-quiz-label'>Option 3 : </label><br />
                    <input className='add-quiz-input' type='text' name='option3' onChange={handleChange} value={userData.option3} /><br />
                    <label className='add-quiz-label'>Option 4 : </label><br />
                    <input className='add-quiz-input' type='text' name='option4' onChange={handleChange} value={userData.option4} /><br />
                    <label className='add-quiz-label'>Answer : </label><br />
                    <input className='add-quiz-input' type='text' name='answer' onChange={handleChange} value={userData.answer} /><br />
                    <button id='add-quiz-submit-btn'>Submit Quiz</button>
                </form>
            </div>
        </div>
    )
}

export default AddQuiz
