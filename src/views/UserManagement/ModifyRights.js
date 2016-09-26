import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import ControlMenu from '../../components/ControlMenu';
import UserListActions from '../../actions/UserListActions';
import GlobalStore from '../../stores/GlobalStore';
import UserListStore from '../../stores/UserListStore';
import assign from 'object-assign';

const ModifyRights = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		var userId=this.props.location.query.userId;
		return {
			userId: userId,
			userRights: UserListStore.getUserRights(userId)
		}
	},

	componentDidMount: function(){
		UserListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserListStore.removeChangeListener(this._onChange);
	},

	render: function() {
		//角色列表
		var rolesData=GlobalStore.getRoles();
		//权限树列表
		var rightsData=this.state.userRights;

		console.log("000000",rightsData);

		return <div className="hy-section pdg20">

			<ul className="hy-multiline-form clearfix" style={{width: "285px"}}>
				<li>
					<label>用户角色：</label>
					<Select appearance="primary" id="roleId" initialData={rolesData} selectAction={this._setRoleId} defaultValue={UserListStore.getUserInfo().roleId.toString()} />
				</li>
				<li>
					<ControlMenu initialData={rightsData} export={this._exportRights}/>
				</li>
				<li className="hy-multiline-form-footer clearfix">
					<button className="hy-button secondary pull-left" onClick={this._cancel}>取消</button>
		          	<button className="hy-button pull-right" onClick={this._confirm}>确认</button>
		        </li>
			</ul>

		</div>

	},

	_onChange: function(){
		//更新视图
		this.setState({
			userRights: UserListStore.getUserRights(this.state.userId)
		});
	},

	_exportRights: function(rights){
		this.state.rights=rights;
	},

	_setRoleId: function(e){
		this.state[e.target.id]=e.target.value;
	},

	_cancel: function(){
		this.context.router.push("/userList");
	},

	_confirm: function(){
		UserListActions.modifyUserRights(this.state.userId,this.state.rights,this.state.roleId,);
		this.context.router.push("/userList");
	}

});

export default ModifyRights;
