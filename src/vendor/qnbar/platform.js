
import Qnapi from './qnapi.js'
import QnLoginClient from './qnlogin.js'
import PermissionChecker from './qnpermission.js'


function Platform(){
    var that = this;

    //==================== 全局全站配置，每个站点独立配置一份来统一加载即可 ====================
    this.config = function(){
        this.env = "local"; //local test release
        this.hostBaseUrl = 'http://passport.tt.qnbar.com/';    //当前页面访问环境的host base
        this.platformUsagespace = 'PT_AGENT_BZ';            //平台标记，固定需要，请求要带上 【后端给具体定义】

        //api访问地址相关
        this.apiBaseUrl = 'http://passportapi.tt.qnbar.com/';  //后端服务api 访问基本地址

        //统一登录相关
        this.qnloginBaseUrl = "http://passport.tt.qnbar.com/"; //统一登录服务的基本地址
        this.qnloginPlatformNo = 8;                       //统一登录中本平台的编号 - 【后端给具体定义】
        this.loginJumpBackUrl = encodeURIComponent(hostBaseUrl + "test_agent.html"); //统一登录成功后无参数的回跳地址，url_encode的
    }

    //==================== 固定工具初始化，固定逻辑 ====================
    //初始化qnlogin通用接口对象
    this.qnlogin = null;
    this.apiClient = null;
    this.permissionChecker = null;//全局用的权限检查器

    this.init = function(){
        that.qnlogin = new QnLoginClient.QnLoginClient(that.config.qnloginBaseUrl, that.config.qnloginPlatformNo);//【todo url记得改, 平台编号记得改】
        //后端api请求工具
        that.apiClient = new Qnapi.Qnapi(that.config.apiBaseUrl, that.config.platformUsagespace, that.qnlogin.getLocalSess);
        that.permissionChecker = new PermissionChecker.PermissionChecker();
    }
}

export default {
    Platform : Platform
}
