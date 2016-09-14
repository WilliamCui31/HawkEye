import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import ControlMenu from '../../components/ControlMenu';
import UserRoleActions from '../../actions/UserRoleActions';
import GlobalStore from '../../stores/GlobalStore';
import UserRoleStore from '../../stores/UserRoleStore';
import assign from 'object-assign';

const AssignRights = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		return {
			roleRights: UserRoleStore.getRoleRights(),
			role: UserRoleStore.getRole(),
			areAllRightChecked: UserRoleStore.areAllRightChecked()
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
					<label>角色名称：</label> {this.state.role.name}
				</li>
				<li>
					<ControlMenu 
						initialData={roleRights} 
						checkHandle={UserRoleActions.checkRoleRight} 
						checkAllHandle={UserRoleActions.checkAllRoleRights} 
						areAllRightChecked={this.state.areAllRightChecked}
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
			roleRights: UserRoleStore.getRoleRights(),
			role: UserRoleStore.getRole(),
			areAllRightChecked: UserRoleStore.areAllRightChecked()
		});
	},

	_cancel: function(){
		this.context.router.push("/userRole");
	},

	_confirm: function(){
		UserRoleActions.assignRoleRights(this.state.role.id);
		this.context.router.push("/userRole");
	}

});

export default AssignRights;