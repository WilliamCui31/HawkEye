import React from 'react';
import classnames from 'classnames';

const StatisticsGrid = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		explain: React.PropTypes.string,
		theads: React.PropTypes.array.isRequired,
		data: React.PropTypes.object.isRequired
	},

	render: function(){
		var ths=[],
				trs=[],
				lists=this.props.data.lists,
				keys=this.props.data.keys;

		this.props.theads.forEach(function(element,index,array){
			var width;
			if(element.width) width=element.width;
			ths.push(<th key={index} width={width}>{element.name}</th>);
		});
		if(lists&&Array.isArray(lists)&&lists.length>0){
			lists.forEach(function(element,index,array){
				var tds=[];
				keys.forEach(function(key){
					if(key==="index"){
						tds.push(<td key={key}>{index+1}</td>);
					}else{
						var value=element?element[key]:"";
						tds.push(<td key={key}>{value}</td>);
					}
				});
				trs.push(<tr key={index}>{tds}</tr>);
			});
		}

		var explain;
		if(this.props.explain) explain=<span className="statistic-grid-explain">（{this.props.explain}）</span>;
		return <table className="statistic-grid" width={this.props.width}>
			<caption>{this.props.title} {explain}</caption>
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
