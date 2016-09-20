import AppDispatcher from '../dispatcher/AppDispatcher';
import UserAddConstants from '../constants/UserAddConstants';

const UserAddActions = {

	inputData: function(e){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.INPUT_DATA,
			id: e.target.id,
			value: e.target.value
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