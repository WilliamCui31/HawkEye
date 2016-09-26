import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import UserListActions from '../../actions/UserListActions';
import GlobalStore from '../../stores/GlobalStore';
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
			departments: GlobalStore.getDepartments(),
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

			<ul className="hy-multiline-form" style={{width: "285px"}}>
				<li><label>用户名：</label>{userInfo.name}</li>
				<li><label>真实姓名：</label><Input appearance="primary" id="realName" inputAction={this._setUserInfo} defaultValue={userInfo.realName} /></li>
				<li><label>所在部门：</label><Select appearance="primary" id="deptId" initialData={departments} selectAction={this._setUserInfo} defaultValue={userInfo.deptId.toString()} /></li>
				<li><label>修改密码：</label><Input type="password" appearance="primary" id="pwd" inputAction={this._setUserInfo} /></li>
				<li><label>确认密码：</label><Input type="password" appearance="primary" id="repwd" inputAction={this._rePassword} /></li>
				<li className="hy-multiline-form-footer clearfix">
					<button className="hy-button secondary pull-left" onClick={this._cancel}>取消</button>
		          	<button className="hy-button default pull-right" onClick={this._confirm}>确认</button>
		        </li>
			</ul>

		</div>
	},

	_onChange: function(){
		//更新视图
		this.setState({
			userInfo: UserListStore.getUserInfo()
		});
	},

	_setUserInfo: function(e){
		if(!this.state.user) this.state.user={};
		this.state.user[e.target.id]=e.target.value;
	},

	_cancel: function(){
		this.context.router.push("/userList");
	},

	_confirm: function(){
		UserListActions.modifyUserInfo(this.state.userId,this.state.user);
		this.context.router.push("/userList");
	},

	_rePassword: function(id,value){
		if(value!==this.state.user.pwd) console.log("两次输入的密码不一致!");
	}
});

export default ModifyInfo;
