import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CompanyRegistration from './components/CompanyRegistration';
import ProjectSubmission from './components/ProjectSubmission';
import TradeCreation from './components/TradeCreation';
import TradeCompletion from './components/TradeCompletion';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/register-company">Register Company</Link>
            </li>
            <li>
              <Link to="/submit-project">Submit Project</Link>
            </li>
            <li>
              <Link to="/create-trade">Create Trade</Link>
            </li>
            <li>
              <Link to="/complete-trade">Complete Trade</Link>
            </li>
          </ul>
        </nav>

        {/* Route Configuration */}
        <Switch>
          <Route path="/register-company">
            <CompanyRegistration />
          </Route>
          <Route path="/submit-project">
            <ProjectSubmission />
          </Route>
          <Route path="/create-trade">
            <TradeCreation />
          </Route>
          <Route path="/complete-trade">
            <TradeCompletion />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
