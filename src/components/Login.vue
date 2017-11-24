<template>
  <div class="login-wrap">
    <!-- body  -->
    <div class="login_body">
      <img class="body_box_top_img" src="/../../static/basicimg/logo.png" />
      <div class="login_body_title">青柠微影合作商管理系统</div>
      <!-- 标签页里放表格 -->
      <div class="login_body_box_form">
        <el-form :model="acountForm" :rules="acountRules" ref="acountForm" label-background="#66cc00" class="form_box">
          <el-form-item prop="acount" label="账号">
            <el-input v-model="acountForm.acount" placeholder="账号">
              <!-- <template slot="prepend"><i class="iconfont icon-ren"></i></template> -->
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="acountForm.password" placeholder="密码">
              <!-- <template slot="prepend"><i class="iconfont icon-suomiao"></i></template> -->
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('acountForm')">登录</el-button>
          </div>
        </el-form>
        <el-popover class="popoverBox" placement="bottom" width="200" trigger="click" content="忘记密码请联系相关技术人员">
          <el-button slot="reference">？</el-button>
        </el-popover>
      </div>
      <div class="login_body_bottom">
        <div class="login_body_bottom_box">
          <p></p>
          <p>欢迎使用青柠微影系统</p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from '../http/http_base.js'
import md5 from 'js-md5';
import base from '../evn.js';
export default {
  name: 'Login',
  mounted: function() {
    var self = this;
    self.commondelLocalAllData();
  },
  data: function() {
    return {
      dialogFormVisible: false,
      acountForm: {
        acount: '',
        password: ''
      },
      acountRules: {
        acount: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      fullscreenLoading: false
    }
  },
  methods: {
    //      提交登录信息
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.acountForm.password = md5(self.acountForm.password)
          var data = {
            name: self.acountForm.acount,
            pwd: self.acountForm.password,
          };
          // 打开等待动画
          self.fullscreenLoading = true;
          // ajax请求
          http.authHttp.post(base.api.login, data).done(function(res) {
            if (res.code == 0) {
              self.fullscreenLoading = false;
              var localData = {
                name: data.name,
                token: res.data.token,
              }
              self.commonSetLocalData(localData);
              self.$router.push('/Navigation');
            } else {
              self.fullscreenLoading = false;
              self.$alert(res.msg, '提示');
              self.acountForm.password = '';
            }
          });
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style >
.login-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.el-input {
  height: 40px;
}

.login-wrap .login_body {
  width: 570px;
  overflow: hidden;
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -285px;
}

.login-wrap .login_body .body_box_top_img {
  display: block;
  width: 126px;
  height: 130px;
  margin-bottom: 30px;
  margin-left: 222px;
}

.login-wrap .login_body .login_body_title {
  display: block;
  width: 570px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  color: #fff;
  background: #66cc00;
}

.login-wrap .login_body .login_body_box_form {
  display: block;
  width: 570px;
  height: 280px;
  background: #e5e5e5;
  overflow: hidden;
  position: relative;
}

.login-wrap .login_body .login_body_box_form .popoverBox {
  position: absolute;
  bottom: 129px;
  right: 15px;
}

.login-wrap .login_body .login_body_box_form .form_box {
  display: block;
  width: 418px;
  overflow: hidden;
  margin-top: 32px;
  margin-left: 76px;
}

.login-wrap .login_body .login_body_box_form .form_box .el-button {
  display: block;
  width: 418px;
  background: #66cc00;
  border: 0px;
  font-size: 20px;
  height: 38px;
  line-height: 38px;
  padding: 0px;
  margin-top: 30px;
}

.login-wrap .login_body .login_body_box_form .form_box .el-button span {
  display: block;
  font-size: 20px;
  height: 38px;
  line-height: 38px;
}

.login_body .login_body_box_form .form_box .el-form-item {
  margin-bottom: 40px;
}



/*label样式*/

.login_body .login_body_box_form .form_box .el-form-item .el-form-item__label {
  text-align: center;
  vertical-align: middle;
  background: #66cc00;
  padding: 0px;
  margin-right: 12px;
  width: 128px;
  color: #fff;
  line-height: 40px;
  font-size: 20px;
}

.login_body .login_body_box_form .form_box .el-form-item .el-form-item__content {
  width: 278px;
  float: left;
}

.login_body .login_body_box_form .form_box .el-form-item .el-form-item__label:before {
  content: ''!important;
  color: #fff;
}

.login-wrap .login_body .login_body_bottom {
  width: 100%;
  height: 48px;
  position: relative;
}

.login-wrap .login_body .login_body_bottom .login_body_bottom_box {
  width: 442px;
  height: 48px;
  position: absolute;
  top: 0px;
  left: 50%;
  margin-left: -221px;
  overflow: hidden;
}

.login-wrap .login_body .login_body_bottom .login_body_bottom_box p:nth-child(1) {
  width: 102px;
  height: 2px;
  margin-top: 23px;
  background: #888888;
  float: left;
}

.login-wrap .login_body .login_body_bottom .login_body_bottom_box p:nth-child(2) {
  width: 238px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  float: left;
}

.login-wrap .login_body .login_body_bottom .login_body_bottom_box p:nth-child(3) {
  width: 102px;
  height: 2px;
  margin-top: 23px;
  background: #888888;
  float: left;
}

.el-input__inner {
  height: 40px !important;
}

.el-button {
  padding: 11px 15px;
}
</style>
