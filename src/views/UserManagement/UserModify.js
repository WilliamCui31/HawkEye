import React from 'react';

export default class UserModify extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div>

			<div className="hy-panel">
		        <ul className="hy-inline-form clearfix">
		          <li><label>用户名：</label><input type="text" className="hy-input primary" /></li>
		          <li><button className="hy-button query-button">查询</button></li>
		        </ul>
		    </div>

		    <div className="hy-section pdg20">
		    	<table className="statistic-grid" width="100%">
		    	 <caption>查询结果：</caption>
		    	 <thead>
		    	   <tr>
		    	     <th>用户名</th>
		    	     <th>姓名</th>
		    	     <th>所在部门</th>
		    	     <th>所在角色</th>
		    	     <th>当前状态</th>
		    	   </tr>
		    	 </thead>
		    	 <tbody>
		    	   <tr>
		    	     <td>zhaojianping</td>
		    	     <td>赵建平</td>
		    	     <td>产品部</td>
		    	     <td></td>
		    	     <td>启用</td>
		    	   </tr>
		    	 </tbody>
		    	</table>
				
				

		    </div>

	    </div>
	}
}