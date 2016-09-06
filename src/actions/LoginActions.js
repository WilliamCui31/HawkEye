var AppDispatcher=require('../dispatcher/AppDispatcher');
var LoginConstants=require('../constants/LoginConstants');

var LoginActions = {

	getVerfiyCode: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.GET_VERFIY_CODE
		});
	},

	setUserName: function(value){
		AppDispatcher.dispatch({
			actionType: LoginConstants.SET_USER_NAME,
			value: value
		})
	},

	setPassword: function(value){
		AppDispatcher.dispatch({
			actionType: LoginConstants.SET_PASSWORD,
			value: value
		})
	},

	setCheckCode: function(value){
		AppDispatcher.dispatch({
			actionType: LoginConstants.SET_CHECK_CODE,
			value: value
		})
	},

	submit: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.SUBMIT
		})
	}
	
}

module.exports = LoginActions;