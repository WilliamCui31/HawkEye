import AppDispatcher from '../dispatcher/AppDispatcher';
import GlobalConstants from '../constants/GlobalConstants';

const GlobalActions = {

	setValidateKey: function(key){
		AppDispatcher.dispatch({
			actionType: GlobalConstants.SET_VALIDATE_KEY,
			key: key
		});
	},

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