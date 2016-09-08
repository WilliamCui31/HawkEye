import AppDispatcher from '../dispatcher/AppDispatcher';
import GlobalConstants from '../constants/GlobalConstants';

const GlobalActions = {

	switchColumn: function(pid){
		AppDispatcher.dispatch({
			actionType: GlobalConstants.SWITCH_COLUMN,
			pid: pid
		});
	}
	
}

export default GlobalActions;