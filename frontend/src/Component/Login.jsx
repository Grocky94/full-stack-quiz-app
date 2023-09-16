import React, { useState } from 'react'
import axios from "axios";

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
console.log(userData)
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
                    setUserData({ email: "", password: "" })
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

    return (
        <div>
            <div className='login-div'>
                <form onSubmit={handleSubmit}>
                    <label >Email:</label><br />
                    <input type='email' name='email' onChange={handleChange} /><br />
                    <label >password:</label><br />
                    <input type='password' name='password' onChange={handleChange} /><br />
                    <input type='submit' value="Login" />
                </form>
            </div>
        </div>
    )
}

export default Login
