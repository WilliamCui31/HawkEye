import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Paging from '../../components/Paging';
import GlobalStore from '../../stores/GlobalStore';
import UserListStore from '../../stores/UserListStore';
import UserListActions from '../../actions/UserListActions';

const UserList = React.createClass({

	getInitialState: function(){
		return {
			userListData: UserListStore.getUserListData()
		}
	},

	componentDidMount: function(){
		UserListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserListStore.removeChangeListener(this._onChange);
	},

	render: function(){
		//部门列表
		var departmentsData=GlobalStore.getDepartments();

		//查询用户列表
		var userListData=this.state.userListData,
			users=[],
			pageSize=0,
			currentPage=0,
			totalPage=0,
			paging=null;

		if(userListData&&userListData.list.length>0){
			currentPage=userListData.pageNum*1;
			pageSize=userListData.pageSize*1;
			totalPage=Math.ceil(userListData.recordCount/pageSize)*1;
			userListData.list.forEach(function(element,index,array){
				users.push(<tr key={index}>
	              <td>{(currentPage-1)*pageSize+index+1}</td>
	              <td>{element.name}</td>
	              <td>{element.realName}</td>
	              <td>{element.deptName}</td>
	              <td>{element.roleName}</td>
	              <td>{element.isAvaliable}</td>
	              <td>
		              <button className="link-button">修改</button>
		    	      <button className="link-button warning">禁用</button>
	    	      </td>
	            </tr>)
			});
			paging=<Paging 
				pageSize={pageSize} 
				currentPage={currentPage} 
				totalPage={totalPage} 
				switchPageAction={UserListActions.queryUsers} 
			/>
		}else{
			users.push(<tr key={0} className="list-grid-placeholder"><td colSpan="7">暂时没有数据哦，请点击查询！</td></tr>);
		}

		return <div>

			<div className="hy-panel">
		        <ul className="hy-inline-form clearfix">
		          <li><label>用户名：</label><Input appearance="primary" id="name" inputAction={UserListActions.inputData}  /></li>
		          <li>
		            <label>所在部门：</label>
		            <Select appearance="primary" id="deptId" initialData={departmentsData} selectAction={UserListActions.inputData} placeholder="选择部门" />
		          </li>
		          <li><button className="hy-button query-button" onClick={this._queryUsers}>查询</button></li>
		        </ul>
		    </div>

		    <div className="hy-section">
				
				<table className="list-grid" width="100%">
		          <thead>
		            <tr>
		              <th width="5%">序号</th>
		              <th width="20%">用户名</th>
		              <th width="10%">姓名</th>
		              <th width="20%">所在部门</th>
		              <th width="15%">所在角色</th>
		              <th width="10%">当前状态</th>
		              <th width="20%">操作</th>
		            </tr>
		          </thead>
		          <tbody>
		            {users}
		          </tbody>
		          <tfoot>
		            <tr>
		              <td colSpan="7">
		              	{paging}
		              </td>
		            </tr>
		          </tfoot>
		        </table>

		    </div>

	    </div>
	},

	_onChange: function(){
		this.setState({
			userListData: UserListStore.getUserListData()
		});
	},

	_queryUsers: function(){
		var pageIndex=1;
		UserListActions.queryUsers(pageIndex);
	}
});

export default UserList;