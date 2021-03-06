import React from 'react';
import Feild from '../../components/Feild';
import Select from '../../components/Select';
import Alert from '../../components/Alert';
import ControlMenu from '../../components/ControlMenu';
import MainStore from '../../stores/MainStore';
import UserAddStore from '../../stores/UserAddStore';
import UserAddActions from '../../actions/UserAddActions';
import UserRoleStore from '../../stores/UserRoleStore';

const UserAdd = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function(){
		return {
			departments: MainStore.getDepartments(),
			roles: MainStore.getRoles(),
			initialRights: UserAddStore.getRights(),
			updateRights: UserAddStore.getRights()
		}
	},

	componentDidMount: function(){
		UserAddStore.addEventListener("change",this._onChange);
	},

	componentWillUnmount: function(){
		UserAddStore.removeEventListener("change",this._onChange);
	},

	render: function(){
		var deptFeedback,roleFeedback;
		if(this.state.focusDept){
			deptFeedback=<span className="hy-feild-status warn">请选择部门</span>;
		}
		if(this.state.focusRole){
			roleFeedback=<span className="hy-feild-status warn">请选择角色</span>;
		}
		return <div className="hy-section pdg20">
    	<ul className="hy-multiline-form clearfix">
        <Feild
					id="name"
					label="用户名"
					inputAction={this._inputUser}
					pattern={/^([a-zA-Z0-9]{4,20})$/}
					wrong="用户名必须是字母、数字格式，长度在4-20个字符以内"
					validation={UserAddStore.validateUser}
					validateFailure="用户名已存在，请重新输入"
					store={UserAddStore}
				/>
				<Feild
					id="realName"
					label="真实姓名"
					inputAction={this._inputUser}
					pattern={/^[\u4e00-\u9fa5]{2,10}$/}
					wrong="姓名必须是汉字，长度在2-10个汉字以内"
					store={UserAddStore}
				/>
        <li>
          <label>所在部门：</label>
          <Select
						appearance="primary"
						id="deptId"
						initialData={this.state.departments}
						selectAction={this._selectDept}
						placeholder="选择部门"
						store={UserAddStore}
					/>
					{deptFeedback}
        </li>
				<Feild
					id="pwd"
					type="password"
					label="密码"
					inputAction={this._inputUser}
					pattern={/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,20})$/}
					wrong="密码必须是字母+数字，长度在4-20个字符以内"
					store={UserAddStore}
				/>
        <li>
        	<label>分配角色：</label>
        	<Select
						appearance="primary"
						id="roleId"
						initialData={this.state.roles}
						selectAction={this._selectRole}
						placeholder="选择角色"
						store={UserAddStore}
					/>
					{roleFeedback}
        </li>
      </ul>

			<ControlMenu
				initialData={this.state.initialRights}
				updateAction={this._updateRights}
				export={this._exportRights}
				store={UserAddStore}
			/>

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
						close={this._completeAddUser}
					/>;
			this.setState({
				popup: popup,
				user: null
			});
		}
	},

	_inputUser: function(id,value){
		var user=this.state.user||{};
		user[id]=value;
		this.setState({user: user});
	},

	_selectDept: function(id,value){
		var user=this.state.user||{};
		user[id]=value;
		this.state.user=user;
		this.state.focusDept=false;
	},

	_selectRole: function(id,value){
		this.state[id]=value;
		this.state.focusRole=false;
		UserAddStore.emitEvent("update");
	},

	_updateRights: function(){
		return UserRoleStore.getRoleRights(this.state.roleId);
	},

	_addUser: function(){
		if(!this.state.user||!this.state.user.name){
			this._focusById("name");
		}else if(!this.state.user.realName){
			this._focusById("realName");
		}else if(!this.state.user.deptId){
			this.setState({focusDept: true});
			this._focusById("deptId");
		}else if(!this.state.user.pwd){
			this._focusById("pwd");
		}else if(!this.state.roleId){
			this.setState({focusRole: true});
			this._focusById("roleId");
		}else{
			UserAddActions.addUser(this.state.user,this.state.rights,this.state.roleId);
		}
	},

	//根据ID获得焦点
  _focusById(id){
		document.getElementById(id).focus();
		document.getElementById(id).blur();
		document.getElementById(id).focus();
	},

	_exportRights: function(rights){
		this.state.rights=rights;
	},

	_closePopup: function(){
		this.setState({popup: null});
	},

	_completeAddUser: function(){


		//恢复状态和清空数据
		delete this.state.user;
		delete this.state.roleId;
		//触发reset事件，更新表单状态
		UserAddStore.emitEvent("reset");

		//关闭弹窗提示
		this.setState({popup: null});
	}

});

export default UserAdd;
