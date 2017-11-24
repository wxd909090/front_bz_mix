
//这坨是前端用的权限控制代码
//对qnbarApi有依赖
    function PermissionChecker(){
        var that = this;

        var BindThing = function(){
            this.code = ""; //
            this.type = ""; // page / elementId / function / check
            this.value = ""; //具体id或function对象
            this.noPrmsnDo = null; //没权限时，做啥
            this.ownPrmsnDo = null; //有权限时，做啥
            this.isPrmsnOk = false; //是否权限ok
        }

        var bindArr = [];

        var DoHide = function (bindThingObj){
            if (bindThingObj){
                bindThingObj.style.display="none";
            }
        }

        var DoShow = function (bindThingObj){
            if (bindThingObj){
                bindThingObj.style.display="";
            }
        }

        var onQueryFinishOutDoFunc = null;
        var onNoPageCoreDoFunc = null;

        //权限请求后的处理 
        var HandlePermissionQueryOK = function (rsp){
            if (rsp.code == 0){
                if (rsp.data.length != bindArr.length){
                    alert("权限验证未对齐错误");
                }

                //set result
                for (var i = 0; i < bindArr.length; i++){
                    if (rsp.data[i] > 0){
                        bindArr[i].isPrmsnOk = true;
                    }
                }

                //run deal
                var isPageCoreOk = true;
                for (var i = 0; i < bindArr.length; i++){
                    if (bindArr[i].type == "page"){
                        if (!bindArr[i].isPrmsnOk){
                            isPageCoreOk = false;
                        }

                    } else if (bindArr[i].type == "elementId"){

                        if (!bindArr[i].isPrmsnOk){
                            if (bindArr[i].noPrmsnDo){
                                var element = document.getElementById(bindArr[i].value);
                                if (element){
                                    bindArr[i].noPrmsnDo(element);
                                }
                                    
                            }
                        }else{
                            if (bindArr[i].ownPrmsnDo){
                                var element = document.getElementById(bindArr[i].value);
                                if (element){
                                    bindArr[i].ownPrmsnDo(element);
                                }
                            }
                        }
                    } else if (bindArr[i].type == "function"){
                        if (!bindArr[i].isPrmsnOk){
                            //not run
                        }else{
                            bindArr[i].value();
                        }
                    }
                }

                if (!isPageCoreOk){
                    if (onNoPageCoreDoFunc != null){
                        onNoPageCoreDoFunc();
                    }else{
                        alert("你不具有该页面的访问权限");
                    }
                }else{
                    if (onQueryFinishOutDoFunc){
                        onQueryFinishOutDoFunc();
                    }
                }
            }else{
                alert("请求权限出现错误：" + rsp.code);
            }
            
        }

        //绑定当前页面访问时控制
        this.bindElementById = function(permissionCode, elementId, noPrmsnMethod, ownPrmsnMethod){
            var tempBind = new BindThing();
            tempBind.code = permissionCode;
            tempBind.type = "elementId";
            tempBind.value = elementId;

            if (!noPrmsnMethod || noPrmsnMethod == 'hide'){
                tempBind.noPrmsnDo = DoHide;
            }else{
                //todo
            }

            if (ownPrmsnMethod){
                if (ownPrmsnMethod == 'show'){
                    tempBind.ownPrmsnDo = DoShow;
                }
            }

            bindArr.push(tempBind);
        }

        this.bindRunFunc = function(permissionCode, func){
            var tempBind = new BindThing();
            tempBind.code = permissionCode;
            tempBind.type = "function";
            tempBind.value = func;

            bindArr.push(tempBind);
        }

        /*
         * 绑定页面核心权限，没有核心权限判定为全页无法使用
         */
        this.bindPageCore = function(permissionCode){
            var tempBind = new BindThing();
            tempBind.code = permissionCode;
            tempBind.type = "page";

            bindArr.push(tempBind);
        }

        /*
         * 绑定要检查的权限，用于外部逻辑
         */
        this.bindCheck = function(permissionCode){
            var tempBind = new BindThing();
            tempBind.code = permissionCode;
            tempBind.type = "check";

            bindArr.push(tempBind);
        }

        /*
         * 页面无核心权限时的回调
         */
        this.setNoPageCoreDoFunc = function (noPageCoreDoFunc){
            onNoPageCoreDoFunc = noPageCoreDoFunc;
        }

        this.queryAddress = 'role-permission/role/match-permission';

        //-- 单独请求权限 --
        this.queryPermissions = function(qnbarApiClient, usagespaceParam, localSessionKey, onQueryFinishOutDo){
            if (bindArr.length == 0){
                alert("未绑定任何权限和资源错误！");
            }

            onQueryFinishOutDoFunc = onQueryFinishOutDo;

            var codesStr = '';
            for (var i = 0; i < bindArr.length; i++){
                codesStr += bindArr[i].code;
                if (i != bindArr.length - 1){
                    codesStr += ',';
                }
            }

            var postParams = {
                usagespace : usagespaceParam,
                codes : codesStr
            }
            if (localSessionKey){
                postParams.local_sess = localSessionKey;
            }
            qnbarApiClient.query(that.queryAddress, postParams, HandlePermissionQueryOK);
        }

        


        //---- 直接获取全量权限 ----
        var allUserPermissionCodes = [];
        var onQueryAllOKOutDoFunc = null;
        var onQueryAllFailOutDoFunc = null;
        this.queryAllPermissionUrl = 'role-permission/role/get-all';

        var handleAllPermissionsOk = function(rsp){
            if (rsp.code == 0){
                if (rsp.data && rsp.data.length > 0){
                    for(var i = 0; i < rsp.data.length; i++){
                        allUserPermissionCodes.push(rsp.data[i]);
                    }
                    console.log("all permission code");
                    console.log(allUserPermissionCodes);
                }

                if (onQueryAllOKOutDoFunc){
                    onQueryAllOKOutDoFunc(rsp);
                }
            }else{
                if (onQueryAllFailOutDoFunc){
                    onQueryAllFailOutDoFunc(rsp);
                }else{
                    alert("请求权限出现错误，请尝试重新登录或清理浏览器cookie ：" + rsp.code + rsp.msg);
                }
            }

            
        }

        this.queryAllPermissions = function(qnbarApiClient, usagespaceParam, localSessionKey, onQueryOKOutDo, onQueryFailOutDo){
            onQueryAllOKOutDoFunc = onQueryOKOutDo;
            onQueryAllFailOutDoFunc = onQueryFailOutDo;

            var postParams = {
                usagespace : usagespaceParam,
            }
            if (localSessionKey){
                postParams.local_sess = localSessionKey;
            }
            //特殊处理block
            qnbarApiClient.blocked = false;
            qnbarApiClient.query(that.queryAllPermissionUrl, postParams, handleAllPermissionsOk);
            qnbarApiClient.blocked = true;
        }

        this.hasPermission = function(permissionCode){
            if (bindArr.length > 0){
                for (var i = 0; i < bindArr.length; i++){
                    if (bindArr[i].code == permissionCode && bindArr[i].isPrmsnOk){
                        return true;
                    }
                }
            }

            if (allUserPermissionCodes.length > 0){
                for (var i = 0; i < allUserPermissionCodes.length; i++){
                    if (allUserPermissionCodes[i] == permissionCode){
                        return true;
                    }
                }
            }
            
            return false;
        }

        this.checkAndRun = function(permissionCode, outThing, outRunOkFunc, outRunFailFunc){
            if (that.hasPermission(permissionCode)){
                if (outRunOkFunc){
                    outRunOkFunc(outThing);
                }
                return;
            }

            if (outRunFailFunc){
                outRunFailFunc(outThing);
            }
        }
    }


export default {
    PermissionChecker : PermissionChecker
}