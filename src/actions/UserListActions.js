import AppDispatcher from '../dispatcher/AppDispatcher';
import UserListConstants from '../constants/UserListConstants';

const UserListActions = {

	inputData: function(id,value){
		AppDispatcher.dispatch({
			actionType: UserListConstants.INPUT_DATA,
			id: id,
			value: value
		});
	},

	queryUsers: function(pageIndex){
		AppDispatcher.dispatch({
			actionType: UserListConstants.QUERY_USERS,
			pageIndex: pageIndex
		})
	}
}

export default UserListActions;