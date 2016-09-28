var utils={

	//判断一个对象是否为空
	isEmptyObject: function(obj){
		for(var n in obj){return false}
    	return true;
	},

	//设置Cookie
	setCookie: function(name,value){
		var hours = 8;
		var exp = new Date();
		exp.setTime(exp.getTime() + hours*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},

	//获取Cookie
	getCookie: function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	},

	//删除Cookie
	delCookie: function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}

}

export default utils;
