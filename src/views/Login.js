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
					      <li><label>用户名</label>：<Input appearance="primary" id="accountName" inputAction={LoginActions.inputAccount} /></li>
					      <li><label>密码</label>：<Input type="password" appearance="primary" id="password" inputAction={LoginActions.inputAccount} /></li>
					      <li><label>验证码</label>：<Input appearance="small" id="valideNum" inputAction={LoginActions.inputAccount} />
					      <span className="verify-code" onClick={this._refreshCode}>{this.state.verfiyCode}</span></li>
					      <li className="login-error-message"><label>&nbsp;</label> {this.state.errorMsg}</li>
					      <li className="clearfix"><input type="submit" className="hy-button primary" value="登 录" onClick={this._submit} /></li>
					    </ul>
					</div>
				</div>
			</div>
		);
	},

	_refreshCode: function(){
		LoginActions.getVerfiyCode();
	},

	_submit: function(){
		LoginActions.submit();
	},

	_onChange: function(){
		this.setState({
			verfiyCode: LoginStore.getVerfiyCode(),
			errorMsg: LoginStore.getErrorMsg()
		});
	}
});

module.exports = Login;
