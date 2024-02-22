import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import QuizHolder from './context/QuizHolder.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QuizHolder>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QuizHolder>
  // </React.StrictMode>,
)
