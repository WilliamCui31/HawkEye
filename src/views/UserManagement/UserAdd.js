import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Alert from '../../components/Alert';
import ControlMenu from '../../components/ControlMenu';
import GlobalStore from '../../stores/GlobalStore';
import UserAddStore from '../../stores/UserAddStore';
import UserAddActions from '../../actions/UserAddActions';

const UserAdd = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function(){
		return {
			departments: GlobalStore.getDepartments(),
			roles: GlobalStore.getRoles(),
			initialRights: UserAddStore.getRights()
		}
	},

	componentDidMount: function(){
		UserAddStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserAddStore.removeChangeListener(this._onChange);
	},

	render: function(){

		return <div className="hy-section pdg20">
	    	<ul className="hy-multiline-form clearfix">
          <li><label>用户名：</label><Input appearance="primary" id="name" inputAction={this._inputUser} /></li>
          <li><label>姓名：</label><Input appearance="primary" id="realName" inputAction={this._inputUser} /></li>
          <li>
            <label>所在部门：</label>
            <Select appearance="primary" id="deptId" initialData={this.state.departments} selectAction={this._inputUser} placeholder="选择部门" />
          </li>
          <li><label>密码：</label><Input type="password" appearance="primary" id="pwd" inputAction={this._inputUser} /></li>
          <li>
          	<label>分配角色：</label>
          	<Select appearance="primary" id="roleId" initialData={this.state.roles} selectAction={this._inputRoleId} placeholder="选择角色" />
          </li>
        </ul>

				<ControlMenu initialData={this.state.initialRights} export={this._exportRights}/>

				<button className="hy-button" onClick={this._addUser}>确认</button>

				{this.state.popup}
	  </div>
	},

	_onChange: function(){
		if(UserAddStore.getData().feedback){
			var feedback=UserAddStore.getData().feedback,
					popup=<Alert
						title="用户新增"
						status={feedback.flag?"success":"failure"}
						message={feedback.msg}
						close={this._closePopup}
					/>;
			this.setState({
				popup: popup,
				user: null
			});
		}
	},

	_inputUser: function(e){
		var user=this.state.user||{};
		user[e.target.id]=e.target.value;
		this.setState({user: user});
	},

	_inputRoleId: function(e){
		this.state[e.target.id]=e.target.value;
	},

	_addUser: function(){
		UserAddActions.addUser(this.state.user,this.state.rights,this.state.roleId);
	},

	_exportRights: function(rights){
		this.state.rights=rights;
	},

	_closePopup: function(){
		this.setState({popup: null});
		location.reload();
	}

});

export default UserAdd;
