import React from 'react';
import Feild from '../../components/Feild';
import Select from '../../components/Select';
import Alert from '../../components/Alert';
import UserListActions from '../../actions/UserListActions';
import MainStore from '../../stores/MainStore';
import UserListStore from '../../stores/UserListStore';
import assign from 'object-assign';

const ModifyInfo = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function(){
		var userId=this.props.location.query.userId;
		return {
			userId: userId,
			userInfo: UserListStore.getUserInfo(userId),
			departments: MainStore.getDepartments(),
		}
	},

	componentDidMount: function(){
		UserListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserListStore.removeChangeListener(this._onChange);
	},

	render: function() {
		//部门列表
		var departments=this.state.departments;

		var userInfo=this.state.userInfo;

		return <div className="hy-section pdg20">

			<ul className="hy-multiline-form">
				<li><label>用户名：</label>{userInfo.name}</li>
				<Feild
					id="realName"
					label="真实姓名"
					defaultValue={userInfo.realName}
					inputAction={this._setUserInfo}
					pattern={/^[\u4e00-\u9fa5]{2,10}$/}
					wrong="姓名必须是汉字，长度在2-10个汉字以内"
				/>
				<li>
					<label>所在部门：</label>
					<Select
						appearance="primary"
						id="deptId"
						initialData={departments}
						selectAction={this._setUserInfo}
						defaultValue={userInfo.deptName}
					/>
				</li>
				<Feild
					id="pwd"
					type="password"
					label="修改密码"
					inputAction={this._setUserInfo}
					pattern={/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,20})$/}
					wrong="密码必须是字母+数字，长度在4-20个字符以内"
				/>
				<Feild
					id="repwd"
					type="password"
					label="确认密码"
					inputAction={this._setUserInfo}
					pattern={/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,20})$/}
					wrong="密码必须是字母+数字，长度在4-20个字符以内"
					validation={this._confirmPassword}
					validateFailure="新密码两次输入不一致，请重试"
				/>
				<li className="hy-multiline-form-footer clearfix">
					<button className="hy-button secondary pull-left" onClick={this._cancel}>取消</button>
		      <button className="hy-button default pull-right" onClick={this._confirm}>确认</button>
		    </li>
			</ul>
			{this.state.popup}
		</div>
	},

	_onChange: function(){
		//更新视图
		this.setState({
			userInfo: UserListStore.getUserInfo()
		});
	},

	_setUserInfo: function(id,value){
		if(!this.state.user) this.state.user={};
		this.state.user[id]=value;
	},

	_cancel: function(){
		this.context.router.push("/userList");
	},

	_confirm: function(){
		if(!this.state.user||!this.state.user.realName){
			this._focusById("realName");
		}else if(!this.state.user.pwd){
			this._focusById("pwd");
		}else if(!this.state.user.repwd){
			this._focusById("repwd");
		}else{
			UserListActions.modifyUserInfo(this.state.userId,this.state.user);
			this.context.router.push("/userList");
		}
	},

	//根据ID获得焦点
  _focusById(id){
		document.getElementById(id).focus();
		document.getElementById(id).blur();
		document.getElementById(id).focus();
	},

	_confirmPassword: function(e){
		if(this.state.user&&this.state.user.pwd!==e.target.value) return false;
		return true;
	}

});

export default ModifyInfo;
