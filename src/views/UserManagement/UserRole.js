import React from 'react';
import Input from '../../components/Input';
import Paging from '../../components/Paging';
import Confirm from '../../components/Confirm';
import Prompt from '../../components/Prompt';
import UserRoleStore from '../../stores/UserRoleStore';
import UserRoleActions from '../../actions/UserRoleActions';

const UserRole = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		UserRoleActions.getRolesList(1);
		return {
			rolesList: UserRoleStore.getRolesList()
		}
	},

	componentDidMount: function(){
		UserRoleStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserRoleStore.removeChangeListener(this._onChange);
	},

	render: function(){
		var rolesList=this.state.rolesList,
			roles=[],
			pageSize=0,
			recordCount=0,
			currentPage=0,
			currentRecord=0,
			totalPage=0,
			paging=null;

		if(rolesList&&rolesList.list.length>0){
			pageSize=rolesList.pageSize;
			currentPage=rolesList.pageNum*1;
			recordCount=rolesList.recordCount;
			totalPage=Math.ceil(recordCount/pageSize)*1;
			currentRecord=rolesList.list.length;

			var _this=this;
			rolesList.list.forEach(function(element,index,array){
				var roleName=<span>{element.name}<i className="hy-icon edit" onClick={_this._enableEdit} title="修改角色名称"></i></span>;
				if(element.editable) {
					roleName=<Input
						appearance="primary"
						id="name"
						inputAction={_this._updateRoleName}
						defaultValue={element.name}
						focus={true}
					/>;
				}
				roles.push(<tr key={element.id} id={element.id}>
	              <td>{(currentPage-1)*pageSize+index+1}</td>
	              <td style={{width: "200px"}}>
		              {roleName}
	              </td>
	              <td>
		              <button className="link-button" name={element.name} onClick={_this._assignRoleUsers}>分配用户</button>
		              <button className="link-button" name={element.name} onClick={_this._assignRoleRights}>分配权限</button>
		    	      <button className="link-button warning" name={element.name} onClick={_this._deleteRole}>删除</button>
	    	      </td>
	            </tr>)
			});
			paging=<Paging
				pageSize={currentRecord}
				currentPage={currentPage}
				totalPage={totalPage}
				switchPageAction={UserRoleActions.getRolesList}
			/>
		}

		return <div>

		    <div className="hy-section">
				<table className="list-grid" width="100%">
				  <caption className="list-grid-header clearfix">
					  <span className="list-grid-header-text pull-left">当前角色列表</span>
					  <button className="hy-button pull-right" onClick={this._addRole}>新增角色</button>
				  </caption>
		          <thead>
		            <tr>
		              <th>序号</th>
		              <th>角色名称</th>
		              <th>操作</th>
		            </tr>
		          </thead>
		          <tbody>
					{roles}
		          </tbody>
		          <tfoot>
		            <tr>
		              <td colSpan="3">
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
		this.setState({rolesList: UserRoleStore.getRolesList()});
	},

	_addRole: function(){
		var message=<p>角色名称是汉字，长度在2-10个汉字以内</p>;
		var addRolePrompt=<Prompt
			title="新增角色"
			name="角色名称"
			message={message}
			confirm={this._confirmAddRole}
			close={this._closePopup}
		/>;

		this.setState({
			popup: addRolePrompt
		});
	},

	_confirmAddRole: function(value){
		if(value) UserRoleActions.addRole(value);
	},

	_deleteRole: function(e){
		var roleId=e.target.parentNode.parentNode.id,
			roleName=e.target.name,
			message=<div>
				<h1>确认要删除角色:<strong className="hy-strong">{roleName}</strong>吗？</h1>
				<p>删除该角色后，所在用户都将失去该角色权限</p>
			</div>,
			deletRolePopup=<Confirm
				title="删除角色"
				message={message}
				confirm={this._confirmDeleteRole}
				close={this._closePopup}
			/>;

		this.setState({
			popup: deletRolePopup,
			roleId: roleId
		});
	},

	_confirmDeleteRole: function(){
		UserRoleActions.deleteRole(this.state.roleId);
	},

	_closePopup: function(){
		this.setState({popup: null});
	},

	_assignRoleUsers: function(e){
		var roleId=e.target.parentNode.parentNode.id,
				roleName=e.target.name;
				this.context.router.push({
					pathname: "/assignUsers",
					query: {
						roleId: roleId,
						roleName: roleName
					}
				});
	},

	_assignRoleRights: function(e){
		var roleId=e.target.parentNode.parentNode.id,
			roleName=e.target.name;
			this.context.router.push({
				pathname: "/assignRights",
				query: {
					roleId: roleId,
					roleName: roleName
				}
			});
	},

	_enableEdit: function(e){
		var rolesList=this.state.rolesList;
		var roleId=e.target.parentNode.parentNode.parentNode.id;
		rolesList.list.forEach(function(element,index,array){
			if(element.id==roleId) element.editable=true;
		});
		this.setState({rolesList: rolesList});
	},

	_updateRoleName: function(e){
		var rolesList=this.state.rolesList;
		var roleId=e.target.parentNode.parentNode.id;
		var roleName=e.target.value;
		rolesList.list.forEach(function(element,index,array){
			if(element.id==roleId) delete element.editable;
		});
		this.setState({rolesList: rolesList});
		if(roleName) UserRoleActions.modifyRoleName(roleId,roleName);
	}

});

export default UserRole;
