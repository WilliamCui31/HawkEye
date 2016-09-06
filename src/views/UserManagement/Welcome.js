var React=require('react');
var ajax=require('../../ajax');

ajax({
	url: '/eye/user/v1/lastLoginRecordInfo.json',
	data: {userId: "1"},
	success: function(data) {
		console.log(data);
	}
});

var Welcome=React.createClass({


	render: function(){
		return <div className="hy-section">
			<ul className="login-info">
				<li className="login-info-tit">欢迎回来!</li>
				<li>
					<label>上次登录时间：</label><span>2016-08-12 10:25</span>
				</li>
				<li>
					<label>上次登录地点：</label><span>深圳市</span>
				</li>
				<li>
					<label>上次登录IP：</label><span>220.17.181.12</span>
				</li>
			</ul>
		</div>
	}

});

module.exports=Welcome;