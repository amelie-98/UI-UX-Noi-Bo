import React from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link
} from "react-router-dom";
import {history} from './helpers/history/history';
import './App.css';
import Main from './main';
// import CheckIn from './components/Staffs/CheckIn'
// import Profile from './components/Staffs/Profile'\

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Main/>
      </Router>
      {/* <Router>
        <div>
          <ul>
            <li>
              <Link to="/">CheckIn</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              <CheckIn />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router> */}
    </div>
  );
}


export default App;