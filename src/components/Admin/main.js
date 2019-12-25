import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Header from './layouts/Header';
import Accounts from './accounts';
import Timesheets from './timesheets';

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
			</Switch>
		</div>
	)
}

export default MainAdmin;