import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import LoginConstants from '../constants/LoginConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

var _loginData={
	verfiyCode: getVerfiyCode(),
	errorMsg: '',
	account: {}
}

//获取验证码
function getVerfiyCode(){
	var str;
	ajax({
		url:'/eye/code/getCode.json',
		async: false,
		success: function(data) {
			//console.log("code",data.data);
			str=data.data;
		}
	});
	return str;
}

//登录请求
function submit(account){
	ajax({
		url: '/eye/user/v1/userLogin.json',
		data: account,
		async: false,
		success: function(data) {
			console.log(data);
			if(data.code==="0000") {
				//登录成功

				//设置登录验证秘钥
				utils.setCookie("validateKey",data.data.userId);

				//跳转系统欢迎页面
				location.assign('/#/welcome');
			}else {
				_loginData.errorMsg=data.description;
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
			loginData.verfiyCode=getVerfiyCode();
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
				console.log(account);
				submit(account);
			}
			LoginStore.emitChange();
			break;

		default:

	}
});

export default LoginStore;