import React from 'react';
import ajax from '../../ajax';
import utils from '../../utils';
import LoginStore from '../../stores/LoginStore';

//加载登录信息
function loadLoginInfo(){
	var LoginInfo;
	ajax({
		url: '/eye/user/v1/lastLoginRecordInfo.json',
		data: {validateKey: utils.getCookie("validateKey")},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				LoginInfo=data.data;
			}
		}
	});
	return LoginInfo;
}

export default class Welcome extends React.Component{

	render() {

		var LoginInfo=loadLoginInfo(),infoDom;

		if(LoginInfo) {
			infoDom=(
				<ul className="login-info">
					<li className="login-info-tit">欢迎回来!</li>
					<li>
						<label>上次登录时间：</label><span>{LoginInfo.loginTime}</span>
					</li>
					<li>
						<label>上次登录地点：</label><span>{LoginInfo.loginArea}</span>
					</li>
					<li>
						<label>上次登录IP：</label><span>{LoginInfo.loginIp}</span>
					</li>
				</ul>
			);
		}else {
			infoDom=(
				<ul className="login-info">
					<li className="login-info-tit">欢迎使用鹰眼系统!</li>
				</ul>
			);
		}
		
		return <div className="hy-section">
			{infoDom}
		</div>
	}

};