import React from 'react';
import ajax from '../../ajax';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import GlobalActions from '../../actions/GlobalActions';
import GlobalStore from '../../stores/GlobalStore';

const ResetPassword = React.createClass({

	getInitialState: function(){
		return {
			accountName: GlobalStore.getUserInfo().name
		}
	},

	componentDidMount: function(){
		GlobalStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		GlobalStore.removeChangeListener(this._onChange);
	},

	render: function(){
		return <div className="hy-section pdg20">
			<ul className="hy-multiline-form clearfix">
				<li><label>当前用户：</label>{this.state.accountName}</li>
				<li><label>当前密码：</label><Input type="password" appearance="primary" id="cpwd" inputAction={this._inputData} /></li>
				<li><label>新密码：</label><Input type="password" appearance="primary" id="newPwd" inputAction={this._inputData} /></li>
				<li><label>确认密码：</label><Input type="password" appearance="primary" id="rePwd" inputAction={this._inputData} /></li>
				<li className="hy-multiline-form-footer">
					<label>&nbsp;</label>
					<button className="hy-button" onClick={this._resetPassword}>确认</button>
				</li>
			</ul>
			{this.state.popup}
		</div>
	},

	_onChange: function(){
		var rePasswordBack=GlobalStore.resetPasswordfeedback();
		var message,status,resetPasswordPopup;
		if(rePasswordBack.status){
			message=<span>密码重置成功!</span>;
			status="success";
		}else{
			message=<span>{rePasswordBack.msg}!</span>;
			status="failure";
		}
		resetPasswordPopup=<Alert 
			title="重置密码"
			message={message}
			status={status}
			close={this._closePopup}
		/>;
		
		//更新视图
		this.setState({popup: resetPasswordPopup});
	},

	_inputData: function(e) {
		this.state[e.target.id]=e.target.value;
	},

	_resetPassword: function(){
		var message,resetPasswordPopup;
		if(this.state.newPwd!==this.state.rePwd){
			message=<span>新密码两次输入不一致，请重试!</span>;
			resetPasswordPopup=<Alert 
				title="重置密码"
				message={message}
				status={status}
				close={this._closePopup}
			/>;			
			this.setState({popup: resetPasswordPopup});
		}else {
			GlobalActions.resetPassword(this.state.cpwd,this.state.newPwd);
		}
	},

	_closePopup: function(){
		this.setState({popup: null});
	}

});

export default ResetPassword;