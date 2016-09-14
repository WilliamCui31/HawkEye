import AppDispatcher from '../dispatcher/AppDispatcher';
import OperateFormConstants from '../constants/OperateFormConstants';

const OperateFormActions = {

	queryForm: function(start,end){
		AppDispatcher.dispatch({
			actionType: OperateFormConstants.QUERY_FORM,
			start: start,
			end: end
		});
	}

}

export default OperateFormActions;