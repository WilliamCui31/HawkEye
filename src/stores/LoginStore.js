var AppDispatcher=require('../dispatcher/AppDispatcher');
var EventEmitter=require('events').EventEmitter;
var LoginConstants=require('../constants/LoginConstants');
var assign=require('object-assign');
var ajax=require('../ajax');

var CHANGE_EVENT='change';

var loginData={
	userName: '',
	password: '',
	checkCode: '',
	verfiyCode: getVerfiyCode(),
	errorMsg: ''
}

function getVerfiyCode(){
	var str;
	ajax({
		url:'/eye/code/getCode.json',
		async: false,
		success: function(data) {
			str=data.data;
		}
	});
	return str;
}

function submit(postData){
	ajax({
		url: '/eye/user/v1/userLogin.json',
		data: postData,
		success: function(data) {
			console.log(data);
			if(data.code==="0000") {
				location.href='/welcome';
			}
		}
	});
}

var LoginStore=assign({},EventEmitter.prototype,{

	getData: function(){
		return loginData;
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

		case LoginConstants.SET_USER_NAME:
			loginData.userName=action.value;
			LoginStore.emitChange();
			break;

		case LoginConstants.SET_PASSWORD:
			loginData.password=action.value;
			LoginStore.emitChange();
			break;

		case LoginConstants.SET_CHECK_CODE:
			loginData.checkCode=action.value;
			LoginStore.emitChange();
			break;

		case LoginConstants.SUBMIT:
			if(!loginData.userName) {
				loginData.errorMsg="请输入用户名！";
			}else if (!loginData.password) {
				loginData.errorMsg="请输入密码！";
			}else if (!loginData.checkCode) {
				loginData.errorMsg="请输入验证码！";
			}else{
				var postData={
					"accountName": loginData.userName,
					"password": loginData.password,
					"valideNum": loginData.checkCode
				}
				submit(postData);
			}
			LoginStore.emitChange();
			break;

		default:

	}
});

module.exports=LoginStore;