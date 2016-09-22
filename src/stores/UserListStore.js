import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalStore from '../stores/GlobalStore';
import UserListConstants from '../constants/UserListConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

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
			if(data.code==="0000") {
				console.log(data);
				//修改成功 更新用户列表
				queryUsers(_userListData.queryParam);
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
				UserListStore.emitChange();
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

	areAllRightChecked: function(){
		var areAllRightChecked=true;
		_userListData.userRights.forEach(function(element,index,array){
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
				user: action.userInfo
			};

			modifyUser(modifyData);

			break;

		case UserListConstants.MODIFY_USER_RIGHTS:

			//修改用户权限
			var rights=[];

			//把选中的权限放入rights数组
			_userListData.userRights.forEach(function(element,index,array){
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

			var modifyData={
				uid: action.userId,
				rights: rights
			};
			if(action.roleId) modifyData.roleId=action.roleId;

			modifyUser(modifyData);

			break;

		case UserListConstants.CHECK_RIGHT:

			//权限选择操作
			if(action.isChecked){
				//取消权限

				//一级遍历
				_userListData.userRights.forEach(function(element,index,array){
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
				_userListData.userRights.forEach(function(element,index,array){
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

			UserListStore.emitChange();
			break;

		case UserListConstants.CHECK_ALL_RIGHTS:

			//菜单权限全选操作
			if(action.isCheckedAll){
				//全选
				_userListData.userRights.forEach(function(element,index,array){
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
				_userListData.userRights.forEach(function(element,index,array){
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

			UserListStore.emitChange();
			break;


		default:

	}
});

export default UserListStore;
