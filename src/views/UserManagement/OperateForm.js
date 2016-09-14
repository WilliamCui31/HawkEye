import React from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import StatisticsGrid from '../../components/StatisticsGrid';
import OperateFormStore from '../../stores/OperateFormStore';
import OperateFormActions from '../../actions/OperateFormActions';

const OperateForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		return {
			start: "2015-8-10",
			end: "2016-9-10"
		}
	},

	componentDidMount: function(){
		OperateFormStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		OperateFormStore.removeChangeListener(this._onChange);
	},

	render: function(){
		var reinvestComponent,
			terminalComponent,
			productComponent;
		console.log("1111111111111111",this.state.operateFormData);
		if(this.state.operateFormData) {
			var operateFormData=this.state.operateFormData;

			//用户复投次数
			var reinvestData=operateFormData.reinvestData;
			reinvestComponent=<StatisticsGrid 
				title="用户复投次数" 
				width="400"
				explain="汇总每个用户投资的次数，统计时间不以筛选统计时间为准"
				theads={[{name:"投资次数",width:"50%"},{name:"人数"}]}
				lists={reinvestData}
			/>;

			//投资终端分布
			var terminalData=operateFormData.terminalData;
			terminalComponent=<StatisticsGrid 
				title="投资终端分布" 
				width="400"
				explain="类汇总投资金额/总投资金额"
				theads={[{name:"产品",width:"30%"},{name:"投资金额",width:"30%"},{name:"投资金额占比"}]}
				lists={terminalData}
			/>

			//投资产品
			var productData=operateFormData.productData;
			productComponent=<StatisticsGrid 
				title="投资产品" 
				width="400"
				explain="类汇总投资金额/总投资金额"
				theads={[{name:"产品",width:"30%"},{name:"投资金额",width:"30%"},{name:"投资金额占比"}]}
				lists={productData}
			/>
		}
		return <div>
			<div className="hy-panel">
		        <ul className="hy-inline-form clearfix">
		          <li>
		          	<label>统计时间：</label>
		          	<Input appearance="primary" id="start" inputAction={this._inputData} defaultValue="2015-8-10" />
		          	<span style={{padding: "0 10px"}}>至</span>
		          	<Input appearance="primary" id="end" inputAction={this._inputData} defaultValue="2016-9-10" />
		          </li>
		          <li><button className="hy-button query-button" onClick={this._queryForm}>查询</button></li>
		        </ul>
		    </div>

		    <div className="hy-section pdg20">
				
				{reinvestComponent}
				{terminalComponent}
				{productComponent}
				
		    </div>

		   	{this.state.popup}

	    </div>
	},

	_onChange: function(){
		this.setState({operateFormData: OperateFormStore.getOperateFormData()});
	},

	_inputData: function(id,value){
		this.state[id]=value;
	},

	_queryForm: function(){
		var message,alertPopup;
		if(!this.state.start){
			message=<span>请输入开始时间!</span>;
			alertPopup=<Alert 
				message={message}
				close={this._closePopup}
			/>;			
			this.setState({popup: alertPopup});
		}else if(!this.state.end){
			message=<span>请输入结束时间!</span>;
			alertPopup=<Alert 
				message={message}
				close={this._closePopup}
			/>;			
			this.setState({popup: alertPopup});
		}else {
			OperateFormActions.queryForm(this.state.start,this.state.end);
		}
	},

	_closePopup: function(){
		this.setState({popup: null});
	}

});

export default OperateForm;