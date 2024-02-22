import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { QuizContext } from '../context/QuizHolder'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { state, dispatch } = useContext(QuizContext);
    console.log(state, "state from navbar")
    const redirect = useNavigate();
    const location = useLocation();
    const [openSlider, setOpenSlider] = useState(false)
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
            <i id="hamburger" class="fa-solid fa-bars" onClick={() => setOpenSlider(true)}></i>
            {openSlider && <div className='slider'>
                <div className='backLogo' onClick={() => setOpenSlider(false)}>
                    <i id="Icon-back" class="fa-solid fa-left-long"></i>
                </div>
                <div id="nav-login-logout-div-mediaQuery">
                    {!state?.user ? (<div className={location.pathname === "/login" ? "disabled" : "enabled"} id='nav-login-btn' onClick={() => redirect("/login")}>Login</div>) :
                        (<div id='nav-logout-btn' onClick={logOut}>Logout</div>)}
                </div>
            </div>}
            {state?.user?.role === "Admin" ?
                (location.pathname === "/add-quiz" ? <div id='nav-home-btn' onClick={() => redirect('/')}>Home</div> : <div id='nav-add-quiz' onClick={() => redirect('/add-quiz')}>Add Quiz</div>)
                : (null)}

            <div id='nav-login-logout-div'>
                {!state?.user ? (<div className={location.pathname === "/login" ? "disabled" : "enabled"} id='nav-login-btn' onClick={() => redirect("/login")}>Login</div>) :
                    (<div id='nav-logout-btn' onClick={logOut}>Logout</div>)}
            </div>

        </div>
    )
}

export default Navbar
