import React from 'react';
import classnames from 'classnames';

const Confirm = React.createClass({

	propTypes: {
		title: React.PropTypes.string,
		message: React.PropTypes.object.isRequired,
		confirm: React.PropTypes.func.isRequired,
		close: React.PropTypes.func.isRequired,
		cancel: React.PropTypes.func,
	},	

	render: function(){
		var title=this.props.title||"确认";

		return (
			<div className="hy-popup">
		      <div className="hy-popup-box">
		        <h1 className="hy-popup-box-header">{title}<i className="hy-icon fork hy-popup-box-close" onClick={this._close}></i></h1>
		        <div className="hy-popup-box-message">{this.props.message}</div>
		        <div className="hy-popup-box-footer">
		          <button className="hy-button secondary" onClick={this._cancel}>取消</button>
		          <button className="hy-button" onClick={this._confirm}>确认</button>
		        </div>
		      </div>
		    </div>
		)
	},

	_confirm: function(){
		this.props.confirm();
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

export default Confirm;