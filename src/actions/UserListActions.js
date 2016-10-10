import AppDispatcher from '../dispatcher/AppDispatcher';
import UserListConstants from '../constants/UserListConstants';

const UserListActions = {

	queryUsers: function(queryParam){
		AppDispatcher.dispatch({
			actionType: UserListConstants.QUERY_USERS,
			queryParam: queryParam
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

	modifyUserInfo: function(userId,user){
		AppDispatcher.dispatch({
			actionType: UserListConstants.MODIFY_USER_INFO,
			userId: userId,
			user: user
		});
	},

	modifyUserRights: function(userId,rights,roleId) {
		AppDispatcher.dispatch({
			actionType: UserListConstants.MODIFY_USER_RIGHTS,
			userId: userId,
			rights: rights,
			roleId: roleId
		});
	},

}

export default UserListActions;
