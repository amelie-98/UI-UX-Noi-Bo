import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import MainAdmin from './components/Admin/main';
import MainSaffs from './components/Staffs/main';
import PasswordSetting from './components/Auth/PasswordSetting';

function Main(props) {
  return (
    <div>
      <Switch>
        <Route path="/PasswordSetting">
          <PasswordSetting/>
        </Route>
        <Route path="/Admin">
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