import Login from './views/Login';
import Main from './views/Main';
import Welcome from './views/UserManagement/Welcome';
import UserManagement from './views/UserManagement/UserManagement';
import UserModify from './views/UserManagement/UserModify';

import { Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';

var Routes = function() {
	<Route path="/" component={Main}>
		<IndexRedirect to="/welcome" />
		<Route component={UserManagement}>
			<Route path="/welcome" component={Welcome} />
			<Route path="/userModify" component={UserModify} />
		</Route>
	</Route>
	<Route path="/login" component={Login} />
}