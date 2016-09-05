var AppDispatcher=require('../dispatcher/AppDispatcher');
var EventEmitter=require('events').EventEmitter;
var LoginConstants=require('../constants/LoginConstants');
var assign=require('object-assign');

var CHANGE_EVENT='change';

var LoginStore=assign({},EventEmitter.prototype,{

	getVerfiyCode: function(){
		return {
			verfiyCode: 'NsYd'
		}
	},

	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}

});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case LoginConstants.GET_VERFIY_CODE:
			return {verfiyCode: '1234'};
			LoginStore.emitChange();
			break;

		default:

	}
});

module.exports=LoginStore;