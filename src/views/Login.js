var React = require('react');
var LoginStore = require('../stores/LoginStore');
var LoginActions = require('../actions/LoginActions');

require('../../assets/styles/normalize.css');
require('../../assets/styles/login.css');

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
					      <li><label>用户名</label>：<input type="text" className="hy-input primary" onBlur={this._setUserName} /></li>
					      <li><label>密码</label>：<input type="password" className="hy-input primary" onBlur={this._setPassword} /></li>
					      <li><label>验证码</label>：<input type="text" className="hy-input small" onBlur={this._setCheckCode} />
					      <span className="verify-code" onClick={this._refreshCode}>{loginData.verfiyCode}</span></li>
					      <li className="login-error-message">{loginData.errorMsg}</li>
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

	_setUserName: function(e){
		LoginActions.setUserName(e.target.value);
	},

	_setPassword: function(e){
		LoginActions.setPassword(e.target.value);
	},

	_setCheckCode: function(e){
		LoginActions.setCheckCode(e.target.value);
	},

	_submit: function(){
		LoginActions.submit();
	},

	_onChange: function(){
		this.setState({
			loginData: LoginStore.getData()
		});
	},
});

module.exports = Login;