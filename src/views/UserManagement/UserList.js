import React from 'react';

export default class UserList extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div>

			<div className="hy-panel">
		        <ul className="hy-inline-form clearfix">
		          <li><label>用户名：</label><input type="text" className="hy-input" /></li>
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
		          <li><button className="hy-button query-button">查询</button></li>
		        </ul>
		    </div>

		    <div className="hy-section">
				
				<table className="list-grid" width="100%">
		          <thead>
		            <tr>
		              <th width="5%">序号</th>
		              <th width="15%">用户名</th>
		              <th width="10%">姓名</th>
		              <th width="20%">所在部门</th>
		              <th width="10%">所在角色</th>
		              <th width="10%">当前状态</th>
		              <th width="30%">操作</th>
		            </tr>
		          </thead>
		          <tbody>
		            <tr>
		              <td>1</td>
		              <td>spenven</td>
		              <td>罗晓杰</td>
		              <td>运营部</td>
		              <td>运营部</td>
		              <td>禁用</td>
		              <td>
			              <button className="link-button">修改</button>
			    	      <button className="link-button warning">禁用</button>
		    	      </td>
		            </tr>
		            <tr>
		              <td>2</td>
		              <td>linda</td>
		              <td>张丽丽</td>
		              <td>产品部</td>
		              <td>产品部</td>
		              <td>启用</td>
		              <td>
			              <button className="link-button">修改</button>
			    	      <button className="link-button warning">禁用</button>
		    	      </td>
		            </tr>
		            <tr>
		              <td>3</td>
		              <td>kevenlin</td>
		              <td>林玉冰</td>
		              <td>测试部</td>
		              <td>测试部</td>
		              <td>离线</td>
		              <td>
			              <button className="link-button">修改</button>
			    	      <button className="link-button warning">禁用</button>
		    	      </td>
		            </tr>
		            <tr>
		              <td>4</td>
		              <td>wendly</td>
		              <td>成蓝蓝</td>
		              <td>财务部</td>
		              <td>财务部</td>
		              <td>在线</td>
		              <td>
			              <button className="link-button">修改</button>
			    	      <button className="link-button warning">禁用</button>
		    	      </td>
		            </tr>
		          </tbody>
		          <tfoot>
		            <tr>
		              <td colSpan="7">
		                <span className="paging-desc">当页共20条数据</span>
		                <button className="paging-button prev"></button>
		                <span className="paging-number">1/6</span>
		                <button className="paging-button next"></button>
		              </td>
		            </tr>
		          </tfoot>
		        </table>

		    </div>

	    </div>
	}
}