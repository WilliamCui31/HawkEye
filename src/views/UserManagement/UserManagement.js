import React from 'react';
import { Link } from 'react-router'

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
			      <Link to="/welcome" activeClassName="active">欢迎登录</Link>
			      <Link to="/userModify" activeClassName="active">用户修改</Link>
			      <Link to="/userAdd" activeClassName="active">用户新增</Link>
			      <Link to="/userList" activeClassName="active">用户列表</Link>
			      <Link to="/userRole" activeClassName="active">用户角色</Link>
			    </div>
			  </li>
			  <li className="side-ategory">
			    <h1 className="side-category-tit">安全中心<i className="hy-icon down-arrow"></i></h1>
			    <div className="side-category-cont">
			      <Link to="/resetPassword" activeClassName="active">密码重置</Link>
			      <Link to="/operateReport" activeClassName="active">运营报告</Link>
			    </div>
			  </li>
			</ul>

			{this.props.children}

		</div>
	}
}