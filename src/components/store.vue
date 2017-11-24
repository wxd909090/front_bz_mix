<template>
  <div class="navigation">
    <!-- 内容列表 -->
    <div class="section">
      <div class="sectionone">
        <button class="active">足浴门店</button>
        <button>酒店门店</button>
      </div>
      <div class="sectiontwo">
        <input type="text" placeholder="搜索门店">
        <select name="" id="">
          <option value="" selected="selected">门店区域</option>
        </select>
        <span>足浴：正常60 冻结2 过期4</span>
        <button @click="clickaddstore">新增门店</button>
      </div>
      <el-table class="storeListTable" v-loading.body="loading" element-loading-text="拼命加载中" :data="storeData" border>
        <el-table-column label="门店" width="">
          <template scope="scope">
            <span @click="storedetail(scope.row)" class="addunderline">{{ scope.row.agent_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="老板/电话" width="">
          <template scope="scope">
            <span>{{scope.row.boss_name}}/{{ scope.row.agent_tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="">
          <template scope="scope">
            <span>{{ scope.row.login_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" width="">
          <template scope="scope">
            <span>{{ scope.row.agent_address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="">
          <template scope="scope">
            <span>{{ scope.row.agentType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="影视系统/服务器" width="">
          <template scope="scope">
            <span>{{scope.row.systemType}}{{scope.row.is_company_server}}</span>
          </template>
        </el-table-column>
        <el-table-column label="授权日期" width="" style="text-align: center">
          <template scope="scope" style="text-align: center">
            <span>{{scope.row.addtime}}</span>
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
    <!-- 新增门店 -->
    <div class="storedetail">
      <el-dialog title="新增门店" v-model="addstore" style="width:100%">
        <el-form :model="addstoreinfo" status-icon :rules="rules3" ref="addstoreinfo" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分店类型" prop="agentType">
            <el-select v-model="addstoreinfo.agentType" placeholder="请选择分店类型" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="影视系统" prop="systemType">
            <el-select v-model="addstoreinfo.systemType" placeholder="请选择影视系统" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店名称" prop="agent_name">
            <el-input type="text" v-model="addstoreinfo.agent_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="老板名称" prop="boss_name">
            <el-input type="text" v-model="addstoreinfo.boss_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="老板电话" prop="agent_tel">
            <el-input type="text" v-model="addstoreinfo.agent_tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="门店合作商" prop="agent_guid">
            <el-select v-model="addstoreinfo.agent_guid" placeholder="请选择合作商" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授权日期" prop="distime">
              <el-date-picker v-model="addstoreinfo.distime" type="date" placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="门店状态" prop="status">
            <el-radio-group v-model="addstoreinfo.status">
              <el-radio label="1">正常</el-radio>
              <el-radio label="2">冻结</el-radio>
              <el-radio label="3">过期</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择省份" prop="parentRegion">
            <el-select v-model="addstoreinfo.parentRegion" placeholder="请选择省份" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市区" prop="region">
            <el-select v-model="addstoreinfo.region" placeholder="请选择市区" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="agent_address">
            <el-input type="text" auto-complete="off" v-model="addstoreinfo.agent_address" placeholder="请输入具体地址"></el-input>
          </el-form-item>
          <el-form-item label="门店账号" prop="login_name">
            <el-input type="text" v-model="addstoreinfo.login_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号密码" prop="login_pass">
            <el-input type="text" v-model="addstoreinfo.login_pass" auto-complete="off">ibihhhuihuui</el-input>
          </el-form-item>
          <el-form-item label="服务器" prop="server">
            <el-radio-group v-model="addstoreinfo.server">
              <el-radio label="4">公司</el-radio>
              <el-radio label="5">商家</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备详情" prop="checkPass">
            <div class="equipment">
              <el-input>
                <template slot="prepend">投影</template>
              </el-input>
              <el-input>
                <template slot="prepend">其他</template>
              </el-input>
              <el-input>
                <template slot="prepend">服务器</template>
              </el-input>
            </div>
          </el-form-item>
          <div class="changepo">
            <button class="add" @click="addstorefc('addstoreinfo')">确定</button>
            <button class="add">关闭</button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <!-- 门店编辑 -->
    <div class="storedetail">
      <el-dialog title="门店详情" v-model="showstoredetail" style="width:100%">
        <el-form :model="seedetail" status-icon :rules="rules3" ref="seedetail" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分店类型" prop="agentType">
            <el-select v-model="seedetail.agentType" placeholder="请选择分店类型" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="影视系统" prop="systemType">
            <el-select v-model="seedetail.systemType" placeholder="请选择影视系统" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店名称" prop="agent_name">
            <el-input type="text" v-model="seedetail.agent_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="老板名称" prop="boss_name">
            <el-input type="text" v-model="seedetail.boss_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="老板电话" prop="agent_tel">
            <el-input type="text" v-model="seedetail.agent_tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="门店合作商" prop="agent_guid">
            <el-select v-model="seedetail.agent_guid" placeholder="请选择合作商" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授权日期" prop="distime">
              <el-date-picker v-model="seedetail.distime" type="date" placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="门店状态" prop="status">
            <el-radio-group v-model="seedetail.status">
              <el-radio label="1">正常</el-radio>
              <el-radio label="2">冻结</el-radio>
              <el-radio label="3">过期</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择省份" prop="parentRegion">
            <el-select v-model="seedetail.parentRegion" placeholder="请选择省份" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市区" prop="region">
            <el-select v-model="seedetail.region" placeholder="请选择市区" class="selectwidth">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="agent_address">
            <el-input type="text" auto-complete="off" v-model="seedetail.agent_address" placeholder="请输入具体地址"></el-input>
          </el-form-item>
          <el-form-item label="门店账号" prop="login_name">
            <el-input type="text" v-model="seedetail.login_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号密码" prop="login_pass">
            <el-input type="text" v-model="seedetail.login_pass" auto-complete="off">ibihhhuihuui</el-input>
          </el-form-item>
          <el-form-item label="服务器" prop="server">
            <el-radio-group v-model="seedetail.server">
              <el-radio label="4">公司</el-radio>
              <el-radio label="5">商家</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备详情" prop="checkPass">
            <div class="equipment">
              <el-input>
                <template slot="prepend">投影</template>
              </el-input>
              <el-input>
                <template slot="prepend">其他</template>
              </el-input>
              <el-input>
                <template slot="prepend">服务器</template>
              </el-input>
            </div>
          </el-form-item>
          <div class="changepo">
            <button class="add" @click="changestore('seedetail')">确定</button>
            <button class="add">关闭</button>
          </div>
        </el-form>
      </el-dialog>
    </div>
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
      radio: "1",
      addstoreinfo:{
        status:"1",
        server:"4"
      },
      datevalue: "",
      conmmonpage: 0,
      searchstring: '',
      showDialog: false,
      showstoredetail: false,
      seedetail: {},
      addstore: false,
      rules2: {
        store_name: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
      },
      rules3: {
        agentType: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        systemType: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        agentType: [
          { required: true, message: '请选择分店类型', trigger: 'change' }
        ],
        systemType: [
          { required: true, message: '请选择影视系统', trigger: 'change' }
        ],
        agent_guid: [
          { required: true, message: '请选择门店合作商', trigger: 'change' }
        ],
        parentRegion: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择市区', trigger: 'change' }
        ],
        status:[
          { required: true, message: '请选择门店状态', trigger: 'change' }
        ],
        server:[
          { required: true, message: '请选择服务器', trigger: 'change' }
        ],
        distime: [
          { type:'date',required: true, message: '请选择授权日期', trigger: "change" }
        ],
        agent_name: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        boss_name: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        agent_tel: [{ required: true, validator: formCheck.checkContactNumber, trigger: 'blur' }],
        agent_address: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        login_name: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
        login_pass: [{ required: true, validator: formCheck.checkEmpty, trigger: 'blur' }],
      },
      storeData: [{ agent_name: "测试门店", area: "四川省成都市" }],
    }
  },
  mounted: function() {
    // 获取门店信息
    var data = {
      // agent_name:'测试门店'	,
      // parentRegion:1000,
      agentType: 1,
      // page:	1,
      // page_size:10
    }
    http.authHttp.post(base.api.getstorelist, data).done(function(res) {
      if (res.code == 0) {
        console.table(res.data.data)

      } else {

      }
    });
  },
  methods: {
    // 增加门店
    addstorefc(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("表单正确")
          http.authHttp.post(base.api.addstoreinfo, data).done(function(res) {
            if (res.code == 0) {

            } else {

            }
          });
        } else {
          alert('error submit!');
          return false;
        }
      });
    },
    // 修改门店信息
    changestore(formName) {
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
    // 弹出新增门店
    clickaddstore() {
      this.addstore = true;
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
    // 日期选择
    datechoice() {

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
.sectionone {
  height: 80px;
  background-color: #CFCFCF;
  color: black;
}

.sectionone button {
  width: 240px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding: 0;
  border: none;
  margin-top: 15px;
  cursor: pointer;
}

.sectionone :first-child {
  margin-left: 30px;
}

.sectionone :last-child {
  margin-left: 200px;
}

.sectionone .active {
  color: white;
  background-color: #66cc00;
}

.sectiontwo {
  height: 35px;
  background: white;
  color: black;
  padding: 7.5px 0
}

.sectiontwo input {
  height: 30px;
  width: 220px;
}

.sectiontwo select {
  height: 35px;
  width: 220px;
  margin-left: 30px;
}

.sectiontwo span {
  display: inline-block;
  height: 35px;
  width: 220px;
  margin-left: 75px;
}

.sectiontwo button {
  border: none;
  padding: 0;
  height: 35px;
  width: 120px;
  border-radius: 5px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
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

.setbg {
  background-color: #EBEBEB;
}

.selectwidth {
  height: 35px;
  width: 40%;
  overflow-x: hidden;
}

.setbottom {
  margin-bottom: 15px;
}

.changepo {
  text-align: center;
}

.storedetail .add {
  border: none;
  padding: 0;
  height: 35px;
  width: 120px;
  border-radius: 5px;
  cursor: pointer;
}

.changepo :last-child {
  margin-left: 100px;
}
</style>
