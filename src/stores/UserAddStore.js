import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import UserAddConstants from '../constants/UserAddConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

//从cookie取出validateKey
var validateKey=utils.getCookie("validateKey");

var _userAddData={
	departMents: getDepartments(),
	roles: getRoles(),
	rights: getRights(),
	userInfo: {
		user: {},
		rights: [],
		roleId: null
	}
}

//加载部门
function getDepartments(){
	var departMents;
	ajax({
		url:'/eye/dept/v1/getDepts.json',
		data: {validateKey: validateKey},
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
		data: {validateKey: validateKey},
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
		data: {validateKey: validateKey},
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
	userInfo.validateKey=validateKey;
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

	areAllRightChecked: function(){
		var areAllRightChecked=true;
		_userAddData.rights.forEach(function(element,index,array){
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
			}

			UserAddStore.emitChange();
			break;

		case UserAddConstants.CHECK_RIGHT:

			if(action.isChecked){
				//取消权限

				//一级遍历
				_userAddData.rights.forEach(function(element,index,array){
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
					var secondeDropOff=false;
					children.forEach(function(element,index,array){
						var children=element.datas;

						if(element.id==action.id) {
							element.isChecked="0";
							children.forEach(function(element,index,array){
								element.isChecked="0";
							});
						}

						//三级遍历
						var threeDropOff=false;
						children.forEach(function(element,index,array){
							if(element.id==action.id) element.isChecked="0";
							if(element.isChecked=="0") threeDropOff=true;
						});
						if(threeDropOff) element.isChecked="0";

						if(element.isChecked=="0") secondeDropOff=true;
					});
					if(secondeDropOff) element.isChecked="0";

				});
			}else{
				//勾选权限

				//一级遍历
				_userAddData.rights.forEach(function(element,index,array){
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
					var secondeAllChecked=true;
					children.forEach(function(element,index,array){
						var children=element.datas;

						if(element.id==action.id) {
							element.isChecked="1";
							children.forEach(function(element,index,array){
								element.isChecked="1";
							});
						}

						//三级遍历
						var threeAllChecked=true;
						children.forEach(function(element,index,array){
							if(element.id==action.id) element.isChecked="1";
							if(element.isChecked!="1") threeAllChecked=false;
						});
						if(threeAllChecked) element.isChecked="1";

						if(element.isChecked!="1") secondeAllChecked=false;
					});
					if(secondeAllChecked) element.isChecked="1";

				});
			}
			//_userAddData.areAllRightChecked=areAllRightChecked(_userAddData.rights);

			UserAddStore.emitChange();
			break;

		case UserAddConstants.CHECK_ALL_RIGHTS:

			if(action.isCheckedAll){
				//全选
				_userAddData.rights.forEach(function(element,index,array){
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
				_userAddData.rights.forEach(function(element,index,array){
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

			UserAddStore.emitChange();
			break;

		case UserAddConstants.ADD_USER:
			console.log(_userAddData.userInfo);
			addUser(_userAddData.userInfo);
			UserAddStore.emitChange();
			break;

		default:

	}
});

export default UserAddStore;