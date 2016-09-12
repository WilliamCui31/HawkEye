import React from 'react';
import CheckBox from './CheckBox';

const ControlMenu = React.createClass({

	propsTypes: {
		initialData: React.PropTypes.array.isRequired,
		checkHandle: React.PropTypes.object.isRequired,
		checkAllHandle: React.PropTypes.object.isRequired,
		areAllRightChecked: React.PropTypes.bool.isRequired
	},

	render: function(){
		var level1Data=this.props.initialData,level1Menu=[];
		var action=this.props.action;

		for(let level1 of level1Data) {
			var level2Data=level1.datas,level2Menu=[];
			for(let level2 of level2Data) {
				var level3Data=level2.datas,level3Menu=[];
				for(let level3 of level3Data) {
					level3Menu.push(<li key={level3.id}><CheckBox id={level3.id} text={level3.name} isChecked={level3.isChecked==1} onCheck={this._onCheck} /></li>);
				}

				level2Menu.push(<div key={level2.id} className="control-menu-level2">
					<h1 className="control-menu-tit">
						<CheckBox id={level2.id} text={level2.name} hasIcon={true} isChecked={level2.isChecked==1} onCheck={this._onCheck} />
						<i className="hy-icon down-arrow"></i>
					</h1>
					<ul className="control-menu-level3">
						{level3Menu}
					</ul>
				</div>);
			}

			level1Menu.push(<div key={level1.id} className="control-menu-level1">
				<h1 className="control-menu-tit">
					<CheckBox id={level1.id} text={level1.name} hasIcon={true} isChecked={level1.isChecked==1} onCheck={this._onCheck} />
					<i className="hy-icon down-arrow"></i>
				</h1>
				{level2Menu}
			</div>);
		}

		return <div className="control-menu">
			<h1 className="control-menu-header">
				菜单权限：<CheckBox id={0} text="全部勾选" isChecked={this.props.areAllRightChecked} onCheck={this._onCheckAll} />
			</h1>
			<div className="control-menu-accordion">
				{level1Menu}
			</div>
		</div>
	},

	_onCheck: function(id,isChecked){
		this.props.checkHandle(id,isChecked);
	},

	_onCheckAll: function(e){
		this.props.checkAllHandle(!this.props.areAllRightChecked);
	}
	
});

export default ControlMenu;