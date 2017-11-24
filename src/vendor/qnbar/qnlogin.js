//================================

function QnLoginClient (base, platformId){
    var baseUrl = base;
    var platformId = platformId;
    var that = this;

    this.geBaseUrl = function(){
        return baseUrl;
    }

    this.getPlatformId = function(){
        return platformId;
    }

    this.getCheckPagePath = function(){
        return "loginCheck.html";
    }

    this.getUniloginPagePath = function(){
        return "unilogin.html";
    }

    this.getCookie = function(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    this.validateTGC = function(){
        var postParams = "dont_login=1&clean_dirty=1";
        qnapi.query('passport/validate/tgc', postParams, handleOnValidateInClient);
    }

    this.getJumpUrl = function(target, redirectUrl, userType, dontLogin){
        var targetPath = "";
        if (target == "login"){
            targetPath = this.getUniloginPagePath();
        }else{
            targetPath = this.getCheckPagePath();
        }
        var url = this.geBaseUrl()  + targetPath + "?platform_id=" + this.getPlatformId() + "&redirect_url=" + redirectUrl;
        if (dontLogin){
            url += "&dont_login=" + 1;
            //userType = 'merchant';//hack
        }
        if (userType){
            url += "&user_type=" + userType;
        }
        console.log('jump url = ' + url);
        return url;
    }

    this.firstCheck = function(redirectBackUrl, onCheckFail){
        if (!redirectBackUrl){
            return;
        }

        var tgc = this.getCookie('QNTGC');
        if (tgc){ //go and check
            console.log('has tgc');
            var url = this.getJumpUrl('check', redirectBackUrl, null, 1);
            window.location.href = url;

        }else{ //no login, run check fail
            console.log('no tgc');
            if (onCheckFail){
                onCheckFail();
            }
        }
    }

    this.jumpToCheck = function(redirectBackUrl, userType){
        if (!redirectBackUrl || !userType){
            return;
        }
        var url = this.getJumpUrl('check', redirectBackUrl, userType);
        window.location.href = url;
    }

    this.jumpToLogin = function(redirectBackUrl, userType){
        if (!redirectBackUrl || !userType){
            return;
        }
        var url = this.getJumpUrl('login', redirectBackUrl, userType);
        window.location.href = url;
    }






    /*
     * =====================================================
     *                    以下是新的扩展 
     * =====================================================
     */

    var currentSessKey = '';
    this.localSessName = 'local_sess';
    this.isLocalSessOk = false;

    this.findGetParameter = function(parameterName, useDecodeURI = true) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) {
                    if (useDecodeURI){
                        result = decodeURIComponent(tmp[1]);
                    }else{
                        result = tmp[1];
                    }
                    
                }
            });
        return result;
    }

    this.localRunConfig = {
        JumpBackUrl : null,
        OnLocalSessionOkDo : null,      //检测到或成功获取本地session时执行
        OnLocalSessionNotOkDo : null,   //检测到无本地session是执行
        OnHasTicketDo : null,           //有ticket时执行
        OnAfterLocalSessionOkDo : null, //本地sessionOK后执行
        OnSessionFailDo : null,         //没有session时执行
        OnTicketValidateFail : null,    //ticket 无效时，应该如何处理，理论上要重新去passport一趟
    }

    this.getLocalSess = function(){
        return that.getCookie(that.localSessName);
    }

    this.setLocalSess = function(value, duration){
        if (!that.getLocalSess()){
            console.log("set local!");
            var expires = "";
            if (duration) {
                var date = new Date();
                date.setTime(date.getTime() + (duration * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = that.localSessName + "=" + value + expires + "; path=/";
        }
    }

    this.removeLocalSess = function(){
        document.cookie = that.localSessName + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }


    var checkSessChange = function(){
        if (currentSessKey){
            var localSession = that.getLocalSess();
            if (currentSessKey != localSession){
                console.log("local sess has changed");
                currentSessKey = localSession;
                window.location.reload(false);
            }
        }
    }


    this.runOnOnLocalSessionOkDo = function (localSess){
        var localSession = null;
        if (localSess){
            localSession = localSess
        }else{
            localSession = that.getLocalSess();
        }
        if (localSession){
            currentSessKey = localSession;
            that.isLocalSessOk = true;
            that.localRunConfig.OnLocalSessionOkDo();
            if (that.localRunConfig.OnAfterLocalSessionOkDo){
                that.localRunConfig.OnAfterLocalSessionOkDo();
            }

            window.onfocus = checkSessChange;
            //window.setInterval(repeatCheckSessChange, (3 + Math.floor(Math.random() * 3)) * 1000);
        }else{
            if (that.localRunConfig.OnSessionFailDo){
                that.localRunConfig.OnSessionFailDo();
            }
        }
    }

    this.handleTicketValidate = function(rspData){
        if (rspData.code == 0){
            console.log("ticket validate ok");
              
            that.setLocalSess(rspData.data.session_key, rspData.data.duration);
            that.runOnOnLocalSessionOkDo();

        }else{
            console.log("ticket validate fail:" + rspData.code);
            //有ticket但是无效，需要又去passport才行
            if (that.localRunConfig.OnTicketValidateFail){
                that.localRunConfig.OnTicketValidateFail();
            }
        }
            
    }


    


    this.runInPageReady = function(runConfig){
        //1.config
        if (!runConfig.JumpBackUrl || !runConfig.OnLocalSessionOkDo || !runConfig.OnLocalSessionNotOkDo || !runConfig.OnHasTicketDo){
            alert("请检查runInPageReady的使用参数！");
            console.log(runConfig);
        }
        that.localRunConfig.JumpBackUrl = runConfig.JumpBackUrl;
        that.localRunConfig.OnLocalSessionOkDo = runConfig.OnLocalSessionOkDo;
        that.localRunConfig.OnLocalSessionNotOkDo = runConfig.OnLocalSessionNotOkDo;
        that.localRunConfig.OnHasTicketDo = runConfig.OnHasTicketDo;
        if (runConfig.OnAfterLocalSessionOkDo){
            that.localRunConfig.OnAfterLocalSessionOkDo = runConfig.OnAfterLocalSessionOkDo;
        }
        if (runConfig.OnSessionFailDo){
            that.localRunConfig.OnSessionFailDo = runConfig.OnSessionFailDo;
        }
        if (runConfig.OnTicketValidateFail){
            that.localRunConfig.OnTicketValidateFail = runConfig.OnTicketValidateFail;
        }

        //2.start
        var withLocalSessClean = that.findGetParameter('local_sess_clean');
        var ticket = that.findGetParameter('service_ticket');
        if (withLocalSessClean){
            that.removeLocalSess();
            if (ticket){
                window.location.href = decodeURIComponent(that.localRunConfig.JumpBackUrl) + '?service_ticket=' + ticket;
                return;
            }
        }

        var localSession = that.getLocalSess();
        if (localSession){ // 有本地系统的cookie，判定为已登录
            that.runOnOnLocalSessionOkDo(localSession);

        }else{  //没有本地系统的cookie,尝试取ticket
            that.localRunConfig.OnLocalSessionNotOkDo();

            if (ticket){
                console.log('has ticket!');
                //OnHasTicketDo
                that.localRunConfig.OnHasTicketDo(ticket);
                
            }else{//ticket也没用，检查tgc
                that.firstCheck(that.localRunConfig.JumpBackUrl, that.localRunConfig.OnSessionFailDo);
            }
        }
    }

    this.logout = function(){
        document.cookie = 'QNTGC=; path=/; domain=.qnbar.com; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie = 'QNTGC=; path=/; domain=.qnbar.cn; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie = 'QNTGC=; path=/; domain=.qnbar.net; expires=Thu, 01 Jan 1970 00:00:01 GMT';

        that.removeLocalSess();

        //OnLoginOutDo
    }
}

export default {
    QnLoginClient : QnLoginClient
}
