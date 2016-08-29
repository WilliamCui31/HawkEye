import React from 'react';
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
			    <li><a href="javascript:;" className="active">用户管理</a></li>
			    <li><a href="javascript:;">P2P业务报表</a></li>
			    <li><a href="javascript:;">运营报表</a></li>
			    <li><a href="javascript:;">财务报表</a></li>
			    <li><a href="javascript:;">活动管理</a></li>
			    <li><a href="javascript:;">预警管理</a></li>
			    <li><a href="javascript:;">推广渠道</a></li>
			  </ul>
			  <div className="top-account">
			    <span className="top-greating">您好，Admin</span> <button className="link-button">退出登录</button>
			  </div>
			</div>
				
			{this.props.children}

		</div>
	}
}