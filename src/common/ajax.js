/** @desc 封装ajax请求带validateKey和token验证，调用方式几乎等同于jquery的ajax封装，略有出入。
*
*  @param settings.url {string} 请求的url
*  @param settings.method {string} 请求的方法（默认值为post）
*  @param settings.data {object} 需要发送的数据（json对象）
*  @param settings.async {boolean} true:异步请求，false:同步请求（默认值）
*  @param settings.success {function} 请求成功回调函数
*  @return object；返回的数据（json对象）
*
*  @author William Cui
*  @date 2016-09-20
**/
import utils from './utils'
import md5 from './md5';
import CryptoJS from './pad-zeropadding';

function ajax(settings) {
    //http://192.168.1.242:9701
    var url="http://192.168.1.242:9701"+settings.url,
        method=settings.method || "post",
        async=settings.async,
        data=settings.data || {},
        success=settings.success;

    if(!async || async!==false){
        async = true; //默认使用异步请求
    }

    //如果存在validateKey，表示是登录状态，data数据对象追加validateKey和token数据
    if(sessionStorage.getItem("validateKey")) {

      //定义属性连接字符串，最终通过MD5和AES两层加密得到token
      var propsString="",token="";

      //如果有请求数据则追加到属性字符串
      if(!utils.isEmptyObject(data)) propsString=joinProps(data)+"&";

      //获取登录validateKey,追加到data数据对象
      data.validateKey=sessionStorage.getItem("validateKey");

      //属性字符串追加validateKey
      propsString+="validateKey="+data.validateKey;
      //console.log("参数拼接：",propsString);

      //MD5加密
      token=md5(propsString);
      //console.log("md5:",token);

      //AES加密
    	var key=CryptoJS.enc.Latin1.parse('ntj-eye-20160920');
    	var iv=CryptoJS.enc.Latin1.parse('ntj-2016-972385x');
      token=CryptoJS.AES.encrypt(token,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});

      //把经过MD5和AES两次加密后的token追加到data数据对象
      data.token=token.toString();

      //console.log("token:",data.token);
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
        if(data) url += '?' + params(data);
        xhr.send(null);		//get方式则填null
    }

    //true表示异步，false表示同步
    //使用异步调用的时候，需要触发readystatechange 事件
    if (async === true) {
       xhr.onreadystatechange = function () {
           if (xhr.readyState == 4) {   //判断对象的状态是否交互完成
               callback();
           }
       };
    }else {
      callback();
    }

    //请求成功回调
    function callback() {
      //判断http的交互是否成功，200表示成功
      if (xhr.status == 200) {

          //将返回的json字符串解析成json对象
          var response=JSON.parse(xhr.responseText);

          //console.log(response);
          //当返回的code的值为1003(用户已过期)，2001（校验key为空）的时候，跳转到登录页面
          if(response.code==="1003"/*||response.code==="2001"*/) location.assign("/");

          //将解析的json对象返回
          success(response);
      } else {
          //alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
      }
    }

    //属性按英文字母排序并拼接起来
    function joinProps(data){
      var props=[];
      for(var i in data){
        var value=data[i];
        if(typeof value==="object") value=JSON.stringify(value);
        if(i!="validateKey"&&i!="token")
        props.push(i+"="+value);
      }
      props.sort(function(x,y){
        x=x.split("=")[0].toLowerCase();
        y=y.split("=")[0].toLowerCase();
        return x>y?1:-1;
      });
      return props.join("&");
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

export default ajax;
