import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalStore from '../stores/GlobalStore';
import UserAddConstants from '../constants/UserAddConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

//定义新增用户数据对象
var _userAddData={}

//加载权限
function getRights(){
	ajax({
		url:'/eye/right/v1/getAllRighs.json',
		async: false,
		success: function(data) {
			_userAddData.rights=data.data;
		}
	});
}

//确认新增用户
function addUser(addAccount){
	ajax({
		url:'/eye/user/v1/saveUser.json',
		data: addAccount,
		success: function(data) {
			console.log(data);
		}
	});
}

const UserAddStore=assign({},EventEmitter.prototype,{

	getData: function(){
		return _userAddData;
	},

	areAllRightChecked: function(){
		var areAllRightChecked=true;
		_userAddData.rights.forEach(function(element,index,array){
			if(element.isChecked=="0") areAllRightChecked=false;
			let children=element.datas;
			children.forEach(function(element,index,array){
				if(element.isChecked=="0") areAllRightChecked=false;
				let children=element.datas;
				children.forEach(function(element,index,array){
					if(element.isChecked=="0") areAllRightChecked=false;
				});
			});
		});
		return areAllRightChecked;
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
		case UserAddConstants.GET_RIGHTS:
			getRights();
			UserAddStore.emitChange();
			break;

		case UserAddConstants.ADD_USER:
			var account={
				user: action.user,
				rights: action.rights,
				roleId: action.roleId
			}

			//发送新增用户请求
			addUser(account);

			UserAddStore.emitChange();
			break;

		default:

	}
});

export default UserAddStore;
