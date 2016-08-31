import React from 'react';
import { Link } from 'react-router';

import '../../assets/styles/normalize.css';
import '../../assets/styles/main.css';

export default class Main extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div>

			<div className="top-bar">
			  <ul className="top-menu clearfix">
			    <li><Link to="/userManagement" activeClassName="active">用户管理</Link></li>
			    <li><Link to="javascript:;" activeClassName="active">运营报表</Link></li>
			  </ul>
			  <div className="top-account">
			    <span className="top-greating">您好，Admin</span> <button className="link-button">退出登录</button>
			  </div>
			</div>
				
			{this.props.children}

		</div>
	}
}