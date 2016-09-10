import React from 'react';
import classnames from 'classnames';

const Input = React.createClass({

	propTypes: {
		id: React.PropTypes.string.isRequired,
		inputAction: React.PropTypes.func.isRequired,
		type: React.PropTypes.string,
		appearance: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		focus: React.PropTypes.bool
	},	

	getInitialState: function(){
		return {
			type: this.props.type||"input"
		}
	},

	render: function(){
		return (
			<input 
				id={this.props.id}
				type={this.state.type}
				className={classnames('hy-input',this.props.appearance)}
				placeholder={this.props.placeholder}
				autoFocus={this.props.focus}
				onBlur={this._onBlur}
			/>
		)
	},
	
	_onBlur: function(e){
		this.props.inputAction(this.props.id,e.target.value);
	}
});

export default Input;