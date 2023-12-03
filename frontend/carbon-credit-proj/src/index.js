import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import background from './asset/header.png'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CompanyRegistration from './components/CompanyRegistration';
import ProjectSubmission from './components/ProjectSubmission';
import TradeCreation from './components/TradeCreation';
import TradeCompletion from './components/TradeCompletion';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Rainblur Landing Page Template: Tailwind Toolbox</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />

      <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"/>
      <link href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css" rel="stylesheet" />
    </head>
    <body class="leading-normal tracking-normal text-indigo-400 m-0 bg-cover bg-fixed" style={{ backgroundImage: `url(${background})` }}>
        <App />
    </body>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
