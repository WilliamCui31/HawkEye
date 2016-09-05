import React from 'react';

//import ajax from '../ajax';

import '../../assets/styles/normalize.css';
import '../../assets/styles/login.css';

export default class Login extends React.Component{
	constructor(props) {
		super(props);
	}

	login() {
		/*ajax({
			url:'/eye/code/getCode.json',
			success: function(data) {
				console.log(data);
			}
		});*/
	}

	render() {
		return <div className="login-container">
			<div className="login-box">
				<div className="login-box-bg"></div>
				<div className="login-box-cont">
					<h1 className="login-tit">欢迎登录鹰眼系统</h1>
				    <ul className="login-form">
				      <li><label>用户名</label>：<input type="text" className="hy-input" /></li>
				      <li><label>密码</label>：<input type="password" className="hy-input" /></li>
				      <li><label>验证码</label>：<input type="text" className="hy-input" style={{width: "130px"}} /><span className="verify-code">NsYd</span></li>
				      <li className="clearfix"><input type="submit" className="hy-button" value="登 录" onClick={this.login} /></li>
				    </ul>
				</div>
			</div>
		</div>
	}
}