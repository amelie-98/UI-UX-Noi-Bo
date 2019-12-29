import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Header from './layouts/Header';
import Accounts from './accounts';
import Timesheets from './timesheets';
import Profile from './profile';


function MainAdmin(props) {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/Admin">
          <Accounts/>
        </Route>
        <Route path="/Admin/Timesheets">
          <Timesheets/>
        </Route>
        <Route path="/Admin/Profile">
          <Profile/>
        </Route>
      </Switch>
    </div>
  )
}

export default MainAdmin;