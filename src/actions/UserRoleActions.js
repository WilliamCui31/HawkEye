import AppDispatcher from '../dispatcher/AppDispatcher';
import UserRoleConstants from '../constants/UserRoleConstants';

const UserRoleActions = {

	getRolesList: function(pageIndex){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.GET_ROLES_LIST,
			pageIndex: pageIndex
		});
	},

	deleteRole: function(roleId){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.DELETE_ROLE,
			roleId: roleId
		});
	},

	addRole: function(value){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.ADD_ROLE,
			name: value
		});
	},

	getRoleRights: function(role){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.GET_ROLE_RIGHTS,
			role: role
		});
	},

	checkRoleRight: function(id,isChecked){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.CHECK_ROLE_RIGHT,
			id: id,
			isChecked: isChecked
		});
	},

	checkAllRoleRights: function(isCheckedAll){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.CHECK_ALL_ROLE_RIGHTS,
			isCheckedAll: isCheckedAll
		});
	},

	assignRoleRights: function(roleId){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.ASSIGN_ROLE_RIGHTS,
			roleId: roleId
		});
	},

	getRoleUsers: function(role,pageIndex){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.GET_ROLE_USERS,
			role: role,
			pageIndex: pageIndex
		});
	},

	deleteUser: function(userId,roleId){
		AppDispatcher.dispatch({
			actionType: UserRoleConstants.DELETE_USER,
			userId: userId,
			roleId: roleId
		});
	}

}

export default UserRoleActions;