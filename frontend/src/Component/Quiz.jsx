import React, { useContext, useEffect, useState } from 'react'
import "./Quiz.css"
import axios from 'axios'
import { QuizContext } from '../context/QuizHolder';
import { useNavigate } from "react-router-dom"
const Quiz = () => {
    const [selectedOptions, setSelectedOptions] = useState("");
    const [quizzes, setQuizzes] = useState()
    const [page, setPage] = useState(1);
    // const [seconds, setSeconds] = useState(30);
    const { setAns } = useContext(QuizContext)
    const redirect = useNavigate()

    useEffect(() => {
        const quizPager = async () => {
            try {
                const response = await axios.post("http://localhost:5000/quizPager", { page: page })
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
    }, [])

    //pending with countDown timmer 

    // useEffect(() => {
    //     const countDown = () => {
    //         let myInterval = setInterval(() => {
    //             if (seconds > 0) {
    //                 setSeconds(seconds - 1); 
    //             } else {
    //                 clearInterval(myInterval); 
    //             }
    //         }, 1000);
    //         return () => {
    //             clearInterval(myInterval);
    //         };
    //     };
    //     if (seconds > 0) {
    //         // countDown();
    //     }
    // }, [seconds]);



    const saveHandler = async (id, selectedOption) => {
        try {
            const response = await axios.post("http://localhost:5000/checkAnswer", { _id: id, option: selectedOption });
            if (response.data.success) {
                setAns((prev) => prev + 1)
                setSelectedOptions('')
                // alert(" Answer given")
            }
            // } else {
            //     alert(" Answer given")
            // }
            const finder = await axios.get("http://localhost:5000/totalQuiz")
            let quizLength = finder.data.Quiz.length
            if (page == quizLength) {
                redirect('/result')
            } else {
                setPage((prev) => prev + 1)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const reset = () => {
        alert("reset actioned")
        setAns(0);
        setPage(1)
    }
    const exit = () => {
        alert('exit actioned')
        redirect('/result');
    }


    return (
        <>
            <div id='count-down'>Count Down :</div>
            <div id='quiz-screen'>
                {quizzes && quizzes.map((Quiz) => (
                    <>
                        < div id='quiz-div' key={Quiz._id}>
                            <div id='quiz-question'>
                                Q. {Quiz.question}
                            </div>
                            <div id='option-screen'>
                                <div className='ans-option'>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions == "option1" ? 'lightskyblue' : '',
                                        color: selectedOptions == "option1" ? 'white' : 'black',
                                    }}
                                        onClick={() => setSelectedOptions("option1")}>{Quiz.option1}</div>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions == "option2" ? 'lightskyblue' : '',
                                        color: selectedOptions == "option2" ? 'white' : 'black',
                                    }}
                                        onClick={() => setSelectedOptions("option2")}>{Quiz.option2}</div>
                                </div>
                                <div className='ans-option'>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions == "option3" ? 'lightskyblue' : 'transparent',
                                        color: selectedOptions == "option3" ? 'white' : 'black',
                                    }}
                                        onClick={() => setSelectedOptions("option3")}>{Quiz.option3}</div>
                                    <div className='sub-option' style={{
                                        backgroundColor: selectedOptions == "option4" ? 'lightskyblue' : 'transparent',
                                        color: selectedOptions == "option4" ? 'white' : 'black',
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
