import React from 'react';
import classnames from 'classnames';

const StatisticsGrid = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		explain: React.PropTypes.string,
		theads: React.PropTypes.array.isRequired,
		lists: React.PropTypes.array.isRequired
	},	

	render: function(){
		var ths=[],trs=[];
		this.props.theads.forEach(function(element,index,array){
			var width;
			if(element.width) width=element.width;
			ths.push(<th key={index} width={width}>{element.name}</th>);
		});
		this.props.lists.forEach(function(element,index,array){
			var tds=[];
			for(let props in element){
				tds.unshift(<td key={props}>{element[props]}</td>);
			};
			trs.push(<tr key={index}>{tds}</tr>);
		});

		return <table className="statistic-grid" width={this.props.width}>
			<caption>{this.props.title}<i className="hy-icon info" title={this.props.explain}></i></caption>
			<thead>
				<tr>{ths}</tr>
			</thead>
			<tbody>
				{trs}
			</tbody>
		</table>
	}
});

export default StatisticsGrid;