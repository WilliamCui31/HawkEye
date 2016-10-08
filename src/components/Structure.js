import React from 'react';
import CheckBox from './CheckBox';
import classnames from 'classnames';

const Structure = React.createClass({

	propsTypes: {
		initialData: React.PropTypes.array.isRequired,
		export: React.PropTypes.func.isRequired
	},

	getInitialState: function(){
		var treeData=this.props.initialData;
		var areAllChecked=true;
		treeData.forEach(function(element,index,array){
			var children=element.users;
			//二级遍历
			var secondeAllChecked=true;
			children.forEach(function(element,index,array){
				if(element.isChecked!="1") secondeAllChecked=false;
			});
			if(secondeAllChecked) element.isChecked="1";
			if(element.isChecked!="1") areAllChecked=false;
		});
		return {
			treeData: treeData,
			areAllChecked: areAllChecked
		}
	},

	componentDidUpdate: function(){
		var treeData=this.state.treeData;
		var users=[];
		treeData.forEach(function(element,index,array){
			var children=element.users;
			children.forEach(function(element,index,array){
				if(element.isChecked=="1") {
					var user={
						userId: element.id
					};
					users.push(user);
				}
			});
		});
		this.props.export(users);
	},

	render: function(){
		var _this=this;
		var level1Data=this.state.treeData,level1Menu=[];
		var action=this.props.action;

		level1Data.forEach(function(level1) {
			var level2Data=level1.users,level2Menu=[];
			level2Data.forEach(function(level2) {
				level2Menu.push(<div key={level2.id} className="control-menu-level2-wrap">
					<div key={level2.id} className={classnames("control-menu-level2",level1.spread)}>
						<h1 className="control-menu-tit">
							<CheckBox id={level2.id} text={level2.name} isChecked={level2.isChecked==1} onCheck={_this._onCheck} />
						</h1>
					</div>
				</div>);
			});

			level1Menu.push(<div key={level1.id} className="control-menu-level1">
				<h1 className="control-menu-tit" data-id={level1.id} onClick={_this._spreadDepart}>
					<CheckBox id={level1.id} text={level1.deptName} hasIcon={true} isChecked={level1.isChecked==1} onCheck={_this._onCheck} />
					<i className="hy-icon down-arrow" data-id={level1.id} onClick={_this._spreadDepart}></i>
				</h1>
				{level2Menu}
			</div>);
		});

		return <div className="control-menu" style={{margin: "0 auto"}}>
			<h1 className="control-menu-header">
				<CheckBox id={0} text="全部勾选" isChecked={this.state.areAllChecked} onCheck={this._onCheckAll} />
			</h1>
			<div className="control-menu-accordion">
				{level1Menu}
			</div>
		</div>
	},

	_onCheck: function(id,isChecked){
		var treeData=this.state.treeData;
		var checked=isChecked?"0":"1";
		var areAllChecked=true;

		//一级遍历
		treeData.forEach(function(element,index,array){
			var children=element.users;

			if(element.id==id) {
				element.isChecked=checked;
				children.forEach(function(element,index,array){
					element.isChecked=checked;
				});
			}

			//二级遍历
			var secondeDropOff=false;
			var secondeAllChecked=true;
			children.forEach(function(element,index,array){
				if(element.id==id) element.isChecked=checked;
				if(element.isChecked!="1") {
					secondeDropOff=true;
					secondeAllChecked=false;
					areAllChecked=false;
				}
			});
			if(secondeDropOff) element.isChecked="0";
			if(secondeAllChecked) element.isChecked="1";
			if(element.isChecked!="1") {
				areAllChecked=false;
			}
		});

		this.setState({
			treeData: treeData,
			areAllChecked: areAllChecked
		});
	},

	_onCheckAll: function(e){
		//全选
		var treeData=this.state.treeData;
		var areAllChecked=this.state.areAllChecked;
		treeData.forEach(function(element,index,array){
			var children=element.users;
			element.isChecked=areAllChecked?"0":"1";
			children.forEach(function(element,index,array){
				element.isChecked=areAllChecked?"0":"1";
			});
		});

		this.setState({
			treeData:treeData,
			areAllChecked: !areAllChecked
		})
	},

	_spreadDepart: function(e){
		e.stopPropagation();

		var departId=e.target.dataset?e.target.dataset.id:e.target.getAttribute('data-id');
		var treeData=this.state.treeData;
		treeData.forEach(function(element,index,array){
			 if(element.id==departId) {
				 if(element.spread){
					 delete element.spread;
				 }else{
					 element.spread="spread";
				 }
			 }
		});

		//更新权限状态
		this.setState({
			treeData: treeData
		});
	}

});

export default Structure;
