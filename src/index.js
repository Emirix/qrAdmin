import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./assets/css/style.css"

// axios.defaults.baseURL = "http://192.168.1.80:3050/"
axios.defaults.baseURL = "https://beautiful-fermat.185-106-208-198.plesk.page/"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
