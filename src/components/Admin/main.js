import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Header from './layouts/Header';
import Accounts from './accounts';
import Timesheets from './timesheets';
import Profile from './profile';
import DetailAccount from './accounts/detail';

function MainAdmin(props) {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/admin">
          <Accounts/>
        </Route>
        <Route path="/admin/timesheets">
          <Timesheets/>
        </Route>
        <Route path="/admin/profile">
          <Profile/>
        </Route>
        <Route path="/admin/detailAccount/:id">
          <DetailAccount/>
        </Route>
      </Switch>
    </div>
  )
}

export default MainAdmin;