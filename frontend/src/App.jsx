import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Component/Navbar'
import Login from './Component/Login'
import Register from './Component/Register'
import Home from './Component/Home'
import Quiz from './Component/Quiz'
import Result from './Component/Result'
import AddQuiz from './Component/AddQuiz'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Quiz" element={<Quiz />} />
        <Route exact path="/result" element={<Result />} />
        <Route exact path="/add-quiz" element={<AddQuiz />} />
      </Routes>
    </>
  )
}

export default App
