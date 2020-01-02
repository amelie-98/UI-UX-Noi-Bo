import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import MainAdmin from './components/Admin/main';
import MainSaffs from './components/Staffs/main';
import Login from './components/Auth/Login';
import PasswordSetting from './components/Auth/PasswordSetting';
import ResetPassword from './components/Auth/ResetPassword';

function Main(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route path="/password-setting">
          <PasswordSetting/>
        </Route>
        <Route path="/reset-passwourd">
          <ResetPassword/>
        </Route>
        <Route path="/admin">
          <MainAdmin/>
        </Route>
        <Route path="/">
          <MainSaffs/>
        </Route>
      </Switch>
    </div>
  )
}

export default Main;