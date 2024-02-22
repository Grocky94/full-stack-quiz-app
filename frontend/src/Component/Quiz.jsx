import React, { useContext, useEffect, useState } from 'react'
import "./Quiz.css"
// import "./CircleTimer.css"
import config from '../config';
import axios from 'axios'
import { QuizContext } from '../context/QuizHolder';
import { useNavigate } from "react-router-dom"
const Quiz = () => {
    const [selectedOptions, setSelectedOptions] = useState("");
    const [quizzes, setQuizzes] = useState();
    const [seconds, setSeconds] = useState(parseInt(localStorage.getItem("seconds")) || 30);
    const { ans, page, setPage, setAns } = useContext(QuizContext)

    const redirect = useNavigate()

    useEffect(() => {
        const quizPager = async () => {
            try {
                const response = await axios.post(`${config.backendUrl}/quizPager`, { page: page })
                console.log(response, "response from quiz")
                if (response.data.success) {
                    setQuizzes(response.data.Quiz)
                } else {
                    alert('internal error')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        quizPager()
    }, [page])

    useEffect(() => {
        const Checker = () => {
            let alreadyIn = JSON.parse(localStorage.getItem("token"))
            if (!alreadyIn) {
                redirect('/')
            }
        }
        Checker()
    }, [redirect])

    useEffect(() => {
        const timerId = seconds > 0 && setTimeout(() => setSeconds(prev => prev - 1), 1000);
        localStorage.setItem("seconds", seconds);

        const handleTimeUp = async () => {
            const finder = await axios.get(`${config.backendUrl}/totalQuiz`);
            const quizLength = finder.data.Quiz.length;
            if (page >= quizLength) {
                redirect('/result');
            } else {
                setPage(prev => prev + 1);
                setSeconds(30);
            }
        };

        if (seconds === 0) {
            if (selectedOptions === "") {
                const confirmation = confirm("Time's up! Please select OK to proceed");
                if (confirmation) {
                    handleTimeUp();
                }
            } else {
                handleTimeUp();
            }
        }

        return () => clearTimeout(timerId);
    }, [seconds, page, selectedOptions, setPage, redirect]);


    useEffect(() => {
        localStorage.setItem("page", page);
        localStorage.setItem("ans", ans)
    }, [page, ans]);

    const saveHandler = async (id, selectedOption) => {
        try {
            const response = await axios.post(`${config.backendUrl}/checkAnswer`, { _id: id, option: selectedOption });
            if (response.data.success) {
                setAns((prev) => prev + 1)
                setSelectedOptions('');
                // alert(" Answer given")
            }
            // } else {
            //     alert(" Answer given")
            // }
            const finder = await axios.get(`${config.backendUrl}/totalQuiz`)
            let quizLength = finder.data.Quiz.length
            if (page >= quizLength) {
                redirect('/result')
            } else {
                setPage((prev) => prev + 1)
                setSeconds(30);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const reset = () => {
        alert("reset actioned")
        setAns(0);
        setPage(1);
        setSeconds(30);
    }
    const exit = () => {
        alert('exit actioned')
        redirect('/result');
    }

    const progressValue = (seconds / 30) * 100;


    return (
        <>
            <div className="count-text">
                CountDown : {seconds || 0}
            </div>
            <div className="count-progress-outer"><div style={{ width: seconds ? `${progressValue}%` : "100%", backgroundColor: "#944E63", height: "100%" }}></div></div>
            <div id='quiz-screen'>
                {quizzes && quizzes.map((Quiz, index) => (
                    <>
                        < div id='quiz-div' key={Quiz._id || index}>
                            <div id='quiz-question'>
                                Q. {Quiz.question}
                            </div>
                            <div id='option-screen'>
                                <div className='ans-option'>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions === "option1" ? '#B47B84' : '',
                                        color: selectedOptions === "option1" ? 'white' : '#d2d2d2',
                                    }}
                                        onClick={() => setSelectedOptions("option1")}>{Quiz.option1}</div>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions === "option2" ? '#B47B84' : '',
                                        color: selectedOptions === "option2" ? 'white' : '#d2d2d2',
                                    }}
                                        onClick={() => setSelectedOptions("option2")}>{Quiz.option2}</div>
                                </div>
                                <div className='ans-option'>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions === "option3" ? '#B47B84' : '',
                                        color: selectedOptions === "option3" ? 'white' : '#d2d2d2',
                                    }}
                                        onClick={() => setSelectedOptions("option3")}>{Quiz.option3}</div>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions === "option4" ? '#B47B84' : '',
                                        color: selectedOptions === "option4" ? 'white' : '#d2d2d2',
                                    }}
                                        onClick={() => setSelectedOptions("option4")}>{Quiz.option4}</div>
                                </div>
                            </div>
                            <div id='btn-div'>
                                <button id='reset-btn' onClick={reset}>Reset</button>
                                <button id='save-next-btn' onClick={() => saveHandler(Quiz._id, selectedOptions)}>Save & Next</button>
                                <button id='exit-btn' onClick={exit}>Exit</button>
                            </div>
                        </div>
                    </>
                ))
                }
            </div >
        </>)
}

export default Quiz
