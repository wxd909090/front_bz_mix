<template>
	<div class="header locationR">
		<div class="logo lef">青柠微影{{hotelfootbath}}商家后台</div>
        <div class="storeName lef">
            <p class="lef">门店：</p>
            <p class="lef" style="margin-right:20px;">{{storeName}}</p>
            <p class="lef">合作商:</p>
            <p class="lef" style="margin-right:20px;">{{merchatName}}</p>
            <p class="lef">电话:</p>
            <p class="lef">{{phoneNumber}}</p>
            <!-- <p class="lef">{{childmsg}}</p> -->
        </div>
        <div class="mask locationA" style="width:80px;height:80px;right:0px;top:0px;z-index:10000;background:rgba(255,255,255,0);" v-if="mask"></div>
        <div class="user-info rig">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="icon iconfont icon-touxiang user-logo" style="font-size:30px;color:#ccc;"></i>
                    <p>{{username}}</p>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="changeWord">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="storeDay rig"><p class="lef">已使用<i class="numI">{{useDay}}</i>天</p><p class="lef">还剩余<i class="numI">{{lastDay}}</i>天</p></div>
        <el-dialog title="修改密码" :visible.sync="aaa">
            <div>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                  <el-form-item label="新密码">
                    <el-input v-model="form.onePassword"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="form.twoPassword"></el-input>
                  </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="dialogSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import EnvBase from '../../env.js';
    import SvrApi from '../../svrapi.js';

    //import globalData from '../../http/globalData.js';
var PT = EnvBase.PT;

	export default {
    props: {
        childmsg: {
            type: String,
            default: "" 
        }
    },
    data: function (){
        return {
            storeName:"",
            merchatName:"",
            phoneNumber:"",
            username:"",
            hotelfootbath:"",
            useDay:"",
            lastDay:"",

            aaa:false,
            form:{
                onePassword:"",
                twoPassword:""
            },
            rules: {
              onePassword: [
                  {required: true, message: '请输入用户名', trigger: 'blur' }
              ],
              twoPassword: [
                  {required: true, message: '请输入密码', trigger: 'blur' }
              ],
            },
            mask:"false"
            
        }
    },
    created:function(){
        
    },
    mounted:function(){
        var self = this;
        self.getUserInfo();
    },
    methods: {
        getUserInfo:function(){
            var self = this;
            PT.apiClient.query("bz-mix/bz/get-base-info", '',  function(rsp) {
                if (rsp.code == 0) {
                    console.log(rsp);
                    self.storeName = rsp.data.agent_name;
                    self.merchatName = rsp.data.qnbar_agent_name;
                    self.phoneNumber = rsp.data.qnbar_agent_tel;
                    self.username = rsp.data.login_name;
                    self.useDay = rsp.data.useDay;
                    self.judgehotelorfootbath(rsp.data.agentType); 
                    if(rsp.data.distime == '4070880000'){
                        self.lastDay = "永久";
                    }else{
                        self.lastDay = rsp.data.lastDay;
                    }
                    //globalData.agentType = rsp.data.agentType;//5代表酒店7代表足浴
                }else{
                    alert('获取用户信息错误！');
                } 
            });
        },
        changePassword:function(data){
            var self = this;
            PT.apiClient.query("bz-mix/bz/change/pwd", data,  function(rsp) {
                if (rsp.code == 0) {
                   self.$alert("修改成功", '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        
                      }
                    });
                }else{
                    self.$alert("修改失败", '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        
                      }
                    });
                } 
            });
        },
        handleCommand:function(command) {
            
            var self = this;
            if(command == 'loginout'){
                self.runLogout();
            }else{
                self.aaa = true;
                // debugger;
                // var data = {};
                // data['new_pwd'] = self.form.onePassword;
                // data['repeat_new_pwd'] = self.form.twoPassword;
                // self.changePassword(data); 
            }
        },
        dialogClose:function(){
            var self = this;
            self.aaa = false;
            console.log(self.form.onePassword);
        },
        dialogSure:function(){
            var self = this;
            self.aaa = false;
            console.log(self.form.twoPassword);
            var data = {};
            data['new_pwd'] = self.form.onePassword;
            data['repeat_new_pwd'] = self.form.twoPassword;
            self.changePassword(data);
        },
        runLogout:function(){
            var postParams = {
                local_sess :  PT.qnlogin.getLocalSess(),
            }
            PT.apiClient.query(SvrApi.logout, postParams, this.handleOnLogout);
            PT.qnlogin.logout();
        },
        handleOnLogout:function(rsp){
            window.location.href = decodeURIComponent(PT.config.loginJumpBackUrl);
        },
        judgehotelorfootbath:function(data){
            var self = this;
            if(!!data){
                if(data == 5){
                    self.hotelfootbath = "酒店";
                }else if(data == 7){
                    self.hotelfootbath = "足浴";
                }
            }
        }
    },
    // ,
    // computed:{
    //     username(){
    //         if(!!JSON.parse(this.commonGetLocalDataNew('rsp')).data.merchant_name){
    //             var username = JSON.parse(this.commonGetLocalDataNew('rsp')).data.merchant_name;
    //         }
    //         return username ? username : this.name;
    //     }
    // },
   //监听路由
    watch:{

      'childmsg':function (newVal, oldVal) {
            var self = this;
          if(!!newVal){
            self.mask = false;
            console.log(newVal+"198");
          }else{
            self.mask = true;
          }
      }
    }
  }
</script>

<style scoped>
	/* 头部导航 */
    .header{
        height:80px;
        width:100%;
        min-width: 1200px;
        transition: all 0.5s ease;
        background-color: #ebebeb;  
        /*box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);*/
    }
    .lef{float:left;}
    .rig{float:right;}

    .header .logo{
        width:240px;
        text-align: center;
        height:80px;
        line-height:80px;
        background:#00cc00;
        font-size:20px;
        color:#fff;
    }
    .header .storeName{
        width:700px;
        text-align: center;
        height:80px;
        line-height:80px;
        margin-left:20px;
    }
    .header .storeDay{
        text-align: center;
        height:80px;
        line-height:80px;
    }
    .header .storeDay p{
        display:block;
        text-align: center;
        height:80px;
        line-height:80px;
        font-size:18px;
        color:#323232;
        padding-right:20px;
    }
    .header .storeDay p i{
        font-size:24px;
        font-style: normal;
    }
    .header .user-info {
        width:80px;
        height:80px;
        line-height:80px;
        text-align:center;
    }
    .header .user-info .el-dropdown-link{
        display:block;
        width:80px;
        height:80px;
        line-height:80px;
        text-align:center;
    }
    .header .user-info .el-dropdown-link .user-logo{
        width:80px;
        height:50px;
        line-height:50px;
        text-align:center;
        display:block;
        border:0px;
    }
    .header .user-info .el-dropdown-link p{
        display:block;
        width:80px;
        height:30px;
        line-height:30px;
        text-align:center;
        color:#323232;
    }


    /*.user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }*/

</style>