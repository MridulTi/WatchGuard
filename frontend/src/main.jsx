import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { DashboardProvider } from './Context/DashboardContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID=import.meta.env.VITE_GOOGLE_CLIENT_ID


ReactDOM.render(
    <DashboardProvider>
        <GoogleOAuthProvider  clientId={CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </DashboardProvider>
    , document.getElementById('root'))
