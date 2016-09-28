import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';

const LoginActions = {

	getVerfiyCode: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.GET_VERFIY_CODE
		});
	},

	login: function(account){
		AppDispatcher.dispatch({
			actionType: LoginConstants.LOGIN,
			account: account
		})
	}

}

export default LoginActions;
