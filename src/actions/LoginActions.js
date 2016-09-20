import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';

const LoginActions = {

	getVerfiyCode: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.GET_VERFIY_CODE
		});
	},

	inputAccount: function(e){
		AppDispatcher.dispatch({
			actionType: LoginConstants.INPUT_ACCOUNT,
			id: e.target.id,
			value: e.target.value
		});
	},

	submit: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.SUBMIT
		})
	}

}

export default LoginActions;
