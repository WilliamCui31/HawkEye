import React from 'react';

export default class UserMan extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
		
			<ul className="side-bar">
			  <li className="side-category">
			    <h1 className="side-category-tit">用户管理<i className="hy-icon down-arrow"></i></h1>
			    <div className="side-category-cont">
			      <a href="javascript:;" className="active">用户修改</a>
			      <a href="javascript:;">用户新增</a>
			      <a href="javascript:;">用户列表</a>
			      <a href="javascript:;">用户角色</a>
			    </div>
			  </li>
			  <li className="side-ategory">
			    <h1 className="side-category-tit">安全中心<i className="hy-icon down-arrow"></i></h1>
			    <div className="side-category-cont">
			      <a href="javascript:;">密码重置</a>
			      <a href="javascript:;">运营报告</a>
			    </div>
			  </li>
			</ul>

			{this.props.children}

		</div>
	}
}