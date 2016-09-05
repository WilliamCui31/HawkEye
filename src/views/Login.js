var React = require('react');
var LoginStore = require('../stores/LoginStore');
var LoginActions = require('../actions/LoginActions');

//import ajax from '../ajax';

require('../../assets/styles/normalize.css');
require('../../assets/styles/login.css');

var Login = React.createClass({

	getInitialState: function(){
		return {
			verfiyCode: LoginStore.getVerfiyCode()
		}
	},

	componentDidMount: function(){
		LoginStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		LoginStore.removeChangeListener(this._onChange);
	},

	login: function(){
		console.log(this.state.verfiyCode);
		/*ajax({
			url:'/eye/right/v1/getAllRighs.json',
			success: function(data) {
				console.log(data);
			}
		});*/
	},

	render: function() {
		console.log(LoginStore.getVerfiyCode());
		return (
			<div className="login-container">
				<div className="login-box">
					<div className="login-box-bg"></div>
					<div className="login-box-cont">
						<h1 className="login-tit">欢迎登录鹰眼系统</h1>
					    <ul className="login-form">
					      <li><label>用户名</label>：<input type="text" className="hy-input" /></li>
					      <li><label>密码</label>：<input type="password" className="hy-input" /></li>
					      <li><label>验证码</label>：<input type="text" className="hy-input" style={{width: "130px"}} />
					      <span className="verify-code" onClick={this._refreshCode}>{this.state.verfiyCode}</span></li>
					      <li className="clearfix"><input type="submit" className="hy-button" value="登 录" onClick={this.login} /></li>
					    </ul>
					</div>
				</div>
			</div>
		);
	},

	_refreshCode: function(){
		this.setState({
			verfiyCode: LoginActions.getVerfiyCode()
		});
	}
});

module.exports = Login;