import React from 'react';
import { Link } from 'react-router';
import ajax from '../../ajax';
import GlobalStore from '../../stores/GlobalStore';
import utils from '../../utils';

var ReactCSSTransitionGroup=require('react/lib/ReactCSSTransitionGroup');

const UserManagement=React.createClass({

	render: function(){
		var menusData=GlobalStore.getMenusData(this.props.location.query.columnId),menus=[];

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

});

export default UserManagement;
