import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Webcamtrial1 from './Webcamtrial1';
import LandingMain from './SmartGroceryProject/LandingPage/LandingMain';
import Start_Router from './SmartGroceryProject/LandingPage/Router/MainRouter';
import BeforeRouter from './SmartGroceryProject/LandingPage/Router/BeforeRouter';

ReactDOM.render(
  
   <BeforeRouter/>
   ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
