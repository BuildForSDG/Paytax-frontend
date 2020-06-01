import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Index';
import SideNavBar from './SideNavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/" exact component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
