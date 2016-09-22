import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalConstants from '../constants/GlobalConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';
import { hashHistory } from 'react-router';

const CHANGE_EVENT='change';

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
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				columnsData=data.data;
				_globalData.pid=columnsData[0].id;
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
	if(!pid) pid=_globalData.pid;
	var requestData={pid: pid},menusData;
	ajax({
		url: '/eye/user/v1/getUserRights.json',
		async: false,
		data: requestData,
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

//密码重置
function resetPassword(cpwd,newPwd){
	var requestData={
		cpwd: cpwd,
		newPwd: newPwd
	};
	ajax({
		url: '/eye/user/v1/editPwd.json',
		data: requestData,
		success: function(data) {
			if(data.code==="0000") {
				//密码重置成功
				_globalData.resetPassword={
					status: true
				}
			}else {
				_globalData.resetPassword={
					status: false,
					msg: data.description
				}
			}
			console.log(data);
			GlobalStore.emitChange();
		}
	});
}

const GlobalStore=assign({},EventEmitter.prototype,{

	getColumnsData: function(){
		return loadColumn();
	},

	getUserInfo: function(){
		return loadUserInfo();
	},

	getMenusData: function(columnId){
		return loadMenu(columnId);
	},

	getDepartments: function(){
		return getDepartments();
	},

	getRoles: function(){
		return getRoles();
	},

	resetPasswordfeedback: function(){
		return _globalData.resetPassword
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

		case GlobalConstants.LOGOUT:
			//退出登录
			logout();
			break;

		case GlobalConstants.RESET_PASSWORD:
			//重置密码
			resetPassword(action.cpwd,action.newPwd);
			break;

		default:

	}
});

export default GlobalStore;
