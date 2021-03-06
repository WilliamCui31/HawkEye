import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import ControlMenu from '../../components/ControlMenu';
import UserRoleActions from '../../actions/UserRoleActions';
import MainStore from '../../stores/MainStore';
import UserRoleStore from '../../stores/UserRoleStore';
import assign from 'object-assign';

const AssignRights = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		var roleId=this.props.location.query.roleId;
		var roleName=this.props.location.query.roleName;
		return {
			roleId: roleId,
			roleName: roleName,
			roleRights: UserRoleStore.getRoleRights(roleId)
		}
	},

	componentDidMount: function(){
		UserRoleStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserRoleStore.removeChangeListener(this._onChange);
	},

	render: function() {
		//权限树列表
		var roleRights=this.state.roleRights;

		return <div className="hy-section pdg20">

			<ul className="hy-multiline-form clearfix" style={{width: "285px"}}>
				<li>
					<label>角色名称：</label> {this.state.roleName}
				</li>
				<li>
					<ControlMenu
						initialData={roleRights}
						export={this._exportRights}
					/>
				</li>
				<li className="hy-multiline-form-footer clearfix">
					<button className="hy-button secondary pull-left" onClick={this._cancel}>取消</button>
		          	<button className="hy-button default pull-right" onClick={this._confirm}>确认</button>
		        </li>
			</ul>

		</div>

	},

	_onChange: function(){
		//更新视图
		this.setState({
			roleRights: UserRoleStore.getRoleRights(this.state.roleId)
		});
	},

	_cancel: function(){
		this.context.router.push("/userRole");
	},

	_confirm: function(){
		if(this.state.rights){
			UserRoleActions.assignRoleRights(this.state.roleId,this.state.rights);
		}
		this.context.router.push("/userRole");
	},

	_exportRights: function(rights){
		this.state.rights=rights;
	}

});

export default AssignRights;
