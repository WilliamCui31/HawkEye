import AppDispatcher from '../dispatcher/AppDispatcher';
import GlobalConstants from '../constants/GlobalConstants';

const GlobalActions = {

	switchColumn: function(pid){
		AppDispatcher.dispatch({
			actionType: GlobalConstants.SWITCH_COLUMN,
			pid: pid
		});
	},

	logout: function(){
		AppDispatcher.dispatch({
			actionType: GlobalConstants.LOGOUT
		});
	},

	resetPassword: function(cpwd,newPwd){
		AppDispatcher.dispatch({
			actionType: GlobalConstants.RESET_PASSWORD,
			cpwd: cpwd,
			newPwd: newPwd
		});
	}

}

export default GlobalActions;
