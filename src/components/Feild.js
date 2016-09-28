import React from 'react';
import classnames from 'classnames';

const Feild = React.createClass({

	propTypes: {
		id: React.PropTypes.string,
		label: React.PropTypes.string,
		type: React.PropTypes.string,
		inputAction: React.PropTypes.func,
		defaultValue: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		focus: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		validation: React.PropTypes.func,
		validateFailure: React.PropTypes.string
	},

	getInitialState: function(){
		return {
			value: this.props.defaultValue || ""
		}
	},

	render: function(){
		var type=this.props.type||"input";
		var feedback;
		if(this.state.status){
		  if(this.state.status==="success"){
		    feedback=<span className="hy-feild-status success"></span>;
		  }else if(this.state.status==="wrong"){
		    feedback=<span className="hy-feild-status wrong">{this.props.wrong}</span>;
		  }else if(this.state.status==="failure"){
		    feedback=<span className="hy-feild-status wrong">{this.props.validateFailure}</span>;
		  }else if(this.state.status==="warn"){
		    feedback=<span className="hy-feild-status warn">{this.props.label}不能为空</span>;
		  }
		}
		return <li className="hy-feild">
			<label>{this.props.label}：</label>
			<input
				id={this.props.id}
				type={type}
				className={classnames("hy-input primary",this.state.status==="failure"?"wrong":this.state.status)}
				placeholder={this.props.placeholder}
				autoFocus={this.props.focus}
				onBlur={this._onBlur}
				onChange={this._onChange}
				defaultValue={this.props.defaultValue}
			/>
			{feedback}
		</li>
	},

	_onBlur: function(e){
		var value="";
		if(e.target.value==="") {
			this.setState({status: "warn"});
		}else if(this.props.pattern&&!this.props.pattern.test(e.target.value)){
		  this.setState({status: "wrong"});
		}else if(this.props.validation&&!this.props.validation(e)){
			this.setState({status: "failure"});
		}else{
			this.setState({status: "success"});
			value=e.target.value;
		}

		if(this.props.inputAction) this.props.inputAction(this.props.id,value);
	},

	_onChange: function(e){
		this.setState({value: e.target.value});
	}

});

export default Feild;
