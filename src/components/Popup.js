import React from 'react';
import classnames from 'classnames';

const Popup = React.createClass({

	propTypes: {
		title: React.PropType.string
	},	

	getInitialState: function(){
		return {
			type: this.props.type||"input"
		}
	},

	render: function(){
		return (
			<div className="hy-popup">
		      <div className="hy-popup-box">
		        <h1 className="hy-popup-box-header">{this.props.title}<i className="hy-icon fork hy-popup-box-close"></i></h1>
		        
		        <div className="hy-popup-box-footer">
		          <button className="hy-button secondary">取消</button>
		          <button className="hy-button">确认</button>
		        </div>
		      </div>
		    </div>
		)
	}

});

export default Popup;