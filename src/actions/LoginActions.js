var AppDispatcher=require('../dispatcher/AppDispatcher');
var LoginConstants=require('../constants/LoginConstants');

var LoginActions = {

	getVerfiyCode: function(){
		AppDispatcher.dispatch({
			actionType: LoginConstants.GET_VERFIY_CODE
		});
	}
	
}

module.exports = LoginActions;