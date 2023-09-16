// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Register from "./Component/Register";

function App() {
  return (
    <div>

      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
