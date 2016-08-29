import React from 'react';

export default class Welcome extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="hy-cont">
			<div className="hy-section">
				<ul className="login-info">
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
	    </div>
	}
}