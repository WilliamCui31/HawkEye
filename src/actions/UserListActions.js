import AppDispatcher from '../dispatcher/AppDispatcher';
import UserListConstants from '../constants/UserListConstants';

const UserListActions = {

	inputData: function(e){
		AppDispatcher.dispatch({
			actionType: UserListConstants.INPUT_DATA,
			id: e.target.id,
			value: e.target.value
		});
	},

	queryUsers: function(pageIndex){
		AppDispatcher.dispatch({
			actionType: UserListConstants.QUERY_USERS,
			pageIndex: pageIndex
		});
	},

	switchUserStatus: function(userId,isAvaliable){
		AppDispatcher.dispatch({
			actionType: UserListConstants.SWITCH_USER_STATUS,
			uid: userId,
			isAvaliable: isAvaliable
		});
	},

	getUserDetail: function(userId){
		AppDispatcher.dispatch({
			actionType: UserListConstants.GET_USER_DETAIL,
			userId: userId
		});
	},

	modifyUserInfo: function(userId,userInfo){
		AppDispatcher.dispatch({
			actionType: UserListConstants.MODIFY_USER_INFO,
			userId: userId,
			userInfo: userInfo
		});
	},

	modifyUserRights: function(userId,roleId) {
		AppDispatcher.dispatch({
			actionType: UserListConstants.MODIFY_USER_RIGHTS,
			userId: userId,
			roleId: roleId
		});
	},

	checkRight: function(id,isChecked){
		AppDispatcher.dispatch({
			actionType: UserListConstants.CHECK_RIGHT,
			id: id,
			isChecked: isChecked
		});
	},

	checkAllRights: function(isCheckedAll){
		AppDispatcher.dispatch({
			actionType: UserListConstants.CHECK_ALL_RIGHTS,
			isCheckedAll: isCheckedAll
		});
	}

}

export default UserListActions;