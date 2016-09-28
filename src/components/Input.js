import React from 'react';
import classnames from 'classnames';

const Input = React.createClass({

	propTypes: {
		id: React.PropTypes.string,
		inputAction: React.PropTypes.func,
		type: React.PropTypes.string,
		defaultValue: React.PropTypes.string,
		appearance: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		focus: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		readonly: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		onKeyUp: React.PropTypes.func,
		onKeyDown: React.PropTypes.func
	},

	getInitialState: function(){
		return {
			value: this.props.defaultValue || ""
		}
	},

	render: function(){
		var type=this.props.type||"input";
		return <span>
			<input
				id={this.props.id}
				type={type}
				className={classnames('hy-input',this.props.appearance)}
				placeholder={this.props.placeholder}
				autoFocus={this.props.focus}
				onBlur={this._onBlur}
				onChange={this._onChange}
				onKeyDown={this._onKeyDown}
				onKeyUp={this._onKeyUp}
				value={this.state.value}
				disabled={this.props.disabled}
				readOnly={this.props.readonly}
			/>
		</span>

	},

	_onBlur: function(e){
		this.props.inputAction(e);
	},

	_onChange: function(e){
		this.setState({value: e.target.value});
	},

	_onKeyUp: function(e){
		if(this.props.onKeyUp) this.props.onKeyUp(e);
	},

	_onKeyDown: function(e){
		if(this.props.onKeyDown) this.props.onKeyDown(e);
	}

});

export default Input;
