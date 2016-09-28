import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import LoginConstants from '../constants/LoginConstants';
import assign from 'object-assign';
import ajax from '../common/ajax';
import { hashHistory } from 'react-router';

const CHANGE_EVENT='change';

var _loginData={};

//获取验证码
function getVerfiyCode(){
	ajax({
		url:'/eye/code/getCode.json',
		success: function(data) {
			_loginData.verfiyCode=data.data;
			LoginStore.emitChange();
		}
	});
}

//登录请求
function login(account){
	ajax({
		url: '/eye/user/v1/userLogin.json',
		data: account,
		success: function(data) {
			if(data.code==="0000") {
				//登录成功
				sessionStorage.setItem("validateKey",data.data.userId);
				//跳转系统欢迎页面
				hashHistory.push("/welcome");
			}else {
				_loginData.errorMsg=data.description;
				LoginStore.emitChange();
			}
			console.log(data);
		}
	});
}

const LoginStore=assign({},EventEmitter.prototype,{

	getErrorMsg: function(){
		return _loginData.errorMsg;
	},

	getVerfiyCode: function(){
		return _loginData.verfiyCode;
	},

	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}

});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case LoginConstants.GET_VERFIY_CODE:
			getVerfiyCode();
			break;

		case LoginConstants.LOGIN:

			login(action.account);
			break;

		default:

	}
});

export default LoginStore;
