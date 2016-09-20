import React from 'react';
import classnames from 'classnames';

const Select = React.createClass({

	propTypes: {
		id: React.PropTypes.string.isRequired,
		initialData: React.PropTypes.array.isRequired,
		selectAction: React.PropTypes.func.isRequired,
		className: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		defaultValue: React.PropTypes.string
	},

	getInitialState: function(){
		return {
			defaultValue: this.props.defaultValue||'default'
		}
	},

	render: function(){
		var optionsData=this.props.initialData,options=[];
		for(let option of optionsData){
			options.push(<option key={option.id} value={option.id.toString()}>{option.name}</option>);
		}
		return (
			<span className="hy-select-outer">
              <span className="hy-select-inner">
                <select 
                	className={classnames('hy-input',this.props.appearance)} 
                	id={this.props.id} 
                	defaultValue={this.state.defaultValue}
                	onChange={this._onChange}>
                  	<option value="default" disabled hidden>{this.props.placeholder}</option>  
                  	{options}
                </select>
              </span>
            </span>
		)
	},
	
	_onChange: function(e){
		if(e.target.value)
		this.props.selectAction(e);
	}
});

export default Select;