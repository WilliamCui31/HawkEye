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
			value: this.props.defaultValue||""
		}
	},

	render: function(){
		var optionsData=this.props.initialData,options=[];
		var _this=this;
		optionsData.forEach(function(option){
			options.push(<li key={option.id} value={option.id.toString()} onMouseDown={_this._onSelect}>{option.name}</li>);
		});
		return (
			<div className="hy-select-wrap">
          <input
          	className={classnames('hy-select',this.props.appearance)}
          	id={this.props.id}
          	value={this.state.value}
						onFocus={this._onSlide}
						onBlur={this._onBlur}
						placeholder={this.props.placeholder}
						readOnly
					/>
					<span className="hy-select-triangle" onClick={this._onFocus}></span>
					<div className="hy-select-options-wrap">
						<ul className={classnames('hy-select-options',this.state.slide)}>{options}</ul>
					</div>
      </div>
		)
	},

	_onSelect: function(e){
		this.setState({value: e.target.innerText});
		if(e.target.value){
			this.props.selectAction(this.props.id,e.target.value);
		}
	},

	_onSlide: function(){
		if(this.state.slide) this.setState({slide: ""});
		else this.setState({slide: "slide"});
	},

	_onBlur: function(){
		this.setState({slide: ""});
	},

	_onFocus: function(){
		if(!this.state.slide) document.getElementById(this.props.id).focus();
	}
});

export default Select;
