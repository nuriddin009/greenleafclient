import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-phone-input-2/lib/material.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
        <ToastContainer/>
    </BrowserRouter>
)
