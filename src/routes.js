import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute, IndexRedirect} from 'react-router';

import Login from './views/Login';
import TopBar from './views/TopBar';
import SideBar from './views/UserManagement/SideBar';
import Welcome from './views/UserManagement/Welcome';
import UserModify from './views/UserManagement/UserModify';
import UserAdd from './views/UserManagement/UserAdd';
import UserList from './views/UserManagement/UserList';


export default (
	<Router history={hashHistory}>
		<Route path="/" component={Login} />
  		<Route component={TopBar}>
  			<IndexRedirect to="/welcome" />
  			<Route path="/userManagement" component={SideBar}>
 				<IndexRedirect to="/userModify" />
 				<Route path="/welcome" component={Welcome} />
 				<Route path="/userModify" component={UserModify} />
 				<Route path="/userAdd" component={UserAdd} />
 				<Route path="/userList" component={UserList} />
 			</Route>
 			<Route path="/operateReport" component={SideBar}>
 				<Route path="/welcome" component={Welcome} />
 			</Route>
 		</Route>
 	</Router>
);