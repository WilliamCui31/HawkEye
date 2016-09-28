import AppDispatcher from '../dispatcher/AppDispatcher';
import MainConstants from '../constants/MainConstants';

const MainActions = {

	logout: function(){
		AppDispatcher.dispatch({
			actionType: MainConstants.LOGOUT
		});
	},

	resetPassword: function(cpwd,newPwd){
		AppDispatcher.dispatch({
			actionType: MainConstants.RESET_PASSWORD,
			cpwd: cpwd,
			newPwd: newPwd
		});
	}

}

export default MainActions;
