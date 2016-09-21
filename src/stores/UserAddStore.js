import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import GlobalStore from '../stores/GlobalStore';
import UserAddConstants from '../constants/UserAddConstants';
import assign from 'object-assign';
import ajax from '../ajax';
import utils from '../utils';

const CHANGE_EVENT='change';

//定义新增用户数据对象
var _userAddData={
	//要提交新增用户的信息
	rights: null,
	addAccount: {
		user: {},
		rights: [],
		roleId: null
	}
}

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

		case UserAddConstants.INPUT_DATA:
			if(action.value!==_userAddData.addAccount.user[action.id]){
				if(action.id!=="roleId"){
					console.log("9999999",typeof action.value);
					_userAddData.addAccount.user[action.id]=action.value;
				}else {
					_userAddData.addAccount[action.id]=action.value;
				}
			}

			UserAddStore.emitChange();
			break;

		case UserAddConstants.CHECK_RIGHT:

			//权限选择操作
			if(action.isChecked){
				//取消权限

				//一级遍历
				_userAddData.rights.forEach(function(element,index,array){
					var children=element.datas;

					if(element.id==action.id) {
						element.isChecked="0";
						children.forEach(function(element,index,array){
							var children=element.datas;
							element.isChecked="0";
							children.forEach(function(element,index,array){
								element.isChecked="0";
							});
						});
					}

					//二级遍历
					children.forEach(function(element,index,array){
						var children=element.datas;

						if(element.id==action.id) {
							element.isChecked="0";
							children.forEach(function(element,index,array){
								element.isChecked="0";
							});
						}

						//三级遍历
						children.forEach(function(element,index,array){
							if(element.id==action.id) element.isChecked="0";
						});
					});

				});
			}else{
				//勾选权限

				//一级遍历
				_userAddData.rights.forEach(function(element,index,array){
					var children=element.datas;

					if(element.id==action.id) {
						element.isChecked="1";
						children.forEach(function(element,index,array){
							var children=element.datas;
							element.isChecked="1";
							children.forEach(function(element,index,array){
								element.isChecked="1";
							});
						});
					}

					//二级遍历
					var firstChecked=false;
					children.forEach(function(element,index,array){
						var children=element.datas;

						if(element.id==action.id) {
							element.isChecked="1";
							children.forEach(function(element,index,array){
								element.isChecked="1";
							});
							firstChecked=true;
						}

						//三级遍历
						var secondeChecked=false;
						children.forEach(function(element,index,array){
							if(element.id==action.id) {
								element.isChecked="1";
								secondeChecked=true;
							}
						});
						if(secondeChecked) element.isChecked="1";

						if(element.isChecked=="1") firstChecked=true;
					});
					if(firstChecked) element.isChecked="1";

				});
			}

			UserAddStore.emitChange();
			break;

		case UserAddConstants.CHECK_ALL_RIGHTS:

			//菜单权限全选操作
			if(action.isCheckedAll){
				//全选
				_userAddData.rights.forEach(function(element,index,array){
					element.isChecked="1";
					let children=element.datas;
					children.forEach(function(element,index,array){
						element.isChecked="1";
						let children=element.datas;
						children.forEach(function(element,index,array){
							element.isChecked="1";
						});
					});
				});
			}else{
				//全不选
				_userAddData.rights.forEach(function(element,index,array){
					element.isChecked="0";
					let children=element.datas;
					children.forEach(function(element,index,array){
						element.isChecked="0";
						let children=element.datas;
						children.forEach(function(element,index,array){
							element.isChecked="0";
						});
					});
				});
			}

			UserAddStore.emitChange();
			break;

		case UserAddConstants.ADD_USER:

			//把选中的权限放入addAccount.rights数组
			_userAddData.rights.forEach(function(element,index,array){
				if(element.isChecked=="1") {
					var right={"rightId":element.id}
					_userAddData.addAccount.rights.push(right);
				}

				let children=element.datas;
				children.forEach(function(element,index,array){
					if(element.isChecked=="1") {
						var right={"rightId":element.id}
						_userAddData.addAccount.rights.push(right);
					}

					let children=element.datas;
					children.forEach(function(element,index,array){
						if(element.isChecked=="1") {
							var right={"rightId":element.id}
							_userAddData.addAccount.rights.push(right);
						}
					});
				});
			});

			console.log(_userAddData.addAccount);

			//发送新增用户请求
			addUser(_userAddData.addAccount);

			UserAddStore.emitChange();
			break;

		default:

	}
});

export default UserAddStore;
