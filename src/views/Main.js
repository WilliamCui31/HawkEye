import React from 'react';
import { Link } from 'react-router';
import MainActions from '../actions/MainActions';
import MainStore from '../stores/MainStore';
import classnames from 'classnames';

var ReactCSSTransitionGroup=require('react/lib/ReactCSSTransitionGroup');

import 'styles/normalize.css';
import 'styles/main.css';

const Main=React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function(){
		var columnsData=MainStore.getColumnsData();
		var userInfo=MainStore.getUserInfo();
		var menusData=MainStore.getMenusData();
		if(menusData) menusData[0].spread="spread";
		return {
			columnsData: columnsData,
			userInfo: userInfo,
			menusData: menusData
		}
	},

	render: function(){
		var _this=this;

		//系统栏目
		var columnsData=this.state.columnsData,columns=[];

		if(columnsData){
			columnsData.forEach(function(column){
				columns.push(<li key={column.id}>
					<Link
						to={column.url}
						activeClassName="active"
						data-id={column.id}
						onClick={_this._onSwitchColumn}>
						{column.name}
					</Link>
				</li>);
			});
		}

		//用户名
		if(!this.state.userInfo) location.assign("/");
		var userName=this.state.userInfo.name;

		//栏目下面的菜单
		var menusData=this.state.menusData,menus=[];
		if(menusData){
			menusData.forEach(function(category){
				var linkDatas=category.datas, links=[];
				linkDatas.forEach(function(link){
					links.push(<Link key={link.id} to={link.url} activeClassName="active">{link.name}</Link>);
				});
				menus.push(
					<li key={category.id} className="side-category">
						<h1 className="side-category-tit" data-id={category.id} onClick={_this._onSpreadMenu}>{category.name}<i className="hy-icon down-arrow" data-id={category.id} onClick={_this._onSpreadMenu}></i></h1>
						<div className="side-category-cont-wrap">
							<div className={classnames("side-category-cont",category.spread)}>
								{links}
							</div>
						</div>
					</li>
				);
			});
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
				{this.props.children}
			</div>

		</div>
	},

	_logout: function(){
		MainActions.logout();
	},

	_onSwitchColumn: function(e) {
		var columnId=e.target.dataset?e.target.dataset.id:e.target.getAttribute('data-id');

		//修改栏目ID
		sessionStorage.setItem("columnId",columnId);

		//更新右侧菜单
		var menusData=MainStore.getMenusData();
		menusData[0].spread="spread";
		this.setState({
			menusData: menusData
		});
	},

	_onSpreadMenu: function(e){
		e.stopPropagation();

		var menuId=e.target.dataset?e.target.dataset.id:e.target.getAttribute('data-id');
		var menusData=this.state.menusData;
		menusData.forEach(function(element,index,array){
			if(element.id==menuId) {
				if(element.spread) {
					delete element.spread;
				}else {
					element.spread="spread";
				}
			}
		});

		//更新菜单状态
		this.setState({
			menusData: menusData
		})
	}

});

export default Main;
