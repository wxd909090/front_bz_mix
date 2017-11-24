<template>
  <div class="navigation">
    <!-- 内容列表 -->
    <div class="section">
      <div class="sectionone">
        <input type="text" v-model="searchstring" placeholder="请输入门店名称搜索" class="searchinput">
        <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
        <button class="add" @click="addcooper">新增</button>
      </div>
      <el-table class="storeListTable" v-loading.body="loading" element-loading-text="拼命加载中" :data="storeData" border>
        <el-table-column label="门店" width="">
          <template scope="scope">
            <span @click="storedetail(scope.row)" class="addunderline">{{ scope.row.store_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="老板/电话" width="">
          <template scope="scope">
            <span>李波 18725891602</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="">
          <template scope="scope">
            <span>chenliang</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" width="">
          <template scope="scope">
            <span>{{ scope.row.area}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="">
          <template scope="scope">
            <span>公司直营</span>
          </template>
        </el-table-column>
        <el-table-column label="影视系统/服务器" width="">
          <template scope="scope">
            <span>爱奇艺/公司</span>
          </template>
        </el-table-column>
        <el-table-column label="授权日期" width="" style="text-align: center">
          <template scope="scope" style="text-align: center">
            <span>2017-09-05</span>
          </template>
        </el-table-column>
        <el-table-column label="使用/剩余天数" width="">
          <template scope="scope">
            <span @click="updatemovie(scope.$index,scope.row)" class="changeec">124/252</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="">
          <template scope="scope">
            <span @click="updatemovie(scope.$index,scope.row)" class="changeec">正常</span>
          </template>
        </el-table-column>
        <el-table-column label="定制页面" width="">
          <template scope="scope">
            <el-button type="primary" @click="updatemovie(scope.$index,scope.row)" class="changeec">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagelist">
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync=currentpage :page-size=pagesize layout="prev, pager, next, jumper" :total=totalm>
        </el-pagination>
      </div>
    </div>
    <!-- 合作商详情 -->
    <div class="storedetail">
      <el-dialog title="门店详情" v-model="showstoredetail" style="width:100%">
        <el-form :model="seecooperation" status-icon :rules="rules3" ref="seecooperation" label-width="100px" class="demo-ruleForm">
          <el-form-item label="合作商姓名" prop="agent_name">
            <el-input type="text" v-model="seecooperation.agent_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="合作商电话" prop="bind_mobile">
            <el-input type="text" auto-complete="off" v-model="seecooperation.bind_mobile"></el-input>
          </el-form-item>
          <el-form-item label="选择省份" prop="parent_region">
            <el-select v-model="seecooperation.parent_region" placeholder="请选择省份" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市区" prop="region">
            <el-select v-model="seecooperation.region" placeholder="请选择市区" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input type="text" auto-complete="off" v-model="seecooperation.address" placeholder="请输入具体地址"></el-input>
          </el-form-item>
          <el-form-item label="登录账号" prop="account_name">
            <el-input type="text" auto-complete="off" v-model="seecooperation.account_name"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="account_password">
            <el-input type="text" auto-complete="off" v-model="seecooperation.account_password"></el-input>
          </el-form-item>
          <el-form-item label="合作商来源" prop="source">
            <el-select v-model="seecooperation.source" placeholder="请选择合作商来源" class="selectwidth">
              <el-option label="青柠" value="1"></el-option>
              <el-option label="极米" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作有效期" prop="expire_time">
              <el-date-picker v-model="seecooperation.expire_time" type="date" placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="合作商状态" prop="status">
            <el-radio-group v-model="seecooperation.status">
              <el-radio label="1">正常</el-radio>
              <el-radio label="2">暂停</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="changepo">
            <button class="add" @click="submitcooper('seecooperation')">确定</button>
            <button class="add">关闭</button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <!-- 新增弹窗 -->
    <div class="storedetail">
      <el-dialog title="门店详情" v-model="addcooperationdialog" style="width:100%">
        <el-form :model="addcooperation" status-icon :rules="rules3" ref="addcooperation" label-width="100px" class="demo-ruleForm">
           <el-form-item label="合作商姓名" prop="agent_name">
            <el-input type="text" v-model="addcooperation.agent_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="合作商电话" prop="bind_mobile">
            <el-input type="text" auto-complete="off" v-model="addcooperation.bind_mobile"></el-input>
          </el-form-item>
          <el-form-item label="选择省份" prop="parent_region">
            <el-select v-model="addcooperation.parent_region" placeholder="请选择省份" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市区" prop="region">
            <el-select v-model="addcooperation.region" placeholder="请选择市区" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input type="text" auto-complete="off" v-model="addcooperation.address" placeholder="请输入具体地址"></el-input>
          </el-form-item>
          <el-form-item label="登录账号" prop="account_name">
            <el-input type="text" auto-complete="off" v-model="addcooperation.account_name"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="account_password">
            <el-input type="text" auto-complete="off" v-model="addcooperation.account_password"></el-input>
          </el-form-item>
          <el-form-item label="合作商来源" prop="source">
            <el-select v-model="addcooperation.source" placeholder="请选择合作商来源" class="selectwidth">
              <el-option label="青柠" value="1"></el-option>
              <el-option label="极米" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作有效期" prop="expire_time">
              <el-date-picker v-model="addcooperation.expire_time" type="date" placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <div class="changepo">
            <button class="add" @click="addcooperfc('addcooperation')">确定</button>
            <button class="add">关闭</button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
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
      radio: '1',
      conmmonpage: 0,
      searchstring: '',
      showDialog: false,
      datevalue: '',
      showstoredetail: false,
      addcooperationdialog: false,
      seedetail: {
        store_name: ''
      },
      addcooperation:{},
      seecooperation:{
        status:"1"
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
      },
      storeData: [{ store_name: "测试门店", area: "四川省成都市" }],
      rules3: {
        agent_name: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        bind_mobile: [{ required: true, validator: formCheck.checkContactNumber, trigger: 'blur' }],
        parent_region: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择市区', trigger: 'change' }
        ],
        address: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        account_name: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        account_password: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        source: [
          { required: true, message: '请选择合作商来源', trigger: 'change' }
        ],
        expire_time: [
          { type:'date',required: true, message: '请选择合作有效期', trigger: "change" }
        ], 
        status:[
          { required: true, message: '请选择门店状态', trigger: 'change' }
        ],
      },
      rules4: {
        store_name: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
      },
    }
  },
  mounted: function() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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

    // 显示新增弹框
    addcooper() {
      var self = this;
      self.addcooperationdialog= true;
    },
    // 新增合作商表单验证
    addcooperfc(formName) {
      var self = this;
      // console.log(detail)
      // var val = JSON.parse(JSON.stringify(detail));
      // self.seedetail = val
      // console.log(val)
       this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("表单正确")
        } else {
          alert('error submit!');
          return false;
        }
      });
    },
    // 日期选择
    datechoice() {
      var self = this;
      var start_time = new Date(self.datevalue);
      var y = start_time.getFullYear();
      var m = start_time.getMonth() + 1;
      var d = start_time.getDate();
      var start = y + "-" + m + "-" + d;
      var start = Date.parse(start) / 1000
      self.datesubmit = start;
      console.log(self.datesubmit)
    },

    // 显示详情弹框
    storedetail(){
      this.showstoredetail=true;
    },
     // 查看详情表单验证
    submitcooper(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("表单正确")
        } else {
          alert('error submit!');
          return false;
        }
      });
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
  color: black;
  background-color: #DADADA;
}

