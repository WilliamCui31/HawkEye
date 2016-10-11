import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Paging from '../../components/Paging';
import Confirm from '../../components/Confirm';
import MainStore from '../../stores/MainStore';
import UserListStore from '../../stores/UserListStore';
import UserListActions from '../../actions/UserListActions';

//import exportExcel from '../../common/exportExcel';

const UserList = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		return {
			userListData: UserListStore.getUserListData()
		}
	},

	componentDidMount: function(){
		UserListActions.queryUsers({pageNum: 1});
		UserListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserListStore.removeChangeListener(this._onChange);
	},

	render: function(){
		//部门列表
		var departmentsData=MainStore.getDepartments();

		//用户列表
		var userListData=this.state.userListData,
			users=[],
			pageSize=0,
			recordCount=0,
			currentPage=0,
			currentRecord=0,
			totalPage=0,
			paging=null;

		if(userListData&&userListData.list.length>0){
			pageSize=userListData.pageSize;
			currentPage=userListData.pageNum*1;
			recordCount=userListData.recordCount;
			totalPage=Math.ceil(recordCount/pageSize)*1;
			currentRecord=userListData.list.length;

			var _this=this;
			userListData.list.forEach(function(element,index,array){
				users.push(<tr key={element.id} id={element.id}>
	              <td>{(currentPage-1)*pageSize+index+1}</td>
	              <td>{element.name}</td>
	              <td>{element.realName}</td>
	              <td>{element.deptName}</td>
	              <td>{element.roleName}</td>
	              <td>{element.isAvaliable?"启用":"禁用"}</td>
	              <td>
		              <button className="link-button" onClick={_this._modifyUserInfo}>修改信息</button>
		              <button className="link-button" onClick={_this._modifyUserRights}>修改权限</button>
		    	      <button className="link-button warning" onClick={_this._confirmSwitchUserStatus} value={element.isAvaliable}>{element.isAvaliable?"禁用":"启用"}</button>
	    	      </td>
	            </tr>)
			});
			paging=<Paging
				pageSize={currentRecord}
				currentPage={currentPage}
				totalPage={totalPage}
				switchPageAction={this._switchPage}
			/>
		}else{
			users.push(<tr key={0} className="list-grid-placeholder"><td colSpan="7">暂时没有数据哦，请点击查询！</td></tr>);
		}

		return <div>

			<div className="hy-panel">
	        <ul className="hy-inline-form clearfix">
	          <li><label>用户名：</label><Input appearance="primary" id="name" inputAction={this._inputName}  /></li>
	          <li>
	            <label>所在部门：</label>
	            <Select appearance="primary" id="deptId" initialData={departmentsData} selectAction={this._selectDept} placeholder="选择部门" />
	          </li>
	          <li><button className="hy-button query-button" onClick={this._queryUsers}>查询</button></li>
	        </ul>
	    </div>

	    <div className="hy-section">
				<table className="list-grid" id="userList" width="100%">
					<caption className="list-grid-header clearfix">
						<button className="hy-button hollow export pull-right" onClick={this._exportTable}>导出</button>
					</caption>
          <thead>
            <tr>
              <th width="5%">序号</th>
              <th width="15%">用户名</th>
              <th width="10%">姓名</th>
              <th width="10%">所在部门</th>
              <th width="10%">所在角色</th>
              <th width="10%">当前状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7">
              	{paging}
              </td>
            </tr>
          </tfoot>
        </table>
	    </div>

	   	{this.state.popup}

    </div>
	},

	_onChange: function(){
		//更新视图
		this.setState({userListData: UserListStore.getUserListData()});
	},

	_inputName: function(e){
		this.state.name=e.target.value;
	},

	_selectDept: function(id,value){
		this.state.deptId=value;
	},

	_queryUsers: function(){
		//查询用户列表
		var queryParam={pageNum: 1};
		if(this.state.name) queryParam.name=this.state.name;
		if(this.state.deptId) queryParam.deptId=this.state.deptId;
		UserListActions.queryUsers(queryParam);
	},

	_switchPage: function(pageIndex){
		//翻页
		var queryParam={pageNum: pageIndex};
		if(this.state.name) queryParam.name=this.state.name;
		if(this.state.deptId) queryParam.deptId=this.state.deptId;
		UserListActions.queryUsers(queryParam);
	},

	_confirmSwitchUserStatus: function(e){
		//准备切换用户状态
		var userId=e.target.parentNode.parentNode.id;
		var isAvaliable=e.target.value;
		var message=<h1>您确定要启用该用户吗？</h1>;
		if(isAvaliable==1) {
			message=<div>
				<h1>您确定要禁用该用户吗？</h1>
				<p>对用户禁用操作后，该用户将不能再登陆使用鹰眼系统</p>
			</div>;
		}

		this.setState({
			popup: <Confirm
				message={message}
				confirm={this._switchUserStatus}
				close={this._closePopup}
			/>,
			userId: userId,
			isAvaliable: isAvaliable
		});
	},

	_switchUserStatus: function(){
		//切换用户状态

		var userId=this.state.userId;
		var isAvaliable=this.state.isAvaliable;

		UserListActions.switchUserStatus(userId,isAvaliable);
	},

	_closePopup: function(){
		//关闭弹窗
		this.setState({popup: null});
	},

	_modifyUserInfo: function(e){
		//修改用户信息
		var userId=e.target.parentNode.parentNode.id;
		this.context.router.push({
			pathname: "/modifyInfo",
			query: {userId: userId}
		});
	},

	_modifyUserRights: function(e){
		//修改用户权限
		var userId=e.target.parentNode.parentNode.id;
		this.context.router.push({
			pathname: "/modifyRights",
			query: {userId: userId}
		});
	},

	_exportTable: function(){
		function outputAddress(grid, strMethod) {
		    try {
		        var xls = new ActiveXObject("Excel.Application");
		    }
		    catch (e) {
		        alert("要打印该表，您必须安装Excel电子表格软件，同时浏览器须使用“ActiveX 控件”，您的浏览器须允许执行控件。 请点击【帮助】了解浏览器设置方法！");
		        return;
		    }
		    xls.visible = true; //设置excel为可见
		    var xlBook = xls.Workbooks.Add;
		    var xlSheet = xlBook.Worksheets(1);

		    var cm = grid.getColumnModel();
		    var colCount = cm.getColumnCount();
		    var temp_obj = [];
		    //只下载没有隐藏的列(isHidden()为true表示隐藏,其他都为显示)
		    //临时数组,存放所有当前显示列的下标
		    for (i = 0; i < colCount; i++) {
		        if (cm.isHidden(i) != true || (strMethod != null && (strMethod.indexOf("#" + cm.getColumnById(i).dataIndex.toString() + "#") > -1))) {
		            temp_obj.push(i);
		        }
		    }
		    for (i = 1; i <= temp_obj.length; i++) {
		        //显示列的列标题
		        xlSheet.Cells(1, i).Value = (cm.getColumnHeader(temp_obj[i - 1])).toString().replace('<center>', "").replace('</center>', "").replace('<middle>', "").replace('</middle>', "").replace('<br>', "");
		        if (cm.getColumnHeader(temp_obj[i - 1]).indexOf('<center>') > -1) {
		            xlSheet.Cells(1, i).HorizontalAlignment = -4108;
		        }
		    }
		    var store = grid.getStore();
		    var recordCount = store.getCount();
		    var view = grid.getView();
		    for (i = 1; i <= recordCount; i++) {
		        for (j = 1; j <= temp_obj.length; j++) {
		            //EXCEL数据从第二行开始,故row = i + 1;
		            xlSheet.Cells(i + 1, j).Value = view.getCell(i - 1, temp_obj[j - 1]).innerText;
		        }
		    }
		    xlSheet.Columns.AutoFit;
		    xls.ActiveWindow.Zoom = 100
		    xls.UserControl = true; //很重要,不能省略,不然会出问题 意思是excel交由用户控制
		    xls = null;
		    xlBook = null;
		    xlSheet = null;
		}

		function replaceHtml(replacedStr, repStr, endStr) {
		    var replacedStrF = "";
		    var replacedStrB = "";
		    var repStrIndex = replacedStr.indexOf(repStr);
		    while (repStrIndex != -1) {
		        replacedStrF = replacedStr.substring(0, repStrIndex);
		        replacedStrB = replacedStr.substring(repStrIndex, replacedStr.length);
		        replacedStrB = replacedStrB.substring(replacedStrB.indexOf(endStr) + 1, replacedStrB.length);
		        replacedStr = replacedStrF + replacedStrB;
		        repStrIndex = replacedStr.indexOf(repStr);
		    }
		    return replacedStr;
		}

		function replaceHtml1(replacedStr, repStr, endStr) {
		    var replacedStrF = "";
		    var replacedStrB = "";
		    var repStrIndex = replacedStr.indexOf(repStr);
		    while (repStrIndex != -1) {
		        replacedStrF = replacedStr.substring(0, repStrIndex);
		        replacedStrB = replacedStr.substring(repStrIndex, replacedStr.length);
		        replacedStrB = replacedStrB.substring(replacedStrB.indexOf(endStr) + 1, replacedStrB.length);
		        replacedStr = replacedStrF + replacedStrB;
		        repStrIndex = replacedStr.indexOf(repStr);
		    }
		    return replacedStr;
		}

		//elTalbeOut 这个为导出内容的外层表格，主要是设置border之类的样式，elDiv则是整个导出的html部分
		function htmlToExcel(GridPanel_ID, ColumnWidth, Border) {
		    try {
		        if (navigator.userAgent.indexOf("MSIE") > 0) {
		            ToExcel_IE(GridPanel_ID, ColumnWidth, Border);
		        }
		        else {
		            ToExcel_FF(GridPanel_ID, Border);
		        }
		        ColumnWidth = null;
		    } catch (e) {
		        alert(e.description)
		    }
		}

		function ToExcel_IE(GridPanel_ID, ColumnWidth, Border) {

		    //获取需要导出的内容
		    var elDiv = document.getElementById(GridPanel_ID);
		    //设置导出前的数据，为导出后返回格式而设置
		    var elDivStrBak = elDiv.innerHTML;

		    //过滤elDiv内容
		    var elDivStr = elDiv.innerHTML;
		    elDivStr = replaceHtml(elDivStr, "<A", ">");
		    elDivStr = replaceHtml(elDivStr, "</A", ">");
		    elDivStr = replaceHtml(elDivStr, "<IMG", ">");
		    //设置table的border=1，这样到excel中就有表格线 ps:感谢双面提醒
		    if (Border != null) {
		        elDivStr = elDivStr.replace(/<TABLE/g, "<TABLE border=" + Border);
		    }
		    elDiv.innerHTML = elDivStr;
		    elDivStr = "";

		    var oRangeRef = document.body.createTextRange();
		    oRangeRef.moveToElementText(elDiv);
		    oRangeRef.execCommand("Copy");

		    //返回格式变换以前的内容
		    elDiv.innerHTML = elDivStrBak;
		    //内容数据可能很大，所以赋空
		    elDivStrBak = "";
		    elDiv = null;

		    var oXL = new ActiveXObject("Excel.Application")
		    var oWB = oXL.Workbooks.Add;
		    var oSheet = oWB.ActiveSheet;
		    oSheet.Paste();
		    //oSheet.Cells.NumberFormatLocal = "@";
		    oSheet.Columns("D:D").Select
		    oSheet.Columns.AutoFit;
		    ColumnWidth = (ColumnWidth == null ? '' : ColumnWidth);
		    for (i = 0; i < ColumnWidth.length; i++) {
		        oSheet.Columns(parseInt(ColumnWidth[i].split(",")[0])).ColumnWidth = parseInt(ColumnWidth[i].split(",")[1]);
		    }
		    //oXL.Selection.ColumnWidth = 20
		    oXL.ActiveWindow.Zoom = 100
		    oXL.Visible = true;
		    oXL.UserControl = true; //很重要,不能省略,不然会出问题 意思是excel交由用户控制
		    oSheet = null;
		    oWB = null;
		    appExcel = null;
		    oXL = null;
		}

		var ToExcel_FF = (function() {
		    var uri = 'data:application/vnd.ms-excel;base64,',
		      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
		        format = function(s, c) {
		            return s.replace(/{(\w+)}/g,
		            function(m, p) { return c[p]; })
		        }
		    return function(GridPanel_ID, Border) {
		        var elDiv = document.getElementById(GridPanel_ID);
		        //过滤elDiv内容
		        var elDivStr = elDiv.innerHTML;
		        elDivStr = replaceHtml(elDivStr, "<a", ">");
		        elDivStr = replaceHtml(elDivStr, "</a", ">");
		        elDivStr = replaceHtml(elDivStr, "<img", ">");
		        //设置table的border=1，这样到excel中就有表格线 ps:感谢双面提醒
		        if (Border != null) {
		            elDivStr = elDivStr.replace(/<table/g, "<table border=" + Border);
		        }
		        var ctx = { worksheet: '' || 'Worksheet', table: elDivStr }
		        window.location.href = uri + base64(format(template, ctx));
		        //返回格式变换以前的内容
		        elDivStr = "";
		        elDiv = null;
		    }
		})()

		var arrStr = new Array() //可以通过数组的形式设置列宽，如果不设置传null可以
    arrStr.push("1,120");
    arrStr.push("2,120");
    arrStr.push("4,120");
		htmlToExcel("userList", arrStr, 1);
	}

});

export default UserList;
