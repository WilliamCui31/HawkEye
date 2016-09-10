import React from 'react';
import classnames from 'classnames';

const Paging = React.createClass({

	propTypes: {
		pageSize: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		totalPage: React.PropTypes.number.isRequired,
		switchPageAction: React.PropTypes.func.isRequired
	},

	render: function(){

		var prevDisabled=this.props.currentPage===1?"disabled":"";
		var nextDisabled=this.props.currentPage===this.props.totalPage?"disabled":"";

		return (
			<div className="hy-paging">
	            <span className="hy-paging-desc">当页共{this.props.pageSize}条数据</span>
	            <button 
	            	className={classnames("hy-paging-button","prev",prevDisabled)} 
	            	onClick={this._prevPage}>
	           	</button>
	            <span className="hy-paging-number">{this.props.currentPage}/{this.props.totalPage}</span>
	            <button 
	            	className={classnames("hy-paging-button","next",nextDisabled)} 
	            	onClick={this._nextPage}>
	            </button>
	        </div>
		)
	},
	
	_prevPage: function(){
		if(this.props.currentPage>1) {
			var pageIndex=this.props.currentPage-1;
			this.props.switchPageAction(pageIndex);
		}
	},

	_nextPage: function(){
		if(this.props.currentPage<this.props.totalPage) {
			var pageIndex=this.props.currentPage+1;
			this.props.switchPageAction(pageIndex);
		}
	}

});

export default Paging;