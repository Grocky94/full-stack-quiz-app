import React, { useContext } from 'react'
import "./Navbar.css"
import { QuizContext } from '../context/QuizHolder'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const { state, dispatch } = useContext(QuizContext)
    const redirect = useNavigate()


    const logOut = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            localStorage.removeItem("token")
            dispatch({
                type: "Logout"
            })
            redirect('/')
        }
    }


    return (
        <div id='nav-screen'>
            {state?.user?.role == "Admin" ? <div id='nav-add-quiz' onClick={() => redirect('/add-quiz')}>Add Quiz</div> : null}
            <div id='nav-login-logout-div'>
                {!state?.user ? (<div id='nav-login-btn' onClick={() => redirect("/login")}>Login</div>) :
                    (<div id='nav-logout-btn' onClick={logOut}>Logout</div>)}
            </div>
        </div>
    )
}

export default Navbar
