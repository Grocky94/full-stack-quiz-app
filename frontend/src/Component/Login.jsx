import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import "./Login.css"
import { useNavigate } from "react-router-dom"
import { QuizContext } from '../context/QuizHolder';
const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const { dispatch } = useContext(QuizContext)
    const redirect = useNavigate()
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            try {
                const response = await axios.post("http://localhost:5000/login", { userData })
                if (response.data.success) {
                    alert(response.data.message)
                    localStorage.setItem("token", JSON.stringify(response.data.token))
                    dispatch({
                        type: "Login",
                        payload: response.data.user
                    })
                    setUserData({ email: "", password: "" })
                    redirect('/')
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.message)
            }

        } else {
            alert("all fields are required")
        }
    }
    useEffect(() => {
        const Checker = () => {
            let alreadyIn = JSON.parse(localStorage.getItem("token"))
            if (alreadyIn) {
                redirect('/')
            }
        }
        Checker()
    }, [])

    return (
        <div id='login-screen'>
            <div id='login-div'>
                <h1 id='login-headline'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label className='login-labels'>Email:</label><br />
                    <input className="login-input" type='email' name='email' onChange={handleChange} value={userData.email} /><br />
                    <label className='login-labels' >Password:</label><br />
                    <input className="login-input" type='password' name='password' onChange={handleChange} value={userData.password} /><br />
                    <input className="login-input-btn" type='submit' value="Login" />
                </form>
                <p id='login-last'>If you are a new user <b onClick={() => redirect("/register")}>Register</b></p>
            </div>
        </div>
    )
}

export default Login
