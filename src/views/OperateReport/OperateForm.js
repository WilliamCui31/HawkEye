import React from 'react';
import Masonry from 'react-masonry-component';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import StatisticsGrid from '../../components/StatisticsGrid';
import OperateFormStore from '../../stores/OperateFormStore';
import OperateFormActions from '../../actions/OperateFormActions';
var masonryOptions = {
    transitionDuration: 0
};

import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = true;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel />;


const SHOW_TIME = true;

const Picker = React.createClass({
  getDefaultProps() {
    return {
      showTime: SHOW_TIME,
      disabled: false,
    };
  },
  render() {
    const props = this.props;
    const calendar = (<Calendar
      locale={cn ? zhCN : enUS}
      defaultValue={now}
      /*timePicker={props.showTime ? timePickerElement : null}*/
      disabledDate={props.disabledDate}
    />);
    return (
			<DatePicker
      animation="slide-up"
      disabled={props.disabled}
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}
    	>
	      {
	        ({ value }) => {
	          return (
	            <span>
                <input
									className="hy-input calendar"
                  placeholder="请选择日期"
                  disabled={props.disabled}
                  value={value && value.format(getFormat(props.showTime)) || ''}
                  onChange={props.onChange}
                />
              </span>
	          );
	        }
	      }
    	</DatePicker>
    );
  },
});

const OperateForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
    var end=moment().subtract(1, 'months');
    end=end.endOf("month");
    var start=end.clone().subtract(2, 'months');
    start=start.startOf("month");
		return {
			startValue: start,
      endValue: end
		}
	},

	componentDidMount: function(){
    var start=this.state.startValue.format(getFormat(SHOW_TIME));
    var end=this.state.endValue.format(getFormat(SHOW_TIME));
    OperateFormActions.queryForm(start,end);
		OperateFormStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		OperateFormStore.removeChangeListener(this._onChange);
	},

	render: function(){
		var	baseComponent,
				activityComponent,
				reinvestComponent,
				terminalComponent,
				productComponent,
				areaComponent,
				sexComponent,
				borrowMoneyComponent,
				borrowTypeComponent,
				incomeComponent,
				onstellationComponent,
				recommendComponent,
				userComponent,
				yearComponent,
				activeUserComponent;
		if(this.state.operateFormData) {
			var operateFormData=this.state.operateFormData;

			//基础数据
			var baseData={
				lists: operateFormData.baseData,
				keys: ["investMoneyTotal","profitMoney","waitProfitMoney","userTotal","repeatInvestRate"]
			};
			baseComponent=<StatisticsGrid
				title="基础数据"
				width="500"
				explain="平台累计数据不以筛选时间为准"
				theads={[{name:"累计交易额"},{name:"已赚取收益"},{name:"待赚取收益"},{name:"累计注册用户"},{name:"复投率"}]}
				data={baseData}
			/>;

			//活动统计
			var activityData={
				lists: operateFormData.activityData,
				keys: ["typeName","totalNumber","usedNumber","usedMoney"]
			};
			activityComponent=<StatisticsGrid
				title="活动统计"
				width="500"
				explain="汇总每个类型的数量以及金额"
				theads={[{name:"类型"},{name:"已发放数量"},{name:"已使用数量"},{name:"已使用总金额"}]}
				data={activityData}
			/>;

			//用户复投次数
      var reinvestData={
      	lists: operateFormData.reinvestData,
      	keys: ["times","user_nums"]
      };
      reinvestComponent=<StatisticsGrid
      	title="用户复投次数"
      	width="500"
      	explain="汇总每个用户投资的次数，统计时间不以筛选统计时间为准"
      	theads={[{name:"投资次数",width:"30%"},{name:"人数"}]}
      	data={reinvestData}
      />;

			//投资终端分布
			var terminalData={
				lists: operateFormData.terminalData,
				keys: ["clinet_type","invest_amount","invest_rate"]
			};
			terminalComponent=<StatisticsGrid
				title="投资终端分布"
				width="500"
				explain="类汇总投资金额/总投资金额"
				theads={[{name:"终端类型"},{name:"投资金额"},{name:"投资金额占比"}]}
				data={terminalData}
			/>;

			//投资产品
			var productData={
				lists: operateFormData.productData,
				keys: ["pro_name","invest_amount","invest_rate"]
			};
			productComponent=<StatisticsGrid
				title="投资产品"
				width="500"
				explain="类汇总投资金额/总投资金额"
				theads={[{name:"产品"},{name:"投资金额"},{name:"投资金额占比"}]}
				data={productData}
			/>;

			//用户性别
			var sexData={
				lists: operateFormData.sexData,
				keys: ["gender","user_nums","invest_amount","invest_amount_rate","invest_user_rate"]
			};
			sexComponent=<StatisticsGrid
				title="用户性别"
				width="500"
				explain="根据投资金额排序"
				theads={[{name:"性别"},{name:"投资人数"},{name:"投资金额"},
               {name:"投资金额占比"},{name:"投资人数占比"}]}
				data={sexData}
			/>;

			//投资区域排行榜
			var areaData={
				lists: operateFormData.areaData,
				keys: ["index","area","invest_amount"]
			};
			areaComponent=<StatisticsGrid
				title="投资区域排行榜"
				width="500"
				explain="汇总每个地区投资金额排序，排名10以外汇总到其他"
				theads={[{name:"排行"},{name:"地区"},{name:"投资金额"}]}
				data={areaData}
			/>;

			//借款用户所在地区
			var borrowMoneyData={
				lists: operateFormData.borrowMoneyData,
				keys: ["orderNo","area","amount","scale"]
			};
			borrowMoneyComponent=<StatisticsGrid
				title="借款用户所在地区"
				width="500"
				explain="汇总每个地区的借款金额，并根据借款金额排序"
				theads={[{name:"排行"},{name:"地区"},{name:"借款金额"},{name:"借款金额占比"}]}
				data={borrowMoneyData}
			/>;

			//借款产品类型
			var borrowTypeData={
				lists: operateFormData.borrowTypeData,
				keys: ["type","userNumber","borowNumber","amount","scale"]
			};
			borrowTypeComponent=<StatisticsGrid
				title="借款产品类型"
				width="500"
				explain=""
				theads={[{name:"借贷产品",width:"15%"},{name:"借款人数",width:"15%"},{name:"借款总次数",width:"20%"},
               {name:"借款总额",width:"30%"},{name:"借款总额占比"}]}
				data={borrowTypeData}
			/>;

			//收益最高
			var incomeData={
				lists: operateFormData.incomeData,
				keys: ["orderNo","realName","mobile","profit"]
			};
			incomeComponent=<StatisticsGrid
				title="收益最高"
				width="500"
				explain="汇总每个用户产生的收益"
				theads={[{name:"排行"},{name:"姓名",width:"15%"},{name:"手机"},{name:"累计收益"}]}
				data={incomeData}
			/>;

			//用户星座
			var onstellationData={
				lists: operateFormData.onstellationData,
				keys: ["constellation_name","invest_user_total","invest_amount","invest_rate"]
			};
			onstellationComponent=<StatisticsGrid
				title="用户星座"
				width="500"
				explain="汇总投资金额排序"
				theads={[{name:"星座"},{name:"投资人数"},{name:"投资金额"},{name:"投资金额占比"}]}
				data={onstellationData}
			/>;

			//推荐投资最多
			var recommendData={
				lists: operateFormData.recommendData,
				keys: ["index","name","mobile","amount"]
			};
			recommendComponent=<StatisticsGrid
				title="推荐投资最多"
				width="500"
				explain="汇总每个用户推荐好友的投资总值排序"
				theads={[{name:"排行"},{name:"姓名",width:"15%"},{name:"手机"},{name:"推荐投资累计"}]}
				data={recommendData}
			/>;

			//用户投资金额排行榜
			var userData={
				lists: operateFormData.userData,
				keys: ["index","name","mobile","invest_amount"]
			};
			userComponent=<StatisticsGrid
				title="用户投资金额排行榜"
				width="500"
				explain="汇总投资金额排序"
				theads={[{name:"排行"},{name:"姓名",width:"15%"},{name:"手机"},{name:"投资总金额"}]}
				data={userData}
			/>;

			//用户年代
			var yearData={
				lists: operateFormData.yearData,
				keys: ["age_years","invest_num","invest_amount","invest_rate"]
			};
			yearComponent=<StatisticsGrid
				title="用户年代"
				width="500"
				explain="汇总每个类型统计"
				theads={[{name:"类型"},{name:"投资人数"},{name:"投资金额"},{name:"投资金额占比"}]}
				data={yearData}
			/>;

			//投资最活跃
			var activeUserData={
				lists: operateFormData.activeUserData,
				keys: ["index","name","mobile","times","profit"]
			};
			activeUserComponent=<StatisticsGrid
				title="投资最活跃"
				width="500"
				explain="汇总每个用户投资的笔数，并根据总笔数排序"
				theads={[{name:"排行"},{name:"姓名",width:"15%"},{name:"手机"},{name:"投资总笔数"},{name:"累计收益"}]}
				data={activeUserData}
			/>;

		}
		const state = this.state;
		return <div>
			<div className="hy-panel">
        <ul className="hy-inline-form clearfix">
          <li>
          	<label>统计时间：</label>
						<Picker
		          disabledDate={this.disabledStartDate}
		          value={state.startValue}
		          onChange={this._pickDate.bind(this, 'startValue')}
		        />
          	<span style={{padding: "0 10px"}}>至</span>
						<Picker
		          disabledDate={this.disabledEndDate}
		          value={state.endValue}
		          onChange={this._pickDate.bind(this, 'endValue')}
		        />
          </li>
          <li><button className="hy-button query-button" onClick={this._queryForm}>查询</button></li>
        </ul>
	    </div>

      <Masonry
        className={'my-gallery-class hy-section pdg20'}
        elementType={'ul'}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        style={{paddingRight: "0px"}}
      >
        <li>{userComponent}</li>
        <li>{recommendComponent}</li>
        <li>{activeUserComponent}</li>
        <li>{incomeComponent}</li>
        <li>{reinvestComponent}</li>
        <li>{onstellationComponent}</li>
        <li>{areaComponent}</li>
        <li>{borrowMoneyComponent}</li>
        <li>{yearComponent}</li>
        <li>{borrowTypeComponent}</li>
        <li>{productComponent}</li>
        <li>{terminalComponent}</li>
        <li>{sexComponent}</li>
        <li>{activityComponent}</li>
        <li>{baseComponent}</li>
      </Masonry>

	   	{this.state.popup}

    </div>
	},

	_onChange: function(){
		this.setState({operateFormData: OperateFormStore.getOperateFormData()});
	},

	_pickDate(field, value) {
    this.setState({
      [field]: value,
    });
  },

	isabledEndDate(endValue) {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) :
    endValue.diff(startValue, 'days') <= 0;
  },

  disabledStartDate(startValue) {
    if (!startValue) {
      return false;
    }
    const endValue = this.state.endValue;
    if (!endValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) :
    endValue.diff(startValue, 'days') <= 0;
  },

	_queryForm: function(){
		var message,alertPopup;
		if(!this.state.startValue){
			message=<span>请选择开始日期!</span>;
			alertPopup=<Alert
				message={message}
				close={this._closePopup}
			/>;
			this.setState({popup: alertPopup});
		}else if(!this.state.endValue){
			message=<span>请选择结束日期!</span>;
			alertPopup=<Alert
				message={message}
				close={this._closePopup}
			/>;
			this.setState({popup: alertPopup});
		}else {
			var start=this.state.startValue.format(getFormat(SHOW_TIME));
			var end=this.state.endValue.format(getFormat(SHOW_TIME));
			OperateFormActions.queryForm(start,end);
		}
	},

	_closePopup: function(){
		this.setState({popup: null});
	}

});

export default OperateForm;
