// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Register from "./Component/Register";
import Navbar from "./Component/Navbar";
import Quiz from "./Component/Quiz";
import Result from "./Component/Result";
import AddQuiz from "./Component/AddQuiz";


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Quiz" element={<Quiz />} />
        <Route exact path="/result" element={<Result />} />
        <Route exact path="/add-quiz" element={<AddQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
