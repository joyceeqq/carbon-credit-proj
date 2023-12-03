import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Dashboard from './components/Dashboard';
import './App.css';
import StartPage from './components/StartPage';
import CompanyRegistration from './components/CompanyRegistration';
import ProjectSubmission from './components/ProjectSubmission';
import TradeCompletion from './components/TradeCompletion';
import TradeCreation from './components/TradeCreation';
import ProjectValidation from './components/ProjectValidation';

function App() {
  return (
    <Router>
      <div class="h-screen">
        
        <Routes>
          <Route path="/" element={<StartPage></StartPage>}/>
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/register-company" element={<CompanyRegistration />} />
            <Route path="/dashboard/submit-project" element={<ProjectSubmission />} />
            <Route path="/dashboard/create-trade" element={<TradeCreation />} />
            <Route path="/dashboard/complete-trade" element={<TradeCompletion />} />
            <Route path="/dashboard/validate-project" element={<ProjectValidation />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
