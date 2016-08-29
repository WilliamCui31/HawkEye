import React from 'react';

export default class UserMod extends React.Component{
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
		    </div>

	    </div>
	}
}