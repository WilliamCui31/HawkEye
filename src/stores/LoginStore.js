import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import LoginConstants from '../constants/LoginConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';
import { hashHistory } from 'react-router';

const CHANGE_EVENT='change';

var _loginData={
	verfiyCode: getVerfiyCode(),
	errorMsg: '',
	account: {}
}

//获取验证码
function getVerfiyCode(){
	var verfiyCode;
	ajax({
		url:'/eye/code/getCode.json',
		async: false,
		success: function(data) {
			verfiyCode=data.data;
		}
	});
	return verfiyCode;
}

//登录请求
function submit(account){
	console.log(account);
	ajax({
		url: '/eye/user/v1/userLogin.json',
		data: account,
		success: function(data) {
			if(data.code==="0000") {
				//登录成功

				utils.setCookie("validateKey",data.data.userId);
				console.log(data);
				//跳转系统欢迎页面
				hashHistory.push("/welcome");
			}else {
				_loginData.errorMsg=data.description;
				LoginStore.emitChange();
			}
		}
	});
}

//保存更新账户
function updateAccount(id,value){
	_loginData.account[id]=value;
}

const LoginStore=assign({},EventEmitter.prototype,{

	getData: function(){
		return _loginData;
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

			_loginData.verfiyCode=getVerfiyCode();

			LoginStore.emitChange();
			break;

		case LoginConstants.UPDATE_ACCOUNT:
			updateAccount(action.id,action.value);
			LoginStore.emitChange();
			break;

		case LoginConstants.SUBMIT:
			var account=_loginData.account;
			if(!account.accountName) {
				_loginData.errorMsg="请输入用户名！";
			}else if (!account.password) {
				_loginData.errorMsg="请输入密码！";
			}else if (!account.valideNum) {
				_loginData.errorMsg="请输入验证码！";
			}else{
				//console.log(account);
				var validateKey=submit(account);
				utils.setCookie("validateKey",validateKey);
			}
			LoginStore.emitChange();
			break;

		default:

	}
});

export default LoginStore;