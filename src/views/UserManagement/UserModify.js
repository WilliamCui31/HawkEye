import React from 'react';

export default class UserModify extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="hy-cont">

			<div className="hy-panel">
		        <ul className="hy-inline-form clearfix">
		          <li><label>用户名：</label><input type="text" className="hy-input" placeholder="请输入用户名" /></li>
		          <li><label>真实姓名：</label><input type="text" className="hy-input" placeholder="输入真实的姓名" /></li>
		          <li>
		            <label>所在部门：</label>
		            <span className="hy-select-outer">
		              <span className="hy-select-inner">
		                <select className="hy-select" name="department" id="department" defaultValue="part0">
		                  <option value="part0" disabled hidden>选择其所在部门</option>  
		                  <option value="part1">产品部</option>
		                  <option value="part2">技术部</option>
		                  <option value="part3">运营部</option>
		                  <option value="part4">财务部</option>
		                  <option value="part5">人事部</option>
		                </select>
		              </span>
		            </span>
		          </li>
		          <li><label>密码：</label><input type="text" className="hy-input" placeholder="请设置" /></li>
		          <li><button className="hy-button query-button">查询</button></li>
		        </ul>
		    </div>

		    <div className="hy-section pdg20">
		    	<table className="statistic-grid" width="100%">
		    	 <caption>查询结果：</caption>
		    	 <thead>
		    	   <tr>
		    	     <th>用户名</th>
		    	     <th>真实姓名</th>
		    	     <th>登录密码</th>
		    	     <th>所在部门</th>
		    	     <th>当前状态</th>
		    	     <th width="20%">操作</th>
		    	   </tr>
		    	 </thead>
		    	 <tbody>
		    	   <tr>
		    	     <td>zhaojianping</td>
		    	     <td>赵建平</td>
		    	     <td>ntjr123456</td>
		    	     <td>产品部</td>
		    	     <td>正在使用</td>
		    	     <td><button className="link-button">修改</button>
		    	     <button className="link-button warning">禁用</button></td>
		    	   </tr>
		    	 </tbody>
		    	</table>
				
				<div className="control-menu">
				  <h1 className="control-menu-header">
				    菜单权限：
				    <label htmlFor="controlAll" className="hy-checkbox all">
				      <input type="checkbox" name="controlAll" id="controlAll" />全部勾选
				    </label>
				  </h1>
				  <dl className="control-menu-accordion">
				    <dt>
				      <label htmlFor="userManagement" className="hy-checkbox unit">
				        <input type="checkbox" name="userManagement" id="userManagement" /><i className="hy-icon down-triangle"></i>用户管理
				      </label>
				      <i className="hy-icon down-arrow"></i>
				    </dt>
				    <dd>
				      <ul className="control-menu-list">
				        <li>
				          <label htmlFor="queryUser" className="hy-checkbox">
				            <input type="checkbox" name="queryUer" id="queryUser" />查询用户
				          </label>
				        </li>
				        <li>
				          <label htmlFor="addUser" className="hy-checkbox">
				            <input type="checkbox" name="addUser" id="addUser" />新增用户
				          </label>
				        </li>
				      </ul>
				    </dd>
				    <dt>
				      <label htmlFor="userManagement" className="hy-checkbox unit">
				        <input type="checkbox" name="userManagement" id="userManagement" /><i className="hy-icon down-triangle"></i>安全设置
				      </label>
				      <i className="hy-icon down-arrow"></i>
				    </dt>
				    <dd>
				      <ul className="control-menu-list">
				        <li>
				          <label htmlFor="queryUser" className="hy-checkbox">
				            <input type="checkbox" name="queryUer" id="queryUser" />密码重置
				          </label>
				        </li>
				      </ul>
				    </dd>
				    <dt>
				      <label htmlFor="userManagement" className="hy-checkbox unit">
				        <input type="checkbox" name="userManagement" id="userManagement" /><i className="hy-icon down-triangle"></i>P2P业务报表
				      </label>
				      <i className="hy-icon down-arrow"></i>
				    </dt>
				    <dd>
				      <ul className="control-menu-list">
				        <li>
				          <label htmlFor="queryUser" className="hy-checkbox">
				            <input type="checkbox" name="queryUer" id="queryUser" />子级菜单1
				          </label>
				        </li>
				        <li>
				          <label htmlFor="addUser" className="hy-checkbox">
				            <input type="checkbox" name="addUser" id="addUser" />子级菜单2
				          </label>
				        </li>
				      </ul>
				    </dd>
				  </dl>
				  <div className="control-menu-footer clearfix">
				    <button className="hy-button secondary pull-left">取消</button>
				    <button className="hy-button pull-right">确认</button>
				  </div>
				</div>

		    </div>

	    </div>
	}
}