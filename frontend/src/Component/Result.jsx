import React, { useContext, useEffect, useState } from 'react'
import "./Result.css"
import { useNavigate } from 'react-router-dom'
import { QuizContext } from '../context/QuizHolder'
import axios from 'axios'
import config from '../config'
const Result = () => {
    const { ans, setAns, setPage } = useContext(QuizContext)
    const [total, setTotal] = useState(0)
    const redirect = useNavigate()

    const submit = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("token"))
            let submition = await axios.patch(`${config.backendUrl}/submitAnswer`, { token, ans })
            if (submition.data.success) {
                alert(submition.data.message)
                alert("thank you for playing");
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        const totalQuiz = async () => {
            try {
                const finder = await axios.get(`${config.backendUrl}/totalQuiz`)
                if (finder.data.Quiz) {
                    let quizLength = finder.data.Quiz.length
                    setTotal(quizLength)
                }
            } catch (error) {
                console.log(error.message)

            }
        }
        totalQuiz()
    }, [])

    const playAgain = () => {
        setAns(0);
        setPage(1);
        redirect('/Quiz')
    }
    return (
        <div id='res-screen'>
            <div id='res-div'>
                <div id='res-headline-holder'>
                    <h1 id='res-headline'>Result</h1>
                </div>
                <div id='res-statement-holder'>
                    <p id='res-statement'>{ans} are correct out of {total}</p>
                </div>
                <div id='res-btn-holder'>
                    <button id='play-agin-btn' onClick={playAgain}>Play Again</button>
                    <button id='submit-btn' onClick={submit}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default Result
