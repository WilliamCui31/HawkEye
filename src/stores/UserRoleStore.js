import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalStore from '../stores/GlobalStore';
import UserRoleConstants from '../constants/UserRoleConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

//调用状态数据对象
var statusData=GlobalStore.getStatusData();

var _userRoleData={
	//当前页码
	pageIndex: 1,
	usersPageIndex: 1
}

getRolesList(_userRoleData.pageIndex);
function getRolesList(pageIndex){
	var requireData={
		pageNum: pageIndex,
		pageSize: 10
	};
	requireData=assign({},requireData,statusData);
	ajax({
		url:'/eye/role/v1/getRolesByPage.json',
		data: requireData,
		success: function(data) {
			_userRoleData.rolesList=data.data;
			UserRoleStore.emitChange();
		}
	});
}

function deleteRole(roleId){
	var requireData={id: roleId};
	requireData=assign({},requireData,statusData);
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/deleteRole.json',
		data: requireData,
		success: function(data) {
			console.log(data);
			getRolesList(_userRoleData.pageIndex);
		}
	});
}

function addRole(name){
	var requireData={name: name};
	requireData=assign({},requireData,statusData);
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/addRole.json',
		data: requireData,
		success: function(data) {
			console.log(data);
			getRolesList(_userRoleData.pageIndex);
		}
	});
}

function getRoleRights(roleId){
	var requireData={roleId: roleId};
	requireData=assign({},requireData,statusData);
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/roleRights.json',
		data: requireData,
		async: false,
		success: function(data) {
			_userRoleData.roleRights=data.data;
			UserRoleStore.emitChange();
		}
	});
}

function assignRoleRights(requireData){
	requireData=assign({},requireData,statusData);
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

function getRoleUsers(roleId,pageIndex){
	var requireData={
		pageNum: pageIndex,
		pageSize: 10,
		roleId: roleId
	};
	requireData=assign({},requireData,statusData);
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/getRoleUsers.json',
		data: requireData,
		async: false,
		success: function(data) {
			console.log(data);
			_userRoleData.roleUsers=data.data;
			UserRoleStore.emitChange();
		}
	});
}

function deletUser(userId,roleId){
	var requireData={
		uid: userId,
		roleId: roleId
	}
	requireData=assign({},requireData,statusData);
	console.log(requireData);
	ajax({
		url:'/eye/role/v1/deleteUserRole.json',
		data: requireData,
		success: function(data) {
			console.log(data);
			getRoleUsers(_userRoleData.role.id,_userRoleData.usersPageIndex);
		}
	});
}

const UserRoleStore=assign({},EventEmitter.prototype,{

	getRolesList: function(){
		return _userRoleData.rolesList;
	},

	getRoleRights: function(){
		return _userRoleData.roleRights;
	},

	getRole: function(){
		return _userRoleData.role;
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

	getRoleUsers: function(){
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
			getRoleRights(_userRoleData.role.id);
			break;

		case UserRoleConstants.CHECK_ROLE_RIGHT:

			//权限选择操作
			if(action.isChecked){
				//取消权限

				//一级遍历
				_userRoleData.roleRights.forEach(function(element,index,array){
					var children=element.datas;

					if(element.id==action.id) {
						element.isChecked="0";
						children.forEach(function(element,index,array){
							var children=element.datas;
							element.isChecked="0";
							children.forEach(function(element,index,array){
								element.isChecked="0";
							});
						});
					}

					//二级遍历
					children.forEach(function(element,index,array){
						var children=element.datas;

						if(element.id==action.id) {
							element.isChecked="0";
							children.forEach(function(element,index,array){
								element.isChecked="0";
							});
						}

						//三级遍历
						children.forEach(function(element,index,array){
							if(element.id==action.id) element.isChecked="0";
						});
					});

				});
			}else{
				//勾选权限

				//一级遍历
				_userRoleData.roleRights.forEach(function(element,index,array){
					var children=element.datas;

					if(element.id==action.id) {
						element.isChecked="1";
						children.forEach(function(element,index,array){
							var children=element.datas;
							element.isChecked="1";
							children.forEach(function(element,index,array){
								element.isChecked="1";
							});
						});
					}

					//二级遍历
					var firstChecked=false;
					children.forEach(function(element,index,array){
						var children=element.datas;

						if(element.id==action.id) {
							element.isChecked="1";
							children.forEach(function(element,index,array){
								element.isChecked="1";
							});
							firstChecked=true;
						}

						//三级遍历
						var secondeChecked=false;
						children.forEach(function(element,index,array){
							if(element.id==action.id) {
								element.isChecked="1";
								secondeChecked=true;
							}
						});
						if(secondeChecked) element.isChecked="1";

						if(element.isChecked=="1") firstChecked=true;
					});
					if(firstChecked) element.isChecked="1";

				});
			}

			UserRoleStore.emitChange();
			break;

		case UserRoleConstants.CHECK_ALL_ROLE_RIGHTS:

			//菜单权限全选操作
			if(action.isCheckedAll){
				//全选
				_userRoleData.roleRights.forEach(function(element,index,array){
					element.isChecked="1";
					let children=element.datas;
					children.forEach(function(element,index,array){
						element.isChecked="1";
						let children=element.datas;
						children.forEach(function(element,index,array){
							element.isChecked="1";
						});
					});
				});
			}else{
				//全不选
				_userRoleData.roleRights.forEach(function(element,index,array){
					element.isChecked="0";
					let children=element.datas;
					children.forEach(function(element,index,array){
						element.isChecked="0";
						let children=element.datas;
						children.forEach(function(element,index,array){
							element.isChecked="0";
						});
					});
				});
			}

			UserRoleStore.emitChange();
			break;

		case UserRoleConstants.ASSIGN_ROLE_RIGHTS:
			//分配角色权限
			var rights=[];

			//把选中的权限放入rights数组
			_userRoleData.roleRights.forEach(function(element,index,array){
				if(element.isChecked=="1") {
					var right={"rightId":element.id}
					rights.push(right);
				}

				let children=element.datas; 
				children.forEach(function(element,index,array){
					if(element.isChecked=="1") {
						var right={"rightId":element.id}
						rights.push(right);
					}

					let children=element.datas;
					children.forEach(function(element,index,array){
						if(element.isChecked=="1") {
							var right={"rightId":element.id}
							rights.push(right);
						}
					});
				});
			});

			var requireData={
				roleId: action.roleId,
				rights: rights
			}

			assignRoleRights(requireData);
			break;

		case UserRoleConstants.GET_ROLE_USERS:
			//获取角色用户
			if(action.pageIndex) _userRoleData.usersPageIndex=action.pageIndex;
			_userRoleData.role=action.role;
			getRoleUsers(_userRoleData.role.id,_userRoleData.usersPageIndex);

			break;

		case UserRoleConstants.DELETE_USER:
			//删除角色用户
			
			deletUser(action.userId,action.roleId);

			break;


		default:

	}
});

export default UserRoleStore;