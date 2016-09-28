import React from 'react';
import ajax from '../../ajax';
import Feild from '../../components/Feild';
import Alert from '../../components/Alert';
import GlobalActions from '../../actions/GlobalActions';
import GlobalStore from '../../stores/GlobalStore';

const ResetPassword = React.createClass({

	getInitialState: function(){
		return {
			accountName: GlobalStore.getUserInfo().name
		}
	},

	componentDidMount: function(){
		GlobalStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		GlobalStore.removeChangeListener(this._onChange);
	},

	render: function(){
		return <div className="hy-section pdg20">
			<ul className="hy-multiline-form clearfix">
				<li><label>当前用户：</label>{this.state.accountName}</li>
				<Feild
					type="password"
					id="cpwd"
					label="当前密码"
					inputAction={this._inputData}
					pattern={/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,20})$/}
					wrong="密码必须是字母+数字，长度在4-20个字符以内"
				/>
				<Feild
					type="password"
					id="newPwd"
					label="新密码"
					inputAction={this._inputData}
					pattern={/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,20})$/}
					wrong="密码必须是字母+数字，长度在4-20个字符以内"
				/>
				<Feild
					type="password"
					id="rePwd"
					label="确认密码"
					inputAction={this._inputData}
					pattern={/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,20})$/}
					wrong="密码必须是字母+数字，长度在4-20个字符以内"
					validation={this._confirmPassword}
					validateFailure="新密码两次输入不一致，请重试"
				/>
				<li className="hy-multiline-form-footer">
					<label>&nbsp;</label>
					<button className="hy-button" onClick={this._resetPassword}>确认</button>
				</li>
			</ul>
			{this.state.popup}
		</div>
	},

	_onChange: function(){
		var rePasswordBack=GlobalStore.resetPasswordfeedback();
		var message,status,resetPasswordPopup;
		if(rePasswordBack.status){
			message=<span>密码重置成功!</span>;
			status="success";
		}else{
			message=<span>{rePasswordBack.msg}!</span>;
			status="failure";
		}
		resetPasswordPopup=<Alert
			title="重置密码"
			message={message}
			status={status}
			close={this._closePopup}
		/>;

		//更新视图
		this.setState({popup: resetPasswordPopup});
	},

	_inputData: function(id,value) {
		this.state[id]=value;
	},

	_confirmPassword: function(e){
		if(this.state.newPwd!==e.target.value) return false;
		return true;
	},

	_resetPassword: function(){
		var message,resetPasswordPopup;
		if(!this.state.cpwd){
			this._focusById("cpwd");
		}else if(!this.state.newPwd){
			this._focusById("newPwd");
		}else if(!this.state.rePwd){
			this._focusById("rePwd");
		}else{
			GlobalActions.resetPassword(this.state.cpwd,this.state.newPwd);
		}
	},

	_focusById: function(id){
		document.getElementById(id).focus();
		document.getElementById(id).blur();
		document.getElementById(id).focus();
	},

	_closePopup: function(){
		this.setState({popup: null});
	}

});

export default ResetPassword;
