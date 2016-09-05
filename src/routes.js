import React from 'react';
import { Router, Route, hasHistory, IndexRedirect} from 'react-router';

import Login from './views/Login';
import Main from './views/Main';
import Welcome from './views/UserManagement/Welcome';
import UserManagement from './views/UserManagement/UserManagement';
import UserModify from './views/UserManagement/UserModify';
import UserAdd from './views/UserManagement/UserAdd';
import UserList from './views/UserManagement/UserList';


export default (
	<Router history={hasHistory}>
		<Route path="/" component={Main}>
			<IndexRedirect to="/welcome" />
			<Route path="/userManagement" component={UserManagement}>
				<IndexRedirect to="/userModify" />
				<Route path="/welcome" component={Welcome} />
				<Route path="/userModify" component={UserModify} />
				<Route path="/userAdd" component={UserAdd} />
				<Route path="/userList" component={UserList} />
			</Route>
		</Route>
		<Route path="/login" component={Login} />
	</Router>
);