import React from 'react';
import { Link } from 'react-router';
import ajax from '../ajax';

import 'styles/normalize.css';
import 'styles/main.css';

//加载系统栏目
function loadColumn(){
	var columnData;
	ajax({
		url: '/eye/user/v1/getUserMenues.json',
		data: {userId: '1'},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				columnData=data.data;
			}
		}
	});
	return columnData;
}

//加载用户信息
function loadUserInfo(){
	var userInfo;
	ajax({
		url: '/eye/user/v1/getLoginUserInfo.json',
		data: {userId: '1'},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				userInfo=data.data;
			}
		}
	});
	return userInfo;
}

export default class Main extends React.Component{

	render() {

		//系统栏目
		var columnData=loadColumn(),columns=[];
		for(let column of columnData) {
			columns.push(<li key={column.id}><Link to={column.url} activeClassName="active">{column.name}</Link></li>)
		}

		//用户名
		var userName=loadUserInfo().name;

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
	}

	_logout() {
		//退出登录
		ajax({
			url: '/eye/user/v1/logout.json',
			success: function(data) {
				if(data.code==="0000") {
					console.log("退出登录");
				}
			}
		});
	}
}