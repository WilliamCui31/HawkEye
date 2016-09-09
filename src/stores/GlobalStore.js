import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalConstants from '../constants/GlobalConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

//从cookie取出validateKey
var validateKey=utils.getCookie("validateKey");

//如果没有validateKey就跳转到登录页面
if(!validateKey) location.assign("/#/");

//声明栏目ID
var pid;

var _globalData={
	columnsData: loadColumn(validateKey),
	userInfo: loadUserInfo(validateKey),
	menusData: loadMenu(validateKey,pid)
}

//加载系统栏目
function loadColumn(validateKey){
	var columnsData;
	ajax({
		url: '/eye/user/v1/getUserMenues.json',
		data: {validateKey: validateKey},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				columnsData=data.data;
				pid=columnsData[0].id;
			}
		}
	});
	return columnsData;
}

//加载用户信息
function loadUserInfo(validateKey){
	var userInfo;
	ajax({
		url: '/eye/user/v1/getLoginUserInfo.json',
		data: {validateKey:validateKey},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				userInfo=data.data;
			}
		}
	});
	return userInfo;
}

//加载菜单
function loadMenu(validateKey,pid){
	var menusData;
	ajax({
		url: '/eye/user/v1/getUserRights.json',
		data: {validateKey: validateKey,pid: pid},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				menusData=data.data;
			}
		}
	});
	return menusData;
}

//退出登录
function logout(){
	ajax({
		url: '/eye/user/v1/logout.json',
		data: {validateKey: utils.getCookie("validateKey")},
		success: function(data) {
			if(data.code==="0000") {
				//从cookie删除validateKey
				utils.delCookie("validateKey");

				//跳转到登录页
				location.assign("/#/");
			}
		}
	});
}

const GlobalStore=assign({},EventEmitter.prototype,{

	getColumnsData: function(){
		return _globalData.columnsData;
	},

	getUserInfo: function(){
		return _globalData.userInfo;
	},

	getMenusData: function(){
		return _globalData.menusData;
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
		case GlobalConstants.SET_VALIDATE_KEY:
			_globalData.columnsData=loadColumn(action.key);
			_globalData.userInfo=loadUserInfo(action.key);
			_globalData.menusData=loadMenu(action.key,pid);

			//把validateKey放入Cookie
			utils.setCookie("validateKey",action.key);

			GlobalStore.emitChange();
			break;

		case GlobalConstants.SWITCH_COLUMN:

			pid=action.pid;
			_globalData.menusData=loadMenu(validateKey,pid);

			GlobalStore.emitChange();
			break;

		case GlobalConstants.LOGOUT:
			logout();

			GlobalStore.emitChange();
			break;

		default:

	}
});

export default GlobalStore;