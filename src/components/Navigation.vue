<template>
  <div class="navigation">
    <!-- 导航 -->
    <div class="nav">
      <div class="navone">
        青柠微影合作商管理系统
      </div>
      
      <ul class="navfour">
        <li class="navfourlione">
          <img src="../../static/basicimg/user.png" alt="">
        </li>
        <li class="setbg">ming</li>
        <li @click="changepass()" class="setbg">修改密码</li>
        <li @click="logout()" class="setbg">退出</li>
      </ul>
      <ul class="navthree">
        <li @click="clickstore()" :class="tabnum==1 ? 'active':''">
          门店管理
        </li>
        <li @click="clickcooperation()" :class="tabnum==2 ? 'active':''">
          合作商
        </li>
      </ul>
      <ul class="navtwo">
        <li>门店：10</li>
      </ul>
    </div>
    <!--修改密码-->
    <div class="pass">
      <el-dialog title="修改密码" v-model="showDialog" style="width:100%">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import http from '../http/http_base.js'
import base from '../evn.js';
import formCheck from '../common/formCheck.js'
export default {
  name: "Navigation",
  data: function() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 初始化等待动画
      loading: false,
      //分页改变时的页码,
      pagesize: 0,
      currentpage: 0,
      searchcontent: '',
      selected: '',
      //总的页数
      totalm: 0,
      conmmonpage: 0,
      searchstring: '',
      showDialog: false,
      showstoredetail: false,
      seedetail: [],
      tabnum:1,
      ruleForm2: {
        pass: '',
        checkPass: '',
      },
      storeData: [{ store_name: "测试门店", area: "四川省成都市" }],
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  mounted: function() {
    var self=this;
    self.clickstore ();
  },
  methods: {
    // 点击门店
    clickstore (e) {
      console.log(e)
        this.$router.push('/store');
        this.tabnum=1
    },
    // 点击合作商
    clickcooperation () {
        this.$router.push('/cooperation');
        this.tabnum=2
    },
    submitForm(formName) {
      var self=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("密码一直")
          var data={
            guid:1,
            new_pwd:self.ruleForm2.pass,
            repeat_new_pwd:self.ruleForm2.checkPass
          }
          http.authHttp.post(base.api.changepass,data).done(function(res) {
            if (res.code == 0) {
              console.table(res.data.data)

            } else {
              console.log(res.msg)
            }
          });
        } else {
          alert('error submit!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改密码
    changepass() {
      this.showDialog = true;
    },
    //  退出登录
    logout() {
      this.$router.push('/');
      this.commondelLocalAllData();
    },
    // 查看详情
    storedetail(detail) {
      var self = this;
      self.showstoredetail = true;
      console.log(detail)
      var val = JSON.parse(JSON.stringify(detail));
      self.seedetail = val
    },
    //      分页-页数改变时
    handleCurrentChange(val) {
      // var self = this;
      // self.conmmonpage = val
      // var token = this.commonGetLocalAllData().token;
      // var data = {
      //   page: parseInt(val),
      //   key_word: self.searchcontent,
      //   token: token
      // }
      // http.authHttp.post("zyu/oss/store/list/get", data).done(function(res) {
      //   if (res.code == 0) {
      //     //            console.log(res);
      //     self.totalm = parseInt(res.data.total);
      //     self.pagesize = parseInt(res.data.page_size);
      //     self.currentpage = parseInt(val);
      //     self.storeData = res.data.data;
      //   } else {

      //   }
      //   if (res.code == 10006) {
      //     self.$alert("身份已过期,请重新登录");
      //     self.$router.push('/');
      //   }
      // });
    },
  },
}
</script>
<style scoped>
.navigation {
  width: 1200px;
  margin: auto;
}

.navigation .nav {
  width: 1200px;
  margin: auto;
  height: 65px;
  color:white;
  background-color: #66cc00;
}

.navigation .nav .navone {
  display: inline-block;
  width: 200px;
  height: 100%;
  text-align: center;
  line-height: 65px;
  float: left;
  color: white;
}

.navigation .nav ul {
  height: 100%;
  list-style: none;
  padding: 0;
}

.navigation .nav ul li {
  list-style: none;
  height: 100%;
  padding: 0;
}

.navigation .nav .navtwo li {
  float: left;
  line-height: 65px;
  margin-left: 15px;
}

.navigation .nav .navthree li {
  line-height: 65px;
  margin-left: 80px;
  float: left;
  cursor: pointer;
}

.navigation .nav .navtwo {
  display: inline-block;
  float: right;
  padding: 0 30px;
}

.navigation .nav .navthree {
  display: inline-block;
  float: right;
  padding: 0 20px;
  margin-right: 80px;
  color:black;
}
.navigation .nav .navthree .active{
  color: white;
}
.navigation .nav .navfour {
  display: inline-block;
  float: right;
  max-width: 100px;
  overflow: hidden;
}

.navigation .nav .navfour:hover {
  overflow: visible;
}

.navigation .nav .navfour .navfourlione {
  height: 47.5px;
  line-height: 47.5px;
}

.navigation .nav .navfour img {
  display: block;
  margin: auto;
  width: 30px;
  height: 30px;
  margin-top: 17.5px;
}

.navigation .nav .navfour li{
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
  color: black;
}
</style>
