import React from 'react';
import CheckBox from './CheckBox';
import classnames from 'classnames';

const ControlMenu = React.createClass({

	propsTypes: {
		initialData: React.PropTypes.array.isRequired,
		export: React.PropTypes.func.isRequired,
		updateAction: React.PropTypes.func,
		store: React.PropTypes.object
	},

	componentDidMount: function(){
		if(this.props.store) {
			this.props.store.addEventListener("reset",this._onReset);
			this.props.store.addEventListener("update",this._onUpdate);
		}
	},

	componentWillUnmount: function(){
		if(this.props.store) {
			this.props.store.removeEventListener("reset",this._onReset);
			this.props.store.removeEventListener("update",this._onUpdate);
		}
	},

	getInitialState: function(){
		var treeData=this.props.initialData;
		var areAllChecked=true;

		//一级遍历
		treeData.forEach(function(element,index,array){
			var children=element.datas;
			if(element.isChecked!="1") areAllChecked=false;
			//二级遍历
			children.forEach(function(element,index,array){
				var children=element.datas;
				if(element.isChecked!="1") areAllChecked=false;
				//三级遍历
				children.forEach(function(element,index,array){
					if(element.isChecked!="1") areAllChecked=false;
				});
			});
		});

		return {
			treeData: treeData,
			areAllChecked: areAllChecked
		}
	},

	componentDidUpdate: function(){
		var treeData=this.state.treeData;
		var rights=[];
		treeData.forEach(function(element,index,array){
			if(element.isChecked=="1") {
				var right={
					rightId: element.id
				};
				rights.push(right);
			}
			var children=element.datas;
			children.forEach(function(element,index,array){
				if(element.isChecked=="1") {
					var right={
						rightId: element.id
					};
					rights.push(right);
				}
				var children=element.datas;
				children.forEach(function(element,index,array){
					if(element.isChecked=="1") {
						var right={
							rightId: element.id
						};
						rights.push(right);
					}
				})
			});
		});

		this.props.export(rights);
	},

	render: function(){
		var _this=this;
		var level1Data=this.state.treeData,level1Menu=[];

		level1Data.forEach(function(level1) {
			var level2Data=level1.datas,level2Menu=[];
			level2Data.forEach(function(level2) {
				var level3Data=level2.datas,level3Menu=[];
				level3Data.forEach(function(level3) {
					level3Menu.push(<li key={level3.id}>
						<CheckBox
							id={level3.id}
							text={level3.name}
							isChecked={level3.isChecked==1}
							onCheck={_this._onCheck}
						/>
					</li>);
				});

				level2Menu.push(<div key={level2.id} className="control-menu-level2-wrap">
					<div className={classnames("control-menu-level2",level1.spread)}>
						<h1 className="control-menu-tit" data-id={level2.id} onClick={_this._spreadRights}>
							<CheckBox
								id={level2.id}
								text={level2.name}
								hasIcon={true}
								isChecked={level2.isChecked==1}
								onCheck={_this._onCheck}
							/>
							<i className="hy-icon down-arrow" data-id={level2.id} onClick={_this._spreadRights}></i>
						</h1>
						<div className="control-menu-level3-wrap">
							<ul className={classnames("control-menu-level3",level2.spread)}>
								{level3Menu}
							</ul>
						</div>
					</div>
				</div>);
			});

			level1Menu.push(<div key={level1.id} className="control-menu-level1">
				<h1 className="control-menu-tit" data-id={level1.id} onClick={_this._spreadRights}>
					<CheckBox
						id={level1.id}
						text={level1.name}
						hasIcon={true}
						isChecked={level1.isChecked==1}
						onCheck={_this._onCheck}
					/>
					<i className="hy-icon down-arrow" data-id={level1.id} onClick={_this._spreadRights}></i>
				</h1>
				{level2Menu}
			</div>);
		});

		return <div className="control-menu">
			<h1 className="control-menu-header">
				菜单权限：
				<CheckBox
					id={0}
					text="全部勾选"
					isChecked={this.state.areAllChecked}
					onCheck={this._onCheckAll}
				/>
			</h1>
			<div className="control-menu-accordion">
				{level1Menu}
			</div>
		</div>
	},

	_updateRights: function(){
		if(this.props.updateRights) this.props.updateRights();
	},

	_onCheck: function(id,isChecked){
		var treeData=this.state.treeData;
		var checked=isChecked?"0":"1";
		var areAllChecked=true;

		//一级遍历
		treeData.forEach(function(element,index,array){
			var children=element.datas;

			if(element.id==id) {
				element.isChecked=checked;
				children.forEach(function(element,index,array){
					var children=element.datas;
					element.isChecked=checked;
					children.forEach(function(element,index,array){
						element.isChecked=checked;
					});
				});
			}

			//二级遍历
			var firstChecked=false;
			children.forEach(function(element,index,array){
				var children=element.datas;

				if(element.id==id) {
					element.isChecked=checked;
					children.forEach(function(element,index,array){
						element.isChecked=checked;
					});
					firstChecked=true;
				}

				//三级遍历
				var secondeChecked=false;
				children.forEach(function(element,index,array){
					if(element.id==id) {
						element.isChecked=checked;
						secondeChecked=true;
					}
					if(element.isChecked!="1") areAllChecked=false;
				});
				if(secondeChecked) element.isChecked="1";

				if(element.isChecked=="1") firstChecked=true;
				if(element.isChecked!="1") areAllChecked=false;
			});
			if(firstChecked) element.isChecked="1";
			if(element.isChecked!="1") areAllChecked=false;
		});

		this.setState({
			treeData: treeData,
			areAllChecked: areAllChecked
		});

	},

	_onCheckAll: function(e){
		var treeData=this.state.treeData;
		var areAllChecked=this.state.areAllChecked;
		treeData.forEach(function(element,index,array){
			var children=element.datas;
			element.isChecked=areAllChecked?"0":"1";
			children.forEach(function(element,index,array){
				var children=element.datas;
				element.isChecked=areAllChecked?"0":"1";
				children.forEach(function(element,index,array){
					element.isChecked=areAllChecked?"0":"1";
				})
			});
		});

		this.setState({
			treeData:treeData,
			areAllChecked: !areAllChecked
		});
	},

	_spreadRights: function(e){
		e.stopPropagation();

		var rightId=e.target.dataset?e.target.dataset.id:e.target.getAttribute('data-id');
		var treeData=this.state.treeData;
		treeData.forEach(function(element,index,array){
			 if(element.id==rightId) {
				 if(element.spread){
					 delete element.spread;
				 }else{
					 element.spread="spread";
				 }
			 }
			 var children=element.datas;
			 children.forEach(function(element,index,array){
				 if(element.id==rightId) {
					 if(element.spread){
						 delete element.spread;
					 }else{
						 element.spread="spread";
					 }
				 }
			 });
		});

		//更新权限状态
		this.setState({
			treeData: treeData
		});
	},

	_onReset: function(){
		var treeData=this.state.treeData;
		var areAllChecked=false;

		//一级遍历
		treeData.forEach(function(element,index,array){
			var children=element.datas;
			element.isChecked="0"
			//二级遍历
			children.forEach(function(element,index,array){
				var children=element.datas;
				element.isChecked="0"
				//三级遍历
				children.forEach(function(element,index,array){
					element.isChecked="0"
				});
			});
		});

		this.setState({
			treeData: treeData,
			areAllChecked: areAllChecked
		});
	},

	_onUpdate: function(){
		var treeData=this.props.updateAction();
		var areAllChecked=true;

		//一级遍历
		treeData.forEach(function(element,index,array){
			var children=element.datas;
			if(element.isChecked!="1") areAllChecked=false;
			//二级遍历
			children.forEach(function(element,index,array){
				var children=element.datas;
				if(element.isChecked!="1") areAllChecked=false;
				//三级遍历
				children.forEach(function(element,index,array){
					if(element.isChecked!="1") areAllChecked=false;
				});
			});
		});

		this.setState({
			treeData: treeData,
			areAllChecked: areAllChecked
		});
	}

});

export default ControlMenu;
