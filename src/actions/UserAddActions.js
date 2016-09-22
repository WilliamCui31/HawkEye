import AppDispatcher from '../dispatcher/AppDispatcher';
import UserAddConstants from '../constants/UserAddConstants';

const UserAddActions = {
	getRights: function(){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.GET_RIGHTS,
		});
	},

	addUser: function(user,rights,roleId){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.ADD_USER,
			user: user,
			rights: rights,
			roleId: roleId
		});
	}
}

export default UserAddActions;
