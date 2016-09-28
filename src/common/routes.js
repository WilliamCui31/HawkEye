import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute, IndexRedirect} from 'react-router';

//主页面
import Login from '../views/Login';
import Main from '../views/Main';

//用户管理
import Welcome from '../views/UserManagement/Welcome';
import UserAdd from '../views/UserManagement/UserAdd';
import UserList from '../views/UserManagement/UserList';
import ModifyInfo from '../views/UserManagement/ModifyInfo';
import ModifyRights from '../views/UserManagement/ModifyRights';
import UserRole from '../views/UserManagement/UserRole';
import AssignUsers from '../views/UserManagement/AssignUsers';
import AssignRights from '../views/UserManagement/AssignRights';
import ResetPassword from '../views/UserManagement/ResetPassword';

//运营报表
import OperateForm from '../views/OperateReport/OperateForm';

export default (
	<Router history={hashHistory}>
			<Route path="/" component={Login} />
  		<Route component={Main}>
  			<IndexRedirect to="/welcome" />
				<Route path="/welcome" component={Welcome} />
	  		<Route path="/userManagement">
	 				<IndexRedirect to="/userAdd" />
	 				<Route path="/userAdd" component={UserAdd} />
	 				<Route path="/userList" component={UserList} />
	 				<Route path="/userList">
						<Route path="/modifyInfo" component={ModifyInfo} />
		 				<Route path="/modifyRights" component={ModifyRights} />
					</Route>
	 				<Route path="/userRole" component={UserRole} />
					<Route path="/userRole">
		 				<Route path="/assignUsers" component={AssignUsers} />
		 				<Route path="/assignRights" component={AssignRights} />
					</Route>
	 				<Route path="/resetPassword" component={ResetPassword} />
	 			</Route>
	 			<Route path="/operateReport">
	 				<IndexRedirect to="/operateForm" />
	 				<Route path="/operateForm" component={OperateForm} />
	 			</Route>
 			</Route>
 	</Router>
);
