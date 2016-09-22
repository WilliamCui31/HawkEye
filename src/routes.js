import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute, IndexRedirect} from 'react-router';

import Login from './views/Login';
import TopBar from './views/TopBar';
import SideBar from './views/UserManagement/SideBar';
import Welcome from './views/UserManagement/Welcome';
import UserAdd from './views/UserManagement/UserAdd';
import UserList from './views/UserManagement/UserList';
import ModifyInfo from './views/UserManagement/ModifyInfo';
import ModifyRights from './views/UserManagement/ModifyRights';
import UserRole from './views/UserManagement/UserRole';
import AssignUsers from './views/UserManagement/AssignUsers';
import AssignRights from './views/UserManagement/AssignRights';
import ResetPassword from './views/UserManagement/ResetPassword';
import OperateForm from './views/UserManagement/OperateForm';

export default (
	<Router history={hashHistory}>
			<Route path="/" component={Login} />
  		<Route component={TopBar}>
  			<IndexRedirect to="/welcome" />
  			<Route path="/userManagement" component={SideBar}>
 				<IndexRedirect to="/userAdd" />
 				<Route path="/welcome" component={Welcome} />
 				<Route path="/userAdd" component={UserAdd} />
 				<Route path="/userList" component={UserList} />
 				<Route path="/modifyInfo" component={ModifyInfo} />
 				<Route path="/modifyRights" component={ModifyRights} />
 				<Route path="/userRole" component={UserRole} />
 				<Route path="/assignUsers" component={AssignUsers} />
 				<Route path="/assignRights" component={AssignRights} />
 				<Route path="/resetPassword" component={ResetPassword} />
 			</Route>
 			<Route path="/operateReport" component={SideBar}>
 				<IndexRedirect to="/operateForm" />
 				<Route path="/operateForm" component={OperateForm} />
 			</Route>
 		</Route>
 	</Router>
);
