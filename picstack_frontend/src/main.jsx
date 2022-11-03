import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId='505631087154-9iv60lbd8lmp8b9rh16h5bhheaakqm2q.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
    </Router>
  //</React.StrictMode> 
)
