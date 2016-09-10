import React from 'react';
import { Link } from 'react-router';
import ajax from '../ajax';
import GlobalActions from '../actions/GlobalActions';
import GlobalStore from '../stores/GlobalStore';

import 'styles/normalize.css';
import 'styles/main.css';

const Main=React.createClass({

	getInitialState: function(){
		return {
			columnsData: GlobalStore.getColumnsData(),
			userInfo: GlobalStore.getUserInfo()
		}
	},

	componentDidMount: function(){
		GlobalStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		GlobalStore.removeChangeListener(this._onChange);
	},

	render: function(){

		//系统栏目
		var columnsData=this.state.columnsData,columns=[];
		for(let column of columnsData) {
			columns.push(<li key={column.id}><Link to={column.url} activeClassName="active" name={column.id} onClick={this._onSwitchColumn}>{column.name}</Link></li>)
		}

		//用户名
		var userName=this.state.userInfo.name;

		return <div>

			<div className="top-bar">
			  <ul className="top-menu clearfix">
			    {columns}
			  </ul>
			  <div className="top-account">
			    <span className="top-greating">您好，{userName}</span> <button className="link-button" onClick={this._logout}>退出登录</button>
			  </div>
			</div>
				
			{this.props.children}

		</div>
	},

	_logout: function(){
		GlobalActions.logout();
	},

	_onChange: function(){
		this.setState({
			columnsData: GlobalStore.getColumnsData(),
			userInfo: GlobalStore.getUserInfo()
		});
	},

	_onSwitchColumn: function(e) {
		GlobalActions.switchColumn(e.target.name);
	}
});

export default Main;