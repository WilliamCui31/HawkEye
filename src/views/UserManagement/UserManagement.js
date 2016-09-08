import React from 'react';
import { Link } from 'react-router';
import ajax from '../../ajax';

var ReactCSSTransitionGroup=require('react/lib/ReactCSSTransitionGroup');

//加载菜单
function loadMenu(){
	var menuData;
	ajax({
		url: '/eye/user/v1/getUserRights.json',
		data: {userId: '1',pid: "1"},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				menuData=data.data;
			}
		}
	});
	return menuData;
}

export default class UserManagement extends React.Component{

	render() {

		var menusData=loadMenu(),menus=[];

		for(let category of menusData) {
			var linkDatas=category.datas, links=[];
			for(let link of linkDatas){
				links.push(<Link key={link.id} to={link.url} activeClassName="active">{link.name}</Link>);
			}
			menus.push(
				<li key={category.id} className="side-category">
				<h1 className="side-category-tit">{category.name}<i className="hy-icon down-arrow"></i></h1>
				<div className="side-category-cont">
					{links}
				</div>
				</li>
			);
		}

		return <div>
		
			<ul className="side-bar">
			    {menus}
			</ul>

			<div className="hy-cont">
				<ReactCSSTransitionGroup 
					transitionName="left_cut" 
					transitionEnterTimeout={200} 
					transitionLeaveTimeout={200}>
					{React.cloneElement(this.props.children, {key: this.props.location.pathname})}
				</ReactCSSTransitionGroup>
			</div>
			
		</div>
	}
}