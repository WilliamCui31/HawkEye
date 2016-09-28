import React from 'react';
import Input from '../components/Input';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

import 'styles/normalize.css';
import 'styles/login.css';

var Login = React.createClass({

	getInitialState: function(){
		LoginActions.getVerfiyCode();
		return {
			verfiyCode: LoginStore.getVerfiyCode(),
			errorMsg: LoginStore.getErrorMsg()
		}
	},

	componentDidMount: function(){
		LoginStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		LoginStore.removeChangeListener(this._onChange);
	},

	render: function(){
		var loginData=this.state.loginData;
		return (
			<div className="login-container">
				<div className="login-box">
					<div className="login-box-bg"></div>
					<div className="login-box-cont">
						<h1 className="login-tit">欢迎登录鹰眼系统</h1>
					    <ul className="login-form">
					      <li><label>用户名</label>：<Input appearance="primary" id="accountName" inputAction={this._inputAccount} onKeyUp={this._onKeyUp} focus={true} /></li>
					      <li><label>密码</label>：<Input type="password" appearance="primary" id="password" inputAction={this._inputAccount} onKeyUp={this._onKeyUp} /></li>
					      <li><label>验证码</label>：<Input appearance="small" id="valideNum" inputAction={this._inputAccount} onKeyUp={this._onKeyUp} />
					      <span className="verify-code" onClick={this._refreshCode}>{this.state.verfiyCode}</span></li>
					      <li className="login-error-message"><label>&nbsp;</label> {this.state.errorMsg}</li>
					      <li className="clearfix"><input type="submit" id="loginBtn" className="hy-button primary" value="登 录" onClick={this._login} /></li>
					    </ul>
					</div>
				</div>
			</div>
		);
	},

	_refreshCode: function(){
		LoginActions.getVerfiyCode();
	},

	_inputAccount: function(e){
		var account=this.state.account||{};
		account[e.target.id]=e.target.value;
		this.setState({account: account});
	},

	_onKeyUp: function(e){
		if(e.keyCode===13){
			//当用户按下回车
			document.getElementById(e.target.id).blur();
			document.getElementById("loginBtn").click();
		}
	},

	_login: function(){
		var account=this.state.account;
		if(!account||!account.accountName) {
			this.setState({errorMsg: "请输入用户名！"});
			document.getElementById("accountName").focus();
		}else if(!account.password) {
			this.setState({errorMsg: "请输入密码！"});
			document.getElementById("password").focus();
		}else if(!account.valideNum) {
			this.setState({errorMsg: "请输入验证码！"});
			document.getElementById("valideNum").focus();
		}else if(account.valideNum.toLowerCase()!==this.state.verfiyCode.toLowerCase()){
			this.setState({errorMsg: "验证码错误，请重新输入！"});
			document.getElementById("valideNum").focus();
		}else{
			LoginActions.login(this.state.account);
		}
	},

	_onChange: function(){
		this.setState({
			verfiyCode: LoginStore.getVerfiyCode(),
			errorMsg: LoginStore.getErrorMsg()
		});
	}
});

module.exports = Login;
