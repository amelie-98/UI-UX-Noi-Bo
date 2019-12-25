import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import MainAdmin from './components/Admin/main';

function Main(props) {
	return (
		<div>
			<Switch>
				<Route path="/Admin">
					<MainAdmin/>
				</Route>
			</Switch>
		</div>
	)
}

export default Main;