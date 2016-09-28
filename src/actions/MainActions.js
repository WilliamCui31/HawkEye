import AppDispatcher from '../dispatcher/AppDispatcher';
import MainConstants from '../constants/MainConstants';

const MainActions = {

	switchColumn: function(pid){
		AppDispatcher.dispatch({
			actionType: MainConstants.SWITCH_COLUMN,
			pid: pid
		});
	},

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
