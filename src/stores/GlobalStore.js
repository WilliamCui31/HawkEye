import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalConstants from '../constants/GlobalConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';
import { hashHistory } from 'react-router';

const CHANGE_EVENT='change';

//从cookie取出validateKey
var validateKey=utils.getCookie("validateKey");
console.log(validateKey);

//如果没有validateKey就跳转到登录页面
if(!validateKey) hashHistory.push("/");

//定义状态数据对象
var statusData={
	validateKey: validateKey
}

//声明栏目ID
var pid;

var _globalData={
	//头部栏目列表
	columnsData: null,
	//用户信息
	userInfo: null,
	//右侧菜单
	menusData: null,
	//部门列表
	departments: null,
	//角色列表
	roles: null,
	//声明栏目ID
	pid: null
}

//加载系统栏目
function loadColumn(){
	var columnsData;
	ajax({
		url: '/eye/user/v1/getUserMenues.json',
		data: statusData,
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
	var userInfo
	ajax({
		url: '/eye/user/v1/getLoginUserInfo.json',
		data: statusData,
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
	var requestData={pid: pid},menusData;

	//合并请求参数
	requestData=assign({},requestData,statusData);

	ajax({
		url: '/eye/user/v1/getUserRights.json',
		data: requestData,
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				menusData=data.data;
			}
		}
	});
	return menusData;
}

//加载部门
function getDepartments(){
	var departments;
	ajax({
		url:'/eye/dept/v1/getDepts.json',
		data: statusData,
		async: false,
		success: function(data) {
			departments=data.data;
		}
	});
	return departments;
}

//加载角色
function getRoles(){
	var roles;
	ajax({
		url:'/eye/role/v1/getRoles.json',
		data: statusData,
		async: false,
		success: function(data) {
			roles=data.data;
		}
	});
	return roles;
}

//退出登录
function logout(){
	ajax({
		url: '/eye/user/v1/logout.json',
		data: statusData,
		success: function(data) {
			if(data.code==="0000") {
				//从cookie删除validateKey
				//utils.delCookie("validateKey");
				//跳转到登录页
				location.assign("/#/");
			}
		}
	});
}

const GlobalStore=assign({},EventEmitter.prototype,{

	getStatusData: function(){
		return statusData;
	},

	getColumnsData: function(){
		return loadColumn();
	},

	getUserInfo: function(){
		return loadUserInfo();
	},

	getMenusData: function(){
		return loadMenu(pid);
	},

	getDepartments: function(){
		return getDepartments();
	},

	getRoles: function(){
		return getRoles();
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