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

	checkRight: function(id,isChecked){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.CHECK_RIGHT,
			id: id,
			isChecked: isChecked
		});
	},

	checkAllRights: function(isCheckedAll){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.CHECK_ALL_RIGHTS,
			isCheckedAll: isCheckedAll
		});
	},

	addUser: function(){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.ADD_USER
		});
	}
}

export default UserAddActions;