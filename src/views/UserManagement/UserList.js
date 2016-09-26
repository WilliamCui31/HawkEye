import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Paging from '../../components/Paging';
import Confirm from '../../components/Confirm';
import GlobalStore from '../../stores/GlobalStore';
import UserListStore from '../../stores/UserListStore';
import UserListActions from '../../actions/UserListActions';

const UserList = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

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

		//用户列表
		var userListData=this.state.userListData,
			users=[],
			pageSize=0,
			recordCount=0,
			currentPage=0,
			currentRecord=0,
			totalPage=0,
			paging=null;

		if(userListData&&userListData.list.length>0){
			pageSize=userListData.pageSize;
			currentPage=userListData.pageNum*1;
			recordCount=userListData.recordCount;
			totalPage=Math.ceil(recordCount/pageSize)*1;
			currentRecord=userListData.list.length;

			var _this=this;
			userListData.list.forEach(function(element,index,array){
				users.push(<tr key={element.id} id={element.id}>
	              <td>{(currentPage-1)*pageSize+index+1}</td>
	              <td>{element.name}</td>
	              <td>{element.realName}</td>
	              <td>{element.deptName}</td>
	              <td>{element.roleName}</td>
	              <td>{element.isAvaliable?"启用":"禁用"}</td>
	              <td>
		              <button className="link-button" onClick={_this._modifyUserInfo}>修改信息</button>
		              <button className="link-button" onClick={_this._modifyUserRights}>修改权限</button>
		    	      <button className="link-button warning" onClick={_this._confirmSwitchUserStatus} value={element.isAvaliable}>{element.isAvaliable?"禁用":"启用"}</button>
	    	      </td>
	            </tr>)
			});
			paging=<Paging
				pageSize={currentRecord}
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
		              <th width="15%">用户名</th>
		              <th width="10%">姓名</th>
		              <th width="10%">所在部门</th>
		              <th width="10%">所在角色</th>
		              <th width="10%">当前状态</th>
		              <th>操作</th>
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

		   	{this.state.popup}

	    </div>
	},

	_onChange: function(){
		//更新视图
		this.setState({userListData: UserListStore.getUserListData()});
	},

	_queryUsers: function(){
		//查询用户列表
		var pageIndex=1;
		UserListActions.queryUsers(pageIndex);
	},

	_confirmSwitchUserStatus: function(e){
		//准备切换用户状态
		var userId=e.target.parentNode.parentNode.id;
		var isAvaliable=e.target.value;
		var message=<h1>您确定要启用该用户吗？</h1>;
		if(isAvaliable==1) {
			message=<div>
				<h1>您确定要禁用该用户吗？</h1>
				<p>对用户禁用操作后，该用户将不能再登陆使用鹰眼系统</p>
			</div>;
		}

		this.setState({
			popup: <Confirm
				message={message}
				confirm={this._switchUserStatus}
				close={this._closePopup}
			/>,
			userId: userId,
			isAvaliable: isAvaliable
		});
	},

	_switchUserStatus: function(){
		//切换用户状态

		var userId=this.state.userId;
		var isAvaliable=this.state.isAvaliable;

		UserListActions.switchUserStatus(userId,isAvaliable);
	},

	_closePopup: function(){
		//关闭弹窗
		this.setState({popup: null});
	},

	_modifyUserInfo: function(e){
		//修改用户信息
		var userId=e.target.parentNode.parentNode.id;
		this.context.router.push({
			pathname: "/modifyInfo",
			query: {userId: userId}
		});
	},

	_modifyUserRights: function(e){
		//修改用户权限
		var userId=e.target.parentNode.parentNode.id;
		this.context.router.push({
			pathname: "/modifyRights",
			query: {userId: userId}
		});
	}

});

export default UserList;
