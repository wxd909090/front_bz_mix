// Qnapi
function Qnapi(base, pusagespace, pgetLocalSessFunc) {
    var baseUrl = base;
    var usagespace = pusagespace;
    var getLocalSessFunc = pgetLocalSessFunc;
    var that = this;

    var class2type = {} ;
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
        class2type[ "[object " + e + "]" ] = e.toLowerCase();
    }) ;

    this.typeof = function(obj){
        if ( obj == null ){
            return String( obj );
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ class2type.toString.call(obj) ] || "object" :
            typeof obj;
    }

    this.setBaseUrl = function(base){
        baseUrl = base;
    };

    //阻塞请求队列
    this.blocked = false;
    this.blockQueryObjQueue = [];
    this.blockQueryObj = function (func, apiPath, paramObj, callbackSucc, callbackOnFail){
        this.func = func;
        this.apiPath = apiPath;
        this.paramObj = paramObj;
        this.callbackSucc = callbackSucc;
        this.callbackOnFail = callbackOnFail;
    }

    this.blockQuery = function(){
        that.blocked = true;
    }

    this.resumeQuery = function(){
        that.blocked = false;
        for(let i = 0; i < that.blockQueryObjQueue.length; i++){
            let obj = that.blockQueryObjQueue[i];
            console.log('resume : ' + obj.apiPath);
            obj.func(obj.apiPath, obj.paramObj, obj.callbackSucc, obj.callbackOnFail)
        }
    }


    this.query = function (apiPath, paramObj, callbackSucc, callbackOnFail) {

        if (that.blocked){
            console.log('blocked : ' + apiPath);
            that.blockQueryObjQueue.push(new that.blockQueryObj(this.query, apiPath, paramObj, callbackSucc, callbackOnFail));
            return;
        }

        var paramsType = that.typeof(paramObj);
        var poststr = "";
        if (paramsType == 'object'){
            for (var key in paramObj) {
                if (poststr != "") {
                    poststr += "&";
                }
                poststr += key + "=" + encodeURIComponent(paramObj[key]);
            }
        }else{
            poststr = paramObj;
        }

        if (usagespace){
            if (poststr != "") {
                poststr += "&";
            }
            poststr += "api_usagespace=" + usagespace;
        }
        if (getLocalSessFunc){
            var sess = getLocalSessFunc();
            if (sess){
                if (poststr != "") {
                    poststr += "&";
                }
                poststr += "api_local_sess=" + sess;
            }
        }

        var url = baseUrl + apiPath;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, true);
        xmlhttp.timout = 3000;
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        
        try{
            xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState==4){
                    if (xmlhttp.status==200){
                        var obj = JSON && JSON.parse(xmlhttp.responseText) || $.parseJSON(xmlhttp.responseText);
                        callbackSucc(obj);
                    }else{
                        if (callbackOnFail != null){
                            console.log('query fail : ' + xmlhttp.status );
                            callbackOnFail(xmlhttp.status);
                        }
                    }
                }
            }
            xmlhttp.send(poststr);

        } catch(e) {
          console.log('catch error', e);
          callbackOnFail(e);
        }
    };

    //fetch 模式获取请求
    this.q = function(apiPath, paramObj){
        /*
        // Return a new promise.
        return new Promise(function(resolve, reject) {



            var paramsType = that.typeof(paramObj);
            var poststr = "";
            if (paramsType == 'object'){
                for (var key in paramObj) {
                    if (poststr != "") {
                        poststr += "&";
                    }
                    poststr += key + "=" + encodeURIComponent(paramObj[key]);
                }
            }else{
                poststr = paramObj;
            }

            if (usagespace){
                if (poststr != "") {
                    poststr += "&";
                }
                poststr += "api_usagespace=" + usagespace;
            }
            if (getLocalSessFunc){
                var sess = getLocalSessFunc();
                if (sess){
                    if (poststr != "") {
                        poststr += "&";
                    }
                    poststr += "api_local_sess=" + sess;
                }
            }

            var url = baseUrl + apiPath;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", url, true);
            xmlhttp.timout = 3000;
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

            try{
                xmlhttp.onreadystatechange=function(){
                    if (xmlhttp.readyState==4){
                        if (xmlhttp.status==200){
                            var obj = JSON && JSON.parse(xmlhttp.responseText) || $.parseJSON(xmlhttp.responseText);
                            resolve(obj);
                        }else{
                            if (callbackOnFail != null){
                                console.log('query fail : ' + xmlhttp.status);
                                reject(Error(xmlhttp.status));
                            }
                        }
                    }
                };

                xmlhttp.onerror = function() {
                    reject(Error("Network Error"));
                };

                xmlhttp.send(poststr);

            } catch(e) {
                console.log('catch error', e);
                reject(e);
            }

        });*/
    }
};

export default {
    Qnapi : Qnapi
}