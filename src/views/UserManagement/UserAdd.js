import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import ControlMenu from '../../components/ControlMenu';
import GlobalStore from '../../stores/GlobalStore';
import UserAddStore from '../../stores/UserAddStore';
import UserAddActions from '../../actions/UserAddActions';

const UserAdd = React.createClass({

	getInitialState: function(){
		UserAddActions.getRights();
		return {
			userAddData: UserAddStore.getData()
		}
	},

	componentDidMount: function(){
		UserAddStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserAddStore.removeChangeListener(this._onChange);
	},

	render: function(){
		//部门列表
		var departmentsData=GlobalStore.getDepartments();
		//角色列表
		var rolesData=GlobalStore.getRoles();
		//权限树列表
		var rightsData=this.state.userAddData.rights;

		return <div className="hy-section pdg20">

	    	<ul className="hy-multiline-form clearfix">
          <li><label>用户名：</label><Input appearance="primary" id="name" inputAction={this._inputUser} /></li>
          <li><label>姓名：</label><Input appearance="primary" id="realName" inputAction={this._inputUser} /></li>
          <li>
            <label>所在部门：</label>
            <Select appearance="primary" id="deptId" initialData={departmentsData} selectAction={this._inputUser} placeholder="选择部门" />
          </li>
          <li><label>密码：</label><Input type="password" appearance="primary" id="pwd" inputAction={this._inputUser} /></li>
          <li>
          	<label>分配角色：</label>
          	<Select appearance="primary" id="roleId" initialData={rolesData} selectAction={this._inputRoleId} placeholder="选择角色" />
          </li>
        </ul>

				<ControlMenu initialData={rightsData} export={this._exportRights}/>

				<button className="hy-button" onClick={this._addUser}>确认</button>

	  </div>
	},

	_onChange: function(){
		this.setState({
			userAddData: UserAddStore.getData()
		});
	},

	_inputUser: function(e){
		if(!this.state.user) this.state.user={};
		this.state.user[e.target.id]=e.target.value;
	},

	_inputRoleId: function(e){
		this.state[e.target.id]=e.target.value;
	},

	_addUser: function(){
		UserAddActions.addUser(this.state.user,this.state.rights,this.state.roleId);
	},

	_exportRights: function(rights){
		this.state.rights=rights;
	}
});

export default UserAdd;
