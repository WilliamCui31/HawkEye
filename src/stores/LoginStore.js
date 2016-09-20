import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import LoginConstants from '../constants/LoginConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';
import { hashHistory } from 'react-router';

const CHANGE_EVENT='change';

var _loginData={account:{}};

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
function submit(account){
	ajax({
		url: '/eye/user/v1/userLogin.json',
		data: account,
		success: function(data) {
			if(data.code==="0000") {
				//登录成功
				utils.setCookie("validateKey",data.data.userId);
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

		case LoginConstants.INPUT_ACCOUNT:
			_loginData["account"][action.id]=action.value;
			LoginStore.emitChange();
			break;

		case LoginConstants.SUBMIT:
			var account=_loginData.account;
			console.log(!account.accountName);
			if(!account.accountName) {
				_loginData.errorMsg="请输入用户名！";
			}else if (!account.password) {
				_loginData.errorMsg="请输入密码！";
			}else if (!account.valideNum) {
				_loginData.errorMsg="请输入验证码！";
			}else{
				//console.log(account);
				var validateKey=submit(account);
			}

			LoginStore.emitChange();
			break;

		default:

	}
});

export default LoginStore;
