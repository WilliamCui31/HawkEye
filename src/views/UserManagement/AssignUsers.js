import React from 'react';
import Paging from '../../components/Paging';
import Confirm from '../../components/Confirm';
import UserRoleStore from '../../stores/UserRoleStore';
import UserRoleActions from '../../actions/UserRoleActions';
import { Link } from 'react-router';

const AssignUsers = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		console.log(UserRoleStore.getRole().name);
		return {
			roleUsers: UserRoleStore.getRoleUsers(),
			role: UserRoleStore.getRole()
		}
	},

	componentDidMount: function(){
		UserRoleStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserRoleStore.removeChangeListener(this._onChange);
	},

	render: function(){
		var roleUsers=this.state.roleUsers,
			users=[],
			pageSize=0,
			recordCount=0,
			currentPage=0,
			currentRecord=0,
			totalPage=0,
			paging=null;
		if(roleUsers&&roleUsers.list.length>0){

			pageSize=roleUsers.pageSize;
			currentPage=roleUsers.pageNum*1;
			recordCount=roleUsers.recordCount;
			totalPage=Math.ceil(recordCount/pageSize)*1;
			currentRecord=roleUsers.list.length;

			var _this=this;
			roleUsers.list.forEach(function(element,index,array){
				users.push(<tr key={element.id} id={element.id}>
	              <td>{(currentPage-1)*pageSize+index+1}</td>
	              <td>{element.name}</td>
	              <td>{element.realName}</td>
	              <td>
		    	      <button className="link-button warning" name={element.name} onClick={_this._deleteUser}>删除</button>
	    	      </td>
	            </tr>)
			});
			paging=<Paging 
				pageSize={currentRecord} 
				currentPage={currentPage} 
				totalPage={totalPage} 
				switchPageAction={UserRoleActions.getRoleUsers} 
			/>
		}

		return <div className="hy-section">
			<table className="list-grid" width="100%">
			  <caption className="list-grid-header clearfix">
				  <span className="list-grid-header-text pull-left"><strong className="hy-strong">{this.state.role.name}</strong>所在用户</span>
				  <div className="pull-right">
				  	<Link to="/userRole" className="link-button">返回角色列表</Link>
				  	<button className="hy-button" onClick={this._addRole}>添加用户</button>
				  </div>
			  </caption>
	          <thead>
	            <tr>
	              <th>序号</th>
	              <th>用户名</th>
	              <th>姓名</th>
	              <th>操作</th>
	            </tr>
	          </thead>
	          <tbody>
				{users}
	          </tbody>
	          <tfoot>
	            <tr>
	              <td colSpan="4">
	              	{paging}
	              </td>
	            </tr>
	          </tfoot>
	        </table>
	        {this.state.popup}
	    </div>

	},

	_onChange: function(){
		//更新视图
		this.setState({
			roleUsers: UserRoleStore.getRoleUsers(),
			role: UserRoleStore.getRole()
		});
	},

	_deleteUser: function(e){
		var userId=e.target.parentNode.parentNode.id,
			userName=e.target.name,
			message=<div>
				<h1>确认要删除用户:<strong className="hy-strong">{userName}</strong>吗？</h1>
				<p>删除该用户后，该用户将不再拥有该角色权限！</p>
			</div>,
			deletUserPopup=<Confirm 
				message={message}
				confirm={this._confirmDeleteUser} 
				close={this._closePopup}
			/>;

		this.setState({
			popup: deletUserPopup,
			userId: userId
		});
	},

	_confirmDeleteUser: function(){
		UserRoleActions.deleteUser(this.state.userId,this.state.role.id);
	},

	_closePopup: function(){
		this.setState({popup: null});
	}

});

export default AssignUsers;