import React from 'react';
import classnames from 'classnames';

const Alert = React.createClass({

	propTypes: {
		title: React.PropTypes.string,
		message: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.object]).isRequired,
		confirm: React.PropTypes.func,
		close: React.PropTypes.func.isRequired,
		status: React.PropTypes.string
	},

	getInitialState: function(){
		return {
			title: this.props.title||"温馨提示"
		}
	},

	render: function(){
		var statusIcon;
		if(this.props.status==="success") statusIcon=<i className="hy-icon success"></i>;
		else if(this.props.status==="failure") statusIcon=<i className="hy-icon failure"></i>;

		return (
			<div className="hy-popup">
		      <div className="hy-popup-box">
		        <h1 className="hy-popup-box-header">{this.state.title}<i className="hy-icon fork hy-popup-box-close" onClick={this._close}></i></h1>
		        <p className="hy-popup-box-message">{statusIcon}{this.props.message}</p>
		        <div className="hy-popup-box-footer">
		          <button className="hy-button" onClick={this._confirm}>确认</button>
		        </div>
		      </div>
		    </div>
		)
	},

	_confirm: function(){
		if(this.props.confirm) this.props.confirm();
		this._close();
	},

	_close: function(){
		this.props.close();
	}

});

export default Alert;
