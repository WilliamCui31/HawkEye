import React from 'react';
import { render } from 'react-dom';

import Login from './views/Login';
import Main from './views/Main';
import UserMan from './views/UserMan/UserMan';
import UserMod from './views/UserMan/UserMod';

import { Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';

render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRedirect to="/userMan" />
			<Route path="/userMan" component={UserMan}>
				<Route path="modify" component={UserMod} />
			</Route>
		</Route>
		<Route path="/login" component={Login} />
	</Router>,
	document.getElementById('app')
)