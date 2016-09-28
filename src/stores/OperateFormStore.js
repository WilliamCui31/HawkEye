import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import MainStore from '../stores/MainStore';
import OperateFormConstants from '../constants/OperateFormConstants';
import assign from 'object-assign';
import ajax from '../common/ajax';

const CHANGE_EVENT='change';

var _operateFormData={}

function queryForm(start,end){
	var requireData={
		start: start,
		end: end
	};

	//活动统计
	query("activityData","/eye/operatorReport/v1/activityStatistic.json",requireData);

	//基础数据统计
	query("baseData","/eye/operatorReport/v1/baseStatistic.json",requireData);

	//用户星座
	query("onstellationData","/eye/operatorReport/v1/getInvestDataByXz.json",requireData);

	//终端分布
	query("terminalData","/eye/operatorReport/v1/getInvestDataByClient.json",requireData);

	//地区投资列表
	query("areaData","/eye/operatorReport/v1/getInvestDataByArea.json",requireData);

	//用户年代投资列表
	query("yearData","/eye/operatorReport/v1/getInvestDataByAgeYear.json",requireData);

	//用户投资列表
	query("userData","/eye/operatorReport/v1/getInvestDataByUser.json",requireData);

	//产品投资列表
	query("productData","/eye/operatorReport/v1/getInvestDataByProduct.json",requireData);

	//用户复投次数统计
	query("reinvestData","/eye/operatorReport/v1/getInvestDataByFuT.json",requireData);

	//用户收益统计
	query("incomeData","/eye/operatorReport/v1/userProfitStatitic.json",requireData);

	//用户性别统计
	query("sexData","/eye/operatorReport/v1/getInvestDataBySex.json",requireData);

	//推荐排行
	query("recommendData","/eye/operatorReport/v1/getEyeRecommend.json",requireData);

	//借款金额排行统计
	query("borrowMoneyData","/eye/operatorReport/v1/borrowMoneyStatitic.json",requireData);

	//借款类型统计
	query("borrowTypeData","/eye/operatorReport/v1/borrowTypeStatitic.json",requireData);

	//投资最活跃
	query("activeUserData","/eye/operatorReport/v1/getInveUserByTimes.json",requireData);

}

function query(queryData,queryURL,requireData){
	ajax({
		url: queryURL,
		data: requireData,
		success: function(data) {
			_operateFormData[queryData]=data.data;
			OperateFormStore.emitChange();
		}
	});
}


const OperateFormStore=assign({},EventEmitter.prototype,{

	getOperateFormData: function(){
		return _operateFormData;
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
		case OperateFormConstants.QUERY_FORM:
			//按时间区间查询运营报表
			queryForm(action.start,action.end);
			break;

		default:
	}
});

export default OperateFormStore;
