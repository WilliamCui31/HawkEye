import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import ControlMenu from '../../components/ControlMenu';
import UserAddStore from '../../stores/UserAddStore';
import UserAddActions from '../../actions/UserAddActions';

const UserAdd = React.createClass({

	getInitialState: function(){
		return {
			userAddData: UserAddStore.getData(),
			areAllRightChecked: UserAddStore.areAllRightChecked()
		}
	},

	componentDidMount: function(){
		UserAddStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserAddStore.removeChangeListener(this._onChange);
	},

	render: function(){
		//部门列表
		var departmentData=this.state.userAddData.departMents;
		var roleData=this.state.userAddData.roles,roles=[];
		var rightData=this.state.userAddData.rights;

		for(let role of roleData){
			roles.push(<option key={role.id} value={role.id}>{role.name}</option>);
		}

		return <div className="hy-section pdg20">

	    	<ul className="hy-multiline-form clearfix">
	          <li><label>用户名：</label><Input appearance="primary" id="name" updateAction={UserAddActions.updateData} /></li>
	          <li><label>姓名：</label><Input appearance="primary" id="realName" updateAction={UserAddActions.updateData} /></li>
	          <li>
	            <label>所在部门：</label>
	            <Select appearance="primary" id="deptId" initialData={departmentData} updateAction={UserAddActions.updateData} placeholder="选择部门" />
	          </li>
	          <li><label>密码：</label><Input type="password" appearance="primary" id="pwd" updateAction={UserAddActions.updateData} /></li>
	          <li>
	          	<label>分配角色：</label>
	          	<Select appearance="primary" id="roleId" initialData={roleData} updateAction={UserAddActions.updateData} placeholder="选择角色" />
	          </li>
	        </ul>

			<ControlMenu initialData={rightData} checkHandle={UserAddActions.checkRight} checkAllHandle={UserAddActions.checkAllRights} areAllRightChecked={this.state.areAllRightChecked}/>

			<button className="hy-button" onClick={this._addUser}>确认</button>
	    </div>
	},

	_onChange: function(){
		this.setState({
			userAddData: UserAddStore.getData(),
			areAllRightChecked: UserAddStore.areAllRightChecked()
		});
	},

	_addUser: function(){
		UserAddActions.addUser();
	}
});

export default UserAdd;