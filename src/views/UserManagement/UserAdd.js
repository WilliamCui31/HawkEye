var React = require('react');
var ControlMenu = require('../../components/ControlMenu');
var UserAddStore = require('../../stores/UserAddStore');
var UserAddActions = require('../../actions/UserAddActions');

var UserAdd = React.createClass({

	getInitialState: function(){
		return {
			userAddData: UserAddStore.getData()
		}
	},

	componentDidMount: function(){
		UserAddStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserAddStore.removeChangeListener(this._onChange);
	},

	render: function(){
		var departmentData=this.state.userAddData.departMents,departments=[];
		var roleData=this.state.userAddData.roles,roles=[];
		var rightData=this.state.userAddData.rights;

		for(let department of departmentData){
			departments.push(<option key={department.id} value={department.id}>{department.name}</option>);
		}

		for(let role of roleData){
			roles.push(<option key={role.id} value={role.id}>{role.name}</option>);
		}

		return <div className="hy-section pdg20">

	    	<ul className="hy-multiline-form clearfix">
	          <li><label>用户名：</label><input type="text" className="hy-input primary" /></li>
	          <li><label>姓名：</label><input type="text" className="hy-input primary" /></li>
	          <li>
	            <label>所在部门：</label>
	            <span className="hy-select-outer">
	              <span className="hy-select-inner">
	                <select className="hy-select primary" name="department" id="department" defaultValue="part0">
	                  <option value="part0" disabled hidden>选择其所在部门</option>  
	                  {departments}
	                </select>
	              </span>
	            </span>
	          </li>
	          <li><label>密码：</label><input type="text" className="hy-input primary" /></li>
	          <li>
	          	<label>分配角色：</label>
				<span className="hy-select-outer">
	              <span className="hy-select-inner">
	                <select className="hy-select primary" name="department" id="department" defaultValue="part0">
	                  <option value="part0" disabled hidden>选择角色</option>  
	                  {roles}
	                </select>
	              </span>
	            </span>
	          </li>
	        </ul>

			<ControlMenu rights={rightData} />

			<button className="hy-button" onClick={this._saveUser}>确认</button>
	    </div>
	},

	_onChange: function(){
		this.setState({
			userAddData: UserAddStore.getData()
		});
	},

	_saveUser: function(){
		UserAddActions.saveUser();
	}
});

module.exports=UserAdd;