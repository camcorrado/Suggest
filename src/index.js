import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './fonts/ProzaLibre-Regular.ttf'
import './fonts/OpenSans-Light.ttf'
import './fonts/OpenSans-Regular.ttf'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);