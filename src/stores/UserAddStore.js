var AppDispatcher=require('../dispatcher/AppDispatcher');
var EventEmitter=require('events').EventEmitter;
var userAddConstants=require('../constants/userAddConstants');
var assign=require('object-assign');
var ajax=require('../ajax');

var CHANGE_EVENT='change';

var userAddData={
	departMents: getDepartments(),
	roles: getRoles(),
	rights: getRights()
}

//加载部门
function getDepartments(){
	var departMents;
	ajax({
		url:'/eye/dept/v1/getDepts.json',
		async: false,
		success: function(data) {
			departMents=data.data;
		}
	});
	return departMents;
}

//加载角色
function getRoles(){
	var roles;
	ajax({
		url:'/eye/role/v1/getRoles.json',
		async: false,
		success: function(data) {
			roles=data.data;
		}
	});
	return roles;
}

//加载权限
function getRights(){
	var rights;
	ajax({
		url:'/eye/right/v1/getAllRighs.json',
		async: false,
		success: function(data) {
			rights=data.data;
		}
	});
	return rights;
}

var UserAddStore=assign({},EventEmitter.prototype,{

	getData: function(){
		return userAddData;
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
		case userAddConstants.SAVE_USER:
			
			break;

		default:

	}
});

module.exports=UserAddStore;