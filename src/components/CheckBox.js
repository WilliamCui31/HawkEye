import React from 'react';
import classnames from 'classnames';

const CheckBox = React.createClass({

	propTypes: {
		id: React.PropTypes.number.isRequired,
		onCheck: React.PropTypes.func,
		appearance: React.PropTypes.string,
		text: React.PropTypes.string,
		isChecked: React.PropTypes.bool,
		hasIcon: React.PropTypes.bool
	},

	render: function(){
		var checkedClass=this.props.isChecked?"checked":""
		var icon=this.props.hasIcon?(<i className="hy-icon down-triangle"></i>):null;
		return (
			<label 
				className={classnames('hy-checkbox',this.props.appearance,checkedClass)} 
				id={this.props.id}
				onClick={this._onCheck}>
				{icon}
				{this.props.text}
			</label>
		)
	},
	
	_onCheck: function(e){
		this.props.onCheck(e.target.id,this.props.isChecked);
	}
});

export default CheckBox;