import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import UserAddConstants from '../constants/UserAddConstants';
import assign from 'object-assign';
import ajax from '../ajax';

const CHANGE_EVENT='change';

var _userAddData={
	departMents: getDepartments(),
	roles: getRoles(),
	rights: getRights(),
	userInfo: {
		user: {},
		rights: null,
		roleId: null
	}
}

//加载部门
function getDepartments(){
	var departMents;
	ajax({
		url:'/eye/dept/v1/getDepts.json',
		async: false,
		success: function(data) {
			departMents=data.data;
		}
	});
	return departMents;
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

//加载权限
function getRights(){
	var rights;
	ajax({
		url:'/eye/right/v1/getAllRighs.json',
		async: false,
		success: function(data) {
			rights=data.data;
		}
	});
	return rights;
}

//更新保存用户信息
function updateUser(id,value){
	_userAddData.userInfo.user[id]=value;
}

//确认新增用户
function addUser(userInfo){
	ajax({
		url:'/eye/user/v1/saveUser.json',
		data: userInfo,
		success: function(data) {
			console.log(data);
		}
	});
}

const UserAddStore=assign({},EventEmitter.prototype,{

	getData: function(){
		return _userAddData;
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
		case UserAddConstants.UPDATE_DATA:
			if(action.value!==_userAddData.userInfo.user[action.id]){
				if(action.id!=="roleId"){
					updateUser(action.id,action.value);
				}else {
					_userAddData.userInfo[action.id]=action.value;
				}
				//console.log(_userAddData.userInfo);
			}
			break;

		case UserAddConstants.UPDATE_RIGHT:
			alert(1);
			//console.log(_userAddData.userInfo);
			break;

		case UserAddConstants.ADD_USER:
			addUser(_userAddData.userInfo);
			break;

		default:

	}
});

export default UserAddStore;