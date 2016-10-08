import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import MainConstants from '../constants/MainConstants';
import assign from 'object-assign';
import ajax from '../common/ajax';

const CHANGE_EVENT='change';

var _mainData={}

//加载系统栏目
function loadColumn(){
	var columnsData;
	ajax({
		url: '/eye/user/v1/getUserMenues.json',
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				columnsData=data.data;
				if(columnsData.length>0) {
					var columnId=columnsData[0].id;
					if(!sessionStorage.getItem("columnId")||sessionStorage.getItem("columnId")==="undefined"){
						//设置栏目ID
						sessionStorage.setItem("columnId",columnId);
					}
				}
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
function loadMenu(){
	var columnId=sessionStorage.getItem("columnId");
	var requestData={pid: columnId},menusData;
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
				//删除validateKey
				sessionStorage.removeItem("validateKey");
				//删除栏目ID
				sessionStorage.removeItem("columnId");
				//跳转到登录页
				location.assign("/");
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
				_mainData.resetPassword={
					status: true
				}
			}else {
				_mainData.resetPassword={
					status: false,
					msg: data.description
				}
			}
			MainStore.emitChange();
		}
	});
}

const MainStore=assign({},EventEmitter.prototype,{

	getColumnsData: function(){
		return loadColumn();
	},

	getUserInfo: function(){
		return loadUserInfo();
	},

	getMenusData: function(){
		return loadMenu();
	},

	getDepartments: function(){
		return getDepartments();
	},

	getRoles: function(){
		return getRoles();
	},

	resetPasswordfeedback: function(){
		return _mainData.resetPassword
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

		case MainConstants.LOGOUT:
			//退出登录
			logout();
			break;

		case MainConstants.RESET_PASSWORD:
			//重置密码
			resetPassword(action.cpwd,action.newPwd);
			break;

		default:

	}
});

export default MainStore;
