<template>
  <div>
    <v-head :childmsg="msg"></v-head>
    <div class="content" id="content">
        <transition name="move" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <!-- 头部 -->
    <!-- <div id="user_name"><span v-if="hasLogin">{{ user_title }}</span></div>  
    <button id='logout' @click="runLogout()" v-show="hasLogin">登出</button> <button id='login' @click="jumpLogin()" v-show="!hasLogin">登录</button>
    <br />
    <br />
    <hr> -->

    <!-- 放菜单 -->
    <!-- <div>
      <a href="#" @click="goPage('/demo/demoPage')">平台跳转demo</a>
      <a href="#" @click="goPage('/demo/demoPage2')">文件上传demo</a>
    </div> 
    <br />
    <hr> -->
    <!-- 下一级route -->
    <!-- <router-view></router-view> -->
  </div>
</template>


<script>
//必定有的一个import ...
//import PT from '../vendor/qnbar/platform.js'
//var envBase = require('../env.js');
import EnvBase from '../env.js';
import SvrApi from '../svrapi.js';
import vHead from './header/Header.vue';

var PT = EnvBase.PT;

export default {
    name : 'mainPage',

    beforeMount: function() {
        // 平台
        const self = this;

        //--------- 固定统一登录初始化流程 ---------

        var withLocalSessClean = PT.qnlogin.findGetParameter('local_sess_clean');
        if (withLocalSessClean){
            PT.apiClient.blockQuery();
        }


        //登录模块的配置和初始化
        var LoginRunConf = {};

        //本地session ok时执行
        function OnLocalSessionOkDoFunc() {
            self.hasLogin = PT.qnlogin.isLocalSessOk;
        }
        //没有本地session时执行, 注意不是完全没有，可能带ticket或tgc...
        function OnLocalSessionNotOkDoFunc() {
            self.hasLogin = PT.qnlogin.isLocalSessOk;
        }

        //平台本地ticket校验并返回session的接口
        function OnHasTicketDoFunc(ticket) {
            var postParams = {
                service_ticket: ticket,
            }
            PT.apiClient.query(SvrApi.loginValidateTicket, postParams, PT.qnlogin.handleTicketValidate);
            PT.apiClient.blockQuery();
        }

        function OnSessionFailDoFunc() {
            //本地和passport都失败，完全没有session
            console.log('OnSessionFailDoFunc');
            PT.apiClient.blockQuery();
            self.jumpLogin();
        }

        //避免无失败卡页面
        function OnTicketValidateFailFunc(){
            alert('登录ticket验证失败！请尝试重新登录');
            PT.qnlogin.logout();
            this.hasLogin = PT.qnlogin.isLocalSessOk;
            window.location.href = decodeURIComponent(PT.config.loginJumpBackUrl);
        }

        //----------- 外部执行带入登录工具的配置 ------------
        LoginRunConf.JumpBackUrl = PT.config.loginJumpBackUrl;  //登录回跳地址
        LoginRunConf.OnLocalSessionOkDo = OnLocalSessionOkDoFunc;
        LoginRunConf.OnLocalSessionNotOkDo = OnLocalSessionNotOkDoFunc;
        LoginRunConf.OnHasTicketDo = OnHasTicketDoFunc;
        LoginRunConf.OnSessionFailDo = OnSessionFailDoFunc;
        LoginRunConf.OnTicketValidateFail = OnTicketValidateFailFunc;







        //---- 登录ok后的执行和鉴权的执行 ----

        //权限检查对象
        //全局 - 获取当前登录用户的全量权限code
        function checkAllUserPermission() {
            //开始执行鉴权请求
            PT.apiClient.blockQuery();
            PT.permissionChecker.queryAllPermissions(PT.apiClient, PT.config.platformUsagespace, PT.qnlogin.getLocalSess(), onAllPermissionQueryOK, onAllPermissionQueryFail);
        }


        //全局 - 登录OK后执行内容
        function onPageSessionOk() {
            self.user_title = '读取中...';
            self.hasLogin = PT.qnlogin.isLocalSessOk;
            //有登录，就执行权限获取
            checkAllUserPermission();
        }

        //执行passport登录模块的页面初始化运行过程
        LoginRunConf.OnAfterLocalSessionOkDo = onPageSessionOk;
        PT.qnlogin.runInPageReady(LoginRunConf);

        function onAllPermissionQueryOK() {
            //勿动~
            PT.apiClient.resumeQuery();
 
            var data = PT.permissionChecker.hasPermission('local_user_base_module');
            if(!!data){
                self.msg = "1"
            }else{
                self.msg = "";
            }
        }

        function onAllPermissionQueryFail(){
            alert('请求权限失败，请尝试重新登录...');
            PT.qnlogin.logout();
            this.hasLogin = PT.qnlogin.isLocalSessOk;
            window.location.href = decodeURIComponent(PT.config.loginJumpBackUrl);
        }
    },

    mounted: function (){
        const self = this;

        //【业务逻辑入口改到这里了！！！】 
        PT.apiClient.query(SvrApi.loginUserInfo, '',  function(rsp) {
            if (rsp.code == 0) {
                //debugger;
                console.log(rsp);
                //self.commonSetLocalDataNew('rsp',rsp);
                // if(agentType == 5){
                //     this.$router.push('/aboutHotel');
                // }else{
                //     this.$router.push('/aboutHotel');
                // }
                self.getUserInfo();
            }else{
                alert('获取用户信息错误！');
            }
        });
    },


    data: function() {
        return {
            hasLogin : false,
            user_title : '未登录',
            msg:""
        }
    },


    methods: {
        // -- 这坨是登录的 --
        handleCheckLoginInfoFail(){
            //单一用户类型，直接进入登录
            PT.qnlogin.jumpToCheck(PT.config.loginJumpBackUrl, 'merchant'); //official_staff 官方运营人员  /  agent 合作商  /  merchant 商户
            this.hasLogin = PT.qnlogin.isLocalSessOk;
        },

        handleOnLogout(rsp){
            window.location.href = decodeURIComponent(PT.config.loginJumpBackUrl);
        },

        jumpLogin(){
            console.log('jumpLogin');
            PT.qnlogin.firstCheck(PT.config.loginJumpBackUrl, this.handleCheckLoginInfoFail);
        },

        runLogout(){
            var postParams = {
                local_sess :  PT.qnlogin.getLocalSess(),
            }
            PT.apiClient.query(SvrApi.logout, postParams, this.handleOnLogout);
            PT.qnlogin.logout();

            this.hasLogin = PT.qnlogin.isLocalSessOk;
        },

        // -- 这坨是菜单的 -- 
        goPage(routePath){
            //todo 先鉴权
            this.$router.push(routePath);
        },
        //判断酒店足浴
        getUserInfo:function(){
            var self = this;
            PT.apiClient.query("bz-mix/bz/get-base-info", '',  function(rsp) {
                if (rsp.code == 0) {
                    //globalData.agentType = rsp.data.agentType;//5代表酒店7代表足浴
                    if(!!rsp.data.agentType && rsp.data.agentType == 5){
                         self.$router.push('/homepage');
                    }else if(!!rsp.data.agentType && rsp.data.agentType == 7){
                         self.$router.push('/footbath');
                    }else{}
                }else{
                    alert('获取用户信息错误！!');
                } 
            });
        },
    },
    //组件实例创建完成
    created:function(){
      const aaa = this.$loading({
        fullscreen: true,
        text:"拼命加载中..."
      });

      setTimeout(function(){
          aaa.close()
      },1000)
    },
    components:{
        vHead
    },
    watch:{
      '$route.path':function (to, from) {
          console.log('sss');
          console.log(to);
          console.log(from);
      }
    }
}

</script>

<style >
    body{margin: 0;width:100%;height:100%;}
    #app {
      width:100%;
      margin: 0 auto;
      font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
    }
    /* 主内容区 */
   /* main{    display: -webkit-box;  display: -ms-flexbox;  display: flex;  min-height: 800px;  border: solid 1px #E9ECF1;  background-color: #FCFCFC;  }
    main .main-left{text-align: center;width: 200px;float: left;}
    main .main-right{-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff; padding: 50px 70px; }
    main .el-menu{background-color: transparent!important;}*/

    .content{
      position: absolute;
      top:80px;
      left:0px;
      width:100%;
      padding:0px;
    }
</style>
