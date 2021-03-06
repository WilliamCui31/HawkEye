import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import MainStore from '../stores/MainStore';
import UserAddConstants from '../constants/UserAddConstants';
import assign from 'object-assign';
import ajax from '../common/ajax';

const CHANGE_EVENT='change';
const RESET_EVENT='reset';
const UPDATE_EVENT='update';

//定义新增用户数据对象
var _userAddData={}

//确认新增用户
function addUser(addAccount){
	ajax({
		url:'/eye/user/v1/saveUser.json',
		data: addAccount,
		success: function(data) {
			var feedback;
			if(data.code==="0000"){
				feedback={
					flag: true,
					msg: "新增用户成功！"
				}
			}else{
				feedback={
					flag: false,
					msg: data.description
				}
			}
			_userAddData.feedback=feedback;
			UserAddStore.emitEvent(CHANGE_EVENT);
		}
	});
}

const UserAddStore=assign({},EventEmitter.prototype,{

	getData: function(){
		return _userAddData;
	},

	getRights: function(){
		var rights;
		ajax({
			url:'/eye/right/v1/getAllRighs.json',
			async: false,
			success: function(data) {
				rights=data.data;
			}
		});
		return rights;
	},

	validateUser: function(e){
		var requireData={accountName: e.target.value},flag=true;
		ajax({
			url:'/eye/user/v1/userValide.json',
			async: false,
			data: requireData,
			success: function(data) {
				if(data.code==="1000") flag=false;
			}
		});
		return flag;
	},

	emitEvent: function(event){
		this.emit(event);
	},

	addEventListener: function(event,callback){
		this.on(event,callback);
	},

	removeEventListener: function(event,callback){
		this.removeListener(event,callback);
	}

});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case UserAddConstants.GET_RIGHTS:
			getRights();
			UserAddStore.emitEvent(CHANGE_EVENT);
			break;

		case UserAddConstants.ADD_USER:
			var account={
				user: action.user,
				rights: action.rights,
				roleId: action.roleId
			}

			//发送新增用户请求
			addUser(account);
			break;

		default:

	}
});

export default UserAddStore;
