import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import CheckIn from './components/Staffs/CheckIn'
import Profile from './components/Staffs/Profile'
import CheckOut from './components/Staffs/CheckOut'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">CheckIn</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/checkout">CheckOut</Link>
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
            <Route path="/checkout">
              <CheckOut />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;