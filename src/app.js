import React from 'react';
import { render } from 'react-dom';

import Login from './views/Login';
import Main from './views/Main';
import Welcome from './views/UserManagement/Welcome';
import UserManagement from './views/UserManagement/UserManagement';
import UserModify from './views/UserManagement/UserModify';

import { Router, Route, browserHistory, IndexRedirect} from 'react-router';

render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRedirect to="/userManagement" />
			<Route path="/userManagement" component={UserManagement}>
				<IndexRedirect to="/welcome" />
				<Route path="/welcome" component={Welcome} />
				<Route path="/userModify" component={UserModify} />
			</Route>
		</Route>
		<Route path="/login" component={Login} />
	</Router>,
	document.getElementById('app')
)