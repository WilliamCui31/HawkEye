import React from 'react';
import { Link } from 'react-router';
import MainActions from '../actions/MainActions';
import MainStore from '../stores/MainStore';

var ReactCSSTransitionGroup=require('react/lib/ReactCSSTransitionGroup');

import 'styles/normalize.css';
import 'styles/main.css';

const Main=React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function(){
		return {
			columnsData: MainStore.getColumnsData(),
			userInfo: MainStore.getUserInfo(),
			menusData: MainStore.getMenusData()
		}
	},

	componentDidMount: function(){
		MainStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		MainStore.removeChangeListener(this._onChange);
	},

	render: function(){

		//系统栏目
		var columnsData=this.state.columnsData,columns=[];
		for(let column of columnsData) {
			columns.push(<li key={column.id}><Link to={column.url} activeClassName="active" name={column.url} title={column.id} onClick={this._onSwitchColumn}>{column.name}</Link></li>)
		}

		//用户名
		var userName=this.state.userInfo.name;

		var menusData=this.state.menusData,menus=[];

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

			<div className="top-bar">
			  <ul className="top-menu clearfix">
			    {columns}
			  </ul>
			  <div className="top-account">
			    <span className="top-greating">您好，{userName}</span> <button className="link-button" onClick={this._logout}>退出登录</button>
			  </div>
			</div>

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
	},

	_logout: function(){
		MainActions.logout();
	},

	_onChange: function(){
		this.setState({
			columnsData: MainStore.getColumnsData(),
			userInfo: MainStore.getUserInfo()
		});
	},

	_onSwitchColumn: function(e) {
		var columnId=e.target.title;
		//修改栏目ID
		sessionStorage.setItem("columnId",columnId);
		this.setState({
			menusData: MainStore.getMenusData()
		});
	}
});

export default Main;
