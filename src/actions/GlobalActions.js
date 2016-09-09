import AppDispatcher from '../dispatcher/AppDispatcher';
import GlobalConstants from '../constants/GlobalConstants';

const GlobalActions = {

	setValidateKey: function(key){
		AppDispatcher.dispatch({
			actionType: GlobalConstants.SET_VALIDATE_KEY,
			key: key
		})
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
		})
	}
	
}

export default GlobalActions;