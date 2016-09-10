import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalStore from '../stores/GlobalStore';
import UserListConstants from '../constants/UserListConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

//调用状态数据对象
var statusData=GlobalStore.getStatusData();

var _userListData={
	queryParam: {
		//每页10条
		pageSize: 10
	}
}

//查询用户
function queryUsers(queryParam) {
	var users;
	queryParam=assign({},queryParam,statusData);
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

const UserListStore=assign({},EventEmitter.prototype,{

	getUserListData: function(){
		return _userListData.usersList;
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

			//设置当前页码
			_userListData.queryParam.pageNum=action.pageIndex;
			//查询用户
			queryUsers(_userListData.queryParam);

			break;

		default:

	}
});

export default UserListStore;