.navigation .nav .navone {
  display: inline-block;
  width: 200px;
  height: 100%;
  text-align: center;
  line-height: 65px;
  background-color: #66cc00;
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
  margin-left: 15px;
  float: left;
}

.navigation .nav .navtwo {
  display: inline-block;
  float: left;
  padding: 0 30px;
}

.navigation .nav .navthree {
  display: inline-block;
  float: right;
  padding: 0 20px;
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

.navigation .nav .navfour li {
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
}

.searchinput {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.sectionone {
  padding: 30px 0;
}

.sectionone .add {
  border: none;
  padding: 0;
  height: 35px;
  width: 120px;
  border-radius: 5px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
}

.storedetail .add {
  border: none;
  padding: 0;
  height: 35px;
  width: 120px;
  border-radius: 5px;
  cursor: pointer;
}

.changepo {
  text-align: center;
}

.changepo :last-child {
  margin-left: 100px;
}

.navigation .addunderline {
  text-decoration: underline;
  cursor: pointer;
}

.equipment span {
  display: inline-block;
  width: 60px;
  height: 20px;
  text-align: center;
  border-radius: 4px;
  background: #D8D8D8;
  margin: 5px 0;
}

.selectaddress {
  height: 35px;
  width: 40%;
  margin-bottom: 15px;
  overflow-x: hidden;
}

.selectsource {
  height: 35px;
  width: 46%;
  margin-bottom: 15px;
}
</style>
