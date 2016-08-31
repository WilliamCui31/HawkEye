import React from 'react';
import { Link } from 'react-router';

var ReactCSSTransitionGroup=require('react/lib/ReactCSSTransitionGroup');

export default class UserManagement extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
		
			<ul className="side-bar">
			  <li className="side-category">
			    <h1 className="side-category-tit">用户管理<i className="hy-icon down-arrow"></i></h1>
			    <div className="side-category-cont">
			      <Link to="/userModify" activeClassName="active">权限修改</Link>
			      <Link to="/userAdd" activeClassName="active">用户新增</Link>
			      <Link to="/userList" activeClassName="active">用户列表</Link>
			      <Link to="/userRole" activeClassName="active">用户角色</Link>
			      <Link to="/resetPassword" activeClassName="active">密码重置</Link>
			    </div>
			  </li>
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