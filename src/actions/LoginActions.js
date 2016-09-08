import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';

const LoginActions = {

	getVerfiyCode: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.GET_VERFIY_CODE
		});
	},

	updateAccount: function(id,value){
		AppDispatcher.dispatch({
			actionType: LoginConstants.UPDATE_ACCOUNT,
			id: id,
			value: value
		});
	},

	submit: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.SUBMIT
		})
	}
	
}

export default LoginActions;