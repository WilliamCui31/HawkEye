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
		readonly: React.PropTypes.bool
	},

	getInitialState: function(){
		return {
			type: this.props.type||"input"
		}
	},

	render: function(){
		return <input
			id={this.props.id}
			type={this.state.type}
			className={classnames('hy-input',this.props.appearance)}
			placeholder={this.props.placeholder}
			autoFocus={this.props.focus}
			onBlur={this._onBlur}
			defaultValue={this.props.defaultValue}
			disabled={this.props.disabled}
			readOnly={this.props.readonly}
		/>
	},

	_onBlur: function(e){
		this.props.inputAction(e);
	}
});

export default Input;
