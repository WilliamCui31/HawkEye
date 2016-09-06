var AppDispatcher=require('../dispatcher/AppDispatcher');
var EventEmitter=require('events').EventEmitter;
var LoginConstants=require('../constants/LoginConstants');
var assign=require('object-assign');

var CHANGE_EVENT='change';

var verfiyCode=getVerfiyCode(4);

/** 
  *
  * @des 随机生成字符串（模拟生成图形验证码） 
  * @param {len} number 生成字符串的位数
  * @return {str} string 生成的字符串
  *
  **/
function getVerfiyCode(len){
	var len=len||32;
	var charLib='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos=charLib.length;
	var str='';
	for(var i=0; i<len; i++){
		str+=charLib.charAt(Math.floor(Math.random()*maxPos));
	}

	return str;
}

var LoginStore=assign({},EventEmitter.prototype,{

	getVerfiyCode: function(){
		return verfiyCode;
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
			verfiyCode=getVerfiyCode(4);
			LoginStore.emitChange();
			break;

		default:

	}
});

module.exports=LoginStore;