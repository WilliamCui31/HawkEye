import AppDispatcher from '../dispatcher/AppDispatcher';
import UserAddConstants from '../constants/UserAddConstants';

const UserAddActions = {

	updateData: function(id,value){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.UPDATE_DATA,
			id: id,
			value: value
		});
	},

	updateRight: function(id){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.UPDATE_RIGHT,
			id: id
		});
	},

	addUser: function(){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.ADD_USER
		});
	}
}

export default UserAddActions;