var AppDispatcher=require('../dispatcher/AppDispatcher');
var UserAddConstants=require('../constants/UserAddConstants');

var UserAddActions = {

	saveUser: function(){
		AppDispatcher.dispatch({
			actionType: UserAddConstants.SAVE_USER
		});
	}
}

module.exports = UserAddActions;