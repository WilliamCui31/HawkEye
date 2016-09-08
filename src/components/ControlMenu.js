var React = require('react');

var ControlMenu = React.createClass({

	propsTypes: {
		rights: React.PropTypes.array.isRequired
	},

	render: function(){

		var level1Data=this.props.rights,level1Menu=[];

		for(let level1 of level1Data) {
			var level2Data=level1.datas,level2Menu=[];
			for(let level2 of level2Data) {
				var level3Data=level2.datas,level3Menu=[];
				for(let level3 of level3Data) {
					level3Menu.push(<li key={level3.id}><label className="hy-checkbox" id={level3.id}>{level3.name}</label></li>);
				}

				level2Menu.push(<div key={level2.id} className="control-menu-level2">
					<h1 className="control-menu-tit">
						<label className="hy-checkbox" id={level2.id}><i className="hy-icon down-triangle"></i>{level2.name}</label>
						<i className="hy-icon down-arrow"></i>
					</h1>
					<ul className="control-menu-level3">
						{level3Menu}
					</ul>
				</div>);
			}

			level1Menu.push(<div key={level1.id} className="control-menu-level1">
				<h1 className="control-menu-tit">
					<label className="hy-checkbox" id={level1.id}><i className="hy-icon down-triangle"></i>{level1.name}</label>
					<i className="hy-icon down-arrow"></i>
				</h1>
				{level2Menu}
			</div>);
		}

		return <div className="control-menu">
			<h1 className="control-menu-header">
				菜单权限：<label className="hy-checkbox">全部勾选</label>
			</h1>
			<div className="control-menu-accordion">
				{level1Menu}
			</div>
		</div>
	}
	
});

module.exports=ControlMenu;