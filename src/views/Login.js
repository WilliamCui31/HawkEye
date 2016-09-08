import React from 'react';
import Input from '../components/Input';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

import '../../assets/styles/normalize.css';
import '../../assets/styles/login.css';

var Login = React.createClass({

	getInitialState: function(){
		return {
			loginData: LoginStore.getData()
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
					      <li><label>用户名</label>：<Input appearance="primary" id="accountName" updateAction={LoginActions.updateAccount} /></li>
					      <li><label>密码</label>：<Input appearance="primary" id="password" updateAction={LoginActions.updateAccount} /></li>
					      <li><label>验证码</label>：<Input appearance="small" id="valideNum" updateAction={LoginActions.updateAccount} />
					      <span className="verify-code" onClick={this._refreshCode}>{loginData.verfiyCode}</span></li>
					      <li className="login-error-message"><label>&nbsp;</label> {loginData.errorMsg}</li>
					      <li className="clearfix"><input type="submit" className="hy-button primary" value="登 录" onClick={this._submit} /></li>
					    </ul>
					</div>
				</div>
			</div>
		);
	},

	_refreshCode: function(){
		LoginActions.getVerfiyCode()
	},

	_submit: function(){
		LoginActions.submit();
	},

	_onChange: function(){
		this.setState({
			loginData: LoginStore.getData()
		});
	}
});

module.exports = Login;