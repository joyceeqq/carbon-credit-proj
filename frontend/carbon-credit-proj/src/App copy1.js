import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CompanyRegistration from './components/CompanyRegistration';
import ProjectSubmission from './components/ProjectSubmission';
import TradeCreation from './components/TradeCreation';
import TradeCompletion from './components/TradeCompletion';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Responsive Navigation Bar */}
        <nav className="main-nav">
          <ul>
            <li><Link to="/register-company">Register Company</Link></li>
            <li><Link to="/submit-project">Submit Project</Link></li>
            <li><Link to="/create-trade">Create Trade</Link></li>
            <li><Link to="/complete-trade">Complete Trade</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/register-company" element={<CompanyRegistration />} />
          <Route path="/submit-project" element={<ProjectSubmission />} />
          <Route path="/create-trade" element={<TradeCreation />} />
          <Route path="/complete-trade" element={<TradeCompletion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
