var React = require('react');

var Input = React.createClass({

	propTypes: {
		type: ReactPropTypes.string,
		className: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		focus: ReactPropTypes.bool
	},	

	render: function(){
		return <input type="text" className="hy-input primary" />
	}
	
});

module.exports=Input;