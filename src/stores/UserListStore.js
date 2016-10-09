import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import MainStore from '../stores/MainStore';
import UserListConstants from '../constants/UserListConstants';
import assign from 'object-assign';
import ajax from '../common/ajax';

const CHANGE_EVENT='change';

var _userListData={
	queryParam: {
		//每页10条
		pageSize: 10
	}
}

//查询用户
function queryUsers(queryParam) {
	ajax({
		url: '/eye/user/v1/getUsers.json',
		data: queryParam,
		success: function(data) {
			if(data.code==="0000") {
				_userListData.usersList=data.data;
				UserListStore.emitChange();
			}
		}
	});
}

//修改用户
function modifyUser(modifyData) {
	console.log(modifyData);
	ajax({
		url: '/eye/user/v1/editUser.json',
		data: modifyData,
		success: function(data) {
			console.log(data);
			if(data.code==="0000") {
				//修改成功 更新用户列表
				queryUsers(_userListData.queryParam);
				UserListStore.emitChange();
			}
		}
	});
}

//获取用户详情
function getUserDetail(userId) {
	var queryParam={uid: userId};
	ajax({
		url: '/eye/user/v1/getUserDetail.json',
		data: queryParam,
		async: false,
		success: function(data) {
			if(data.code==="0000") {
				_userListData.userInfo=data.data.user;
				_userListData.userRights=data.data.rights;
			}
		}
	});
}

const UserListStore=assign({},EventEmitter.prototype,{

	getUserListData: function(){
		return _userListData.usersList;
	},

	getUserInfo: function(userId){
		getUserDetail(userId);
		return _userListData.userInfo;
	},

	getUserRights: function(userId){
		getUserDetail(userId);
		return _userListData.userRights;
	},

	getFeedback: function(){
		return _userListData.feedback;
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
		case UserListConstants.INPUT_DATA:

			_userListData.queryParam[action.id]=action.value;

			UserListStore.emitChange();
			break;

		case UserListConstants.QUERY_USERS:

			//设置查询页码
			_userListData.queryParam.pageNum=action.pageIndex;

			//查询用户
			queryUsers(_userListData.queryParam);

			break;

		case UserListConstants.SWITCH_USER_STATUS:
			//切换用户状态
			var isAvaliable=1;
			if(action.isAvaliable==1) isAvaliable=0;

			var modifyData={
				uid: action.uid,
				isAvaliable: isAvaliable
			};

			modifyUser(modifyData);

			break;

		case UserListConstants.MODIFY_USER_INFO:
			//修改用户信息

			var modifyData={
				uid: action.userId,
				user: action.user
			};

			modifyUser(modifyData);

			break;

		case UserListConstants.MODIFY_USER_RIGHTS:
			//修改用户权限
			var modifyData={uid: action.userId};
			if(action.rights) modifyData.roleId=action.rights;
			if(action.roleId) modifyData.roleId=action.roleId;

			modifyUser(modifyData);

			break;

		default:

	}
});

export default UserListStore;
