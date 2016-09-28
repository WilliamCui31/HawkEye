import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalStore from '../stores/GlobalStore';
import UserRoleConstants from '../constants/UserRoleConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

var _userRoleData={
	//当前页码
	pageIndex: 1,
	usersPageIndex: 1
}

//获取角色列表
function getRolesList(pageIndex){
	var requireData={
		pageNum: pageIndex,
		pageSize: 10
	};
	ajax({
		url:'/eye/role/v1/getRolesByPage.json',
		data: requireData,
		success: function(data) {
			_userRoleData.rolesList=data.data;
			UserRoleStore.emitChange();
		}
	});
}

//删除角色
function deleteRole(roleId){
	var requireData={id: roleId};
	ajax({
		url:'/eye/role/v1/deleteRole.json',
		data: requireData,
		success: function(data) {
			getRolesList(_userRoleData.pageIndex);
		}
	});
}

//新增角色
function addRole(name){
	var requireData={name: name};
	ajax({
		url:'/eye/role/v1/addRole.json',
		data: requireData,
		success: function(data) {
			getRolesList(_userRoleData.pageIndex);
		}
	});
}

//获取角色权限
function getRoleRights(roleId){
	var requireData={roleId: roleId};
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/roleRights.json',
		data: requireData,
		async: false,
		success: function(data) {
			_userRoleData.roleRights=data.data;
		}
	});
}

//分配角色权限
function assignRoleRights(requireData){
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/editRoleRight.json',
		data: requireData,
		async: false,
		success: function(data) {
			console.log(data.description);
		}
	});
}

//获取角色所在用户列表
function getRoleUsers(roleId,pageIndex){
	var requireData={
		pageNum: pageIndex,
		pageSize: 10,
		roleId: roleId
	};
	ajax({
		url:'/eye/role/v1/getRoleUsers.json',
		data: requireData,
		async: false,
		success: function(data) {
			_userRoleData.roleUsers=data.data;
		}
	});
}

//从角色删除所在的用户
function deletRoleUser(userId,roleId){
	var requireData={
		uid: userId,
		roleId: roleId
	}
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/deleteUserRole.json',
		data: requireData,
		success: function(data) {
			UserRoleStore.emitChange();
		}
	});
}

//添加角色用户
function addRoleUser(roleId,users){
	var requireData={
		roleId: roleId,
		users: users
	}
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/editUserRole.json',
		data: requireData,
		success: function(data) {
			UserRoleStore.emitChange();
		}
	});
}

//修改角色名称
function modifyRoleName(roleId,roleName){
	var requireData={
		id: roleId,
		name: roleName
	}
	ajax({
		url:'/eye/role/v1/editRole.json',
		data: requireData,
		success: function(data) {
			getRolesList(_userRoleData.pageIndex);
		}
	});
}

const UserRoleStore=assign({},EventEmitter.prototype,{

	getRolesList: function(){
		return _userRoleData.rolesList;
	},

	getRoleRights: function(roleId){
		getRoleRights(roleId);
		return _userRoleData.roleRights;
	},

	getRole: function(){
		return _userRoleData.role;
	},

	getUserTree: function(id){
		var userTreeData;
		var requireData={
			roleId: id
		};
		ajax({
			url:'/eye/dept/v1/getDeptUsers.json',
			data: requireData,
			async: false,
			success: function(data) {
				userTreeData=data.data;
			}
		});
		return userTreeData;
	},

	areAllRightChecked: function(){
		var areAllRightChecked=true;
		_userRoleData.roleRights.forEach(function(element,index,array){
			if(element.isChecked=="0") areAllRightChecked=false;
			let children=element.datas;
			children.forEach(function(element,index,array){
				if(element.isChecked=="0") areAllRightChecked=false;
				let children=element.datas;
				children.forEach(function(element,index,array){
					if(element.isChecked=="0") areAllRightChecked=false;
				});
			});
		});
		return areAllRightChecked;
	},

	getRoleUsers: function(roleId,pageIndex){
		if(pageIndex) _userRoleData.usersPageIndex=pageIndex;
		getRoleUsers(roleId,_userRoleData.usersPageIndex);
		return _userRoleData.roleUsers;
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
		case UserRoleConstants.GET_ROLES_LIST:
			//获取角色列表
			_userRoleData.pageIndex=action.pageIndex;
			getRolesList(action.pageIndex);
			break;

		case UserRoleConstants.DELETE_ROLE:
			//删除角色
			deleteRole(action.roleId);
			break;

		case UserRoleConstants.ADD_ROLE:
			//添加角色
			addRole(action.name);
			break;

		case UserRoleConstants.GET_ROLE_RIGHTS:
			//获取角色权限

			_userRoleData.role=action.role;
			getRoleRights(_userRoleData.roleId);
			break;

		case UserRoleConstants.ASSIGN_ROLE_RIGHTS:

			var requireData={
				roleId: action.roleId,
				rights: action.rights
			}

			assignRoleRights(requireData);
			break;

		case UserRoleConstants.DELETE_ROLE_USER:
			//删除角色用户

			deletRoleUser(action.userId,action.roleId);

			break;

		case UserRoleConstants.ADD_ROLE_USER:
			//添加角色用户

			addRoleUser(action.roleId,action.users);

			break;

		case UserRoleConstants.MODIFY_ROLE_NAME:
			//修改角色名称
			modifyRoleName(action.roleId,action.roleName);

			break;


		default:

	}
});

export default UserRoleStore;
