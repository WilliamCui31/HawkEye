/* @desc 自己封装的ajax，目前主要支持工作中常用的post，get请求。调用方式几乎等同于jquery的ajax封装，略有出入。
*
*  @param obj.url {string} 请求的url
*  @param obj.method {string} 请求的方法（默认值为post）
*  @param obj.data {object} 需要发送的数据（json对象）
*  @param obj.async {boolean} true:异步请求，false:同步请求（默认值）
*  @param obj.success {function} 请求成功回调函数
*  @return object；返回的数据（json对象）
*
*  @author William Cui
*  @date 2016-09-20
* */
function ajax(settings) {

    var url="http://192.168.1.242:9701"+settings.url,
        method=settings.method || "post",
        async=settings.async,
        data=settings.data,
        success=settings.success;

    if(!async && async!==false){
        async = true; //默认使用异步请求
    }

    //基于兼容考虑，创建一个XMLHttpRequest对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    //在使用XHR对象时，必须先调用open()方法，
    //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
    xhr.open(method, url, async);

    if (method === "post") {
        //post方式需要自己设置http的请求头，来模仿表单提交。
        //放在open方法之后，send方法之前。
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(JSON.stringify(data));		//post方式将数据放在send()方法里
    } else {
        //get方式，则将数据加到url后面
        if(data) url += '&' + params(data);
        xhr.send(null);		//get方式则填null
    }

    //true表示异步，false表示同步
    //使用异步调用的时候，需要触发readystatechange 事件
    if (async === true) {
       xhr.onreadystatechange = function () {
           if (xhr.readyState == 4) {   //判断对象的状态是否交互完成
               callback();		 //回调
           }
       };
    }else {
      callback();
    }

    function callback() {
      if (xhr.status == 200) {  //判断http的交互是否成功，200表示成功
          success(JSON.parse(xhr.responseText));//将返回的json字符串解析返回
      } else {
          //alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
      }
    }

    //名值对转换为字符串
    function params(data) {
        var arr = [];
        for (var i in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    }
}

module.exports=ajax;
