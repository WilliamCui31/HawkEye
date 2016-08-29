import React from 'react';
import '../../assets/styles/normalize.css';
import '../../assets/styles/main.css';

import { Link } from 'react-router';

export default class Main extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div>

			<div className="top-bar">
			  <ul className="top-menu clearfix">
			    <li><Link to="/userManagement" activeClassName="active">用户管理</Link></li>
			    <li><Link to="javascript:;" activeClassName="active">P2P业务报表</Link></li>
			    <li><Link to="javascript:;" activeClassName="active">运营报表</Link></li>
			    <li><Link to="javascript:;" activeClassName="active">财务报表</Link></li>
			    <li><Link to="javascript:;" activeClassName="active">活动管理</Link></li>
			    <li><Link to="javascript:;" activeClassName="active">预警管理</Link></li>
			    <li><Link to="javascript:;" activeClassName="active">推广渠道</Link></li>
			  </ul>
			  <div className="top-account">
			    <span className="top-greating">您好，Admin</span> <button className="link-button">退出登录</button>
			  </div>
			</div>
				
			{this.props.children}

		</div>
	}
}