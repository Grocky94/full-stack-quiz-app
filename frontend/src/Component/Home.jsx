import React, { useContext } from 'react'
import "./Home.css";
import { QuizContext } from '../context/QuizHolder';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { state } = useContext(QuizContext)

  const redirect = useNavigate()

  const start = () => {
    // alert("working")
    if (state?.user) {
      if (state?.user?.role === "User") {
        redirect("/Quiz")
      }
    } else {
      alert("need to login first ")
      redirect('/')
    }
  }

  return (
    <div id="home-screen">
      <button id="start-btn" onClick={start}>Start</button>
    </div>
  )
}

export default Home
