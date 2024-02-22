import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import config from "../config";

export const QuizContext = createContext();

const initialvalue = {
    user: null, 
    right: parseInt(localStorage.getItem("ans")) || 0,
    page: parseInt(localStorage.getItem("page")) || 1
};
const reducer = (state, action) => {
    switch (action.type) {
        case "Login": {
            return {
                ...state, user: action.payload, right: action.ans
            }
        }
        case "Logout": {
            return {
                ...state, user: null, right: 0
            }
        }
        default: return state
    }
}
const QuizHolder = ({ children }) => {
    const [ans, setAns] = useState(initialvalue.right);
    const [page, setPage] = useState(initialvalue.page);
    const [state, dispatch] = useReducer(reducer, initialvalue);
    useEffect(() => {
        async function getCurrentUser() {
            const token = JSON.parse(localStorage.getItem("token"))
            if (token) {
                try {
                    let response = await axios.post(`${config.backendUrl}/currentUser`, { token })
                    if (response?.data?.success) {
                        dispatch({
                            type: "Login",
                            payload: response?.data?.user,
                            ans,
                            page
                        })

                    }
                } catch (error) {
                    console.log(error.response.data.message)
                }
            }
            // function Logout() {
            //     const token = json.parse(localStorage.getItem("token"))
            //     if (token) {
            //         localStorage.removeItem("token")
            //         dispatch({
            //             type: "Logout"
            //         })
            //     }
            // }



        }
        getCurrentUser()
    }, [ans])

    return (
        <QuizContext.Provider value={{ ans, state, page, dispatch, setAns, setPage }}>
            {children}
        </QuizContext.Provider>
    )
}
export default QuizHolder