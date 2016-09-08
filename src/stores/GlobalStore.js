import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalConstants from '../constants/GlobalConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

console.log(utils.getCookie("validateKey"));

const CHANGE_EVENT='change';

var _globalData={
	columnsData: loadColumn(),
	userInfo: loadUserInfo()
}

var pid;

//加载系统栏目
function loadColumn(){
	var columnsData;
	ajax({
		url: '/eye/user/v1/getUserMenues.json',
		data: {validateKey: utils.getCookie("validateKey")},
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
function loadUserInfo(){
	var userInfo;
	ajax({
		url: '/eye/user/v1/getLoginUserInfo.json',
		data: {validateKey: utils.getCookie("validateKey")},
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
function loadMenu(pid){
	var menusData;
	ajax({
		url: '/eye/user/v1/getUserRights.json',
		data: {validateKey: utils.getCookie("validateKey"),pid: pid},
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				menusData=data.data;
			}
		}
	});
	return menusData;
}

const GlobalStore=assign({},EventEmitter.prototype,{

	getColumnsData: function(){
		return _globalData.columnsData;
	},

	getUserInfo: function(){
		return _globalData.userInfo;
	},

	getMenusData: function(){
		return loadMenu(pid);
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
		case GlobalConstants.SWITCH_COLUMN:
			pid=action.pid;
			GlobalStore.emitChange();
			break;

		default:

	}
});

export default GlobalStore;