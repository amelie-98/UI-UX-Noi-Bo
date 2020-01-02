import React from 'react';
import {Switch,Route} from "react-router-dom";
import Header from './layouts/Header';
import CheckIn from './checkin/index';
import CheckOut from './checkout/index';
import Timesheets from './timesheets';
import Profile from './profile/index';

function MainSaffs(props) {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/">
          <CheckIn/>
        </Route>
        <Route path="/checkout">
          <CheckOut/>
        </Route>
        <Route path="/timesheets">
          <Timesheets/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
      </Switch>
    </div>
  )
}

export default MainSaffs;