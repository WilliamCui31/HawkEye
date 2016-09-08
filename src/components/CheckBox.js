import React from 'react';
import classnames from 'classnames';

const CheckBox = React.createClass({

	propTypes: {
		id: React.PropTypes.number.isRequired,
		updateAction: React.PropTypes.func,
		appearance: React.PropTypes.string,
		text: React.PropTypes.string,
		checked: React.PropTypes.bool,
		hasIcon: React.PropTypes.bool
	},

	getInitialState: function(){
		return {
			checked: this.props.checked?"checked":""
		}
	},

	render: function(){
		var icon=this.props.hasIcon?(<i className="hy-icon down-triangle"></i>):null;
		return (
			<label 
				className={classnames('hy-checkbox',this.props.appearance,this.state.checked)} 
				id={this.props.id}
				onClick={this._onCheck}>
				{icon}
				{this.props.text}
			</label>
		)
	},
	
	_onCheck: function(e){
		if(this.state.checked){
			this.setState({checked: ""});
		}else{
			this.setState({checked: "checked"});
		}
		
		//this.props.updateAction(this.props.id,e.target.value);
	}
});

export default CheckBox;