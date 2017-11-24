import evn from './env.js'
export default {
  commonGetLocalData(key) {
    var self = this;
    if (localStorage[evn.localName]) {
      return JSON.parse(localStorage[evn.localName])[key];
    } else {
      self.$alert("获取不到登录信息，请重新登录！", '提示');
      self.$router.push('/');
    }
  },
  install(Vue, options) {
    // -------------------------------------------公共函数------------------------------------------------------
    // Vue.prototype.clone=function (myObj){
    //   if(typeof(myObj) != 'object') return myObj;
    //   if(myObj == null) return myObj;
    //
    //   var myNewObj = new Object();
    //
    //   for(var i in myObj)
    //     myNewObj[i] = clone(myObj[i]);
    //
    //   return myNewObj;
    // },
    


    // 存储登录信息
    Vue.prototype.commonSetLocalDataNew = function(key,data) {
        var newData = JSON.stringify(data);
        localStorage.setItem(key, newData);
    };
    // 获取登录信息
    Vue.prototype.commonGetLocalDataNew = function(key) {
            return localStorage.getItem(key); 
    };
    // 删除登录信息
    Vue.prototype.commondelLocalAllDataNew = function(key) {
      delete localStorage[key];
    };




    // 存储登录信息
    Vue.prototype.commonSetLocalData =  function(data) {
      localStorage[evn.localName] = JSON.stringify(data);
    };
    // 获取登录信息
    Vue.prototype.commonGetLocalData = function() {
      var self = this;
      if (localStorage[evn.localName]) {
        return JSON.parse(localStorage[evn.localName])[key];
      } else {
        self.$alert("获取不到登录信息，请重新登录！", '提示');
        self.$router.push('/');
      }
    };
    // 获取所有登录信息
    Vue.prototype.commonGetLocalAllData = function() {
      var self = this;
      if (localStorage[evn.localName]) {
        return JSON.parse(localStorage[evn.localName]);
      } else {
        self.$alert("获取不到登录信息，请重新登录！", '提示');
        self.$router.push('/');
      }
    };
    // 删除登录信息
    Vue.prototype.commondelLocalAllData = function() {
      delete localStorage[evn.localName]
    };

    Vue.prototype.getUrlFlag = "";




    Vue.filter("picVideo", function(value) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
        if (value == 1 || value == 38) {
            return "上传图片、视频"
        } else {
            return "上传图片"
        }
    });
   

  }
}
