import React from 'react';
import Input from './Input';
import classnames from 'classnames';

const Prompt = React.createClass({

	propTypes: {
		title: React.PropTypes.string,
		name: React.PropTypes.string.isRequired,
		message: React.PropTypes.object,
		confirm: React.PropTypes.func.isRequired,
		close: React.PropTypes.func.isRequired,
		cancel: React.PropTypes.func,
	},

	getInitialState: function(){
		return {input: ""}
	},

	render: function(){
		var title=this.props.title||"提示";

		return (
			<div className="hy-popup">
		      <div className="hy-popup-box">
		        <h1 className="hy-popup-box-header">{title}<i className="hy-icon fork hy-popup-box-close" onClick={this._close}></i></h1>
		        <div className="hy-popup-box-message">
		        	<label style={{marginRight: "10px"}}>{this.props.name}:</label>
					<Input appearance="primary" id="input" inputAction={this._inputValue} />
		        	{this.props.message}
		        </div>
		        <div className="hy-popup-box-footer">
		          <button className="hy-button secondary" onClick={this._cancel}>取消</button>
		          <button className="hy-button" onClick={this._confirm}>确认</button>
		        </div>
		      </div>
		    </div>
		)
	},

	_inputValue: function(id,value){
		this.state.input=value;
	},

	_confirm: function(){
		this.props.confirm(this.state.input);
		this._close();
	},

	_cancel: function(){
		if(this.props.cancel) this.props.cancel();
		this._close();
	},

	_close: function(){
		this.props.close();
	}

});

export default Prompt;