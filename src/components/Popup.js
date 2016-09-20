import React from 'react';
import classnames from 'classnames';

const Popup = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		content: React.PropTypes.object.isRequired,
		close: React.PropTypes.func.isRequired,
		confirm: React.PropTypes.func
	},	

	getInitialState: function(){
		return {}
	},

	render: function(){
		return (
			<div className="hy-popup">
		      <div className="hy-popup-box">
		        <h1 className="hy-popup-box-header">{this.props.title}<i className="hy-icon fork hy-popup-box-close" onClick={this._close}></i></h1>
		        <div className="hy-popup-box-cont">{this.props.content}</div>
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

export default Popup;