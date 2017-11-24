<template>
  <div id="appHotelIndex">
    <div class="section_one">
      <div class="section_one_bottom">
        <div class="section_one_bottom_img locationR">
          <p><img v-bind:src="logoPic"></p>
          <i @click="deleteLogo" class="icon iconfont icon-shanchu1 locationA" style="z-index:10000;"></i>
          <p class="section_one_bottom_p">logo尺寸200*86</p>
        </div>
        <div id="ossfile"></div>
        <div id="uploadContainer">
            <a id="selectfilesBtn" class='uploadbtn btn'>更换LOGO</a>
        </div>
      </div>
    </div>
    <div class="section_two">
      <ul>
        <li class="lef  locationR" v-for="(item,$index) in listImgDataObj">
          <p class="one_p mouse-Up"><i class="b7" @click="openChildPage(item.type,item.name)" v-if="item.open">打开</i></p>
          <p class="two_p"><img v-bind:src="item.pic.file_path"></p>
          <p class="picTest  locationA" style="top:393px;width:100%;height:30px;line-height:30px;text-align:center;color:#fff;">{{item.pic.file_name}}</p>
          <div v-bind:id="ossfileObj[$index]"></div>
          <br/>
          <div v-bind:id="uploadContainerObj[$index]" class="commonUploadContainer">
            <a @click="changeName(item.pic.file_name,$index)" href="javascript:void(0);" class='btn commonBtnLeft'>{{item.name}}</a>
            <a v-bind:id="selectfilesBtnObj[$index]" href="javascript:void(0);" class='btn commonBtnRight '>更换</a>          </div>
          <i class="icon iconfont icon-shanchu1 locationA" @click="deleteListPic($index,item.pic.file_path)" style="top:35px;"></i>
        </li>
      </ul>
      <p class="introduceP">注：可以修改模块名称，模块图尺寸为340*620，请按照尺寸上传图片，其他尺寸会影响显示效果。图片格式只能是jpg或者png,单张图片大小不要过2M，删除图片点击模块右上角"X"</p>
    </div>
    <div class="section_three">
      <div class="section_three_top">
        <p class="section_three_top_lef">背景图</p>
        <p class="section_three_top_rig">注:上传图的尺寸为1920*1080，其它尺寸会影响显示效果,图片格式只能为jpg或png,图片大小不要超过2M</p>
      </div>
      <div class="section_three_bottom locationR">
        <p><img v-bind:src="backgroundPic?backgroundPic:''"></p>
        <i @click="deleteBackgroundPic" class="icon iconfont icon-shanchu1 locationA" style="left:431.6px;"></i>
      </div>

      <div id="ossfile2"></div>
      <br/>
      <div id="uploadContainer2">
        <a id="selectfilesBtn2" href="javascript:void(0);" class='btn'>更换</a>
        <!-- <a id="postfilesBtn2" href="javascript:void(0);" class='btn'>开始上传</a> -->
      </div>
    </div>
    <div class="section_four">
      <button class="section_four_btn">滚动字幕</button>
      <p v-if="textNumShow">{{textNum}}</p>
      <div  class="section_four_txt">
        <textarea placeholder="请输入滚动文字 0/140" v-model="textWords">{{allData.introduce}}</textarea>
        <button @click="changeRollingWords" class="b7" style="border:1px solid #ccc;">确定</button>
      </div>
    </div>

    <el-dialog title="修改名字" :visible.sync="aaa">
        <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="旧名字">
                <el-input v-model="form.oldName" disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item label="新名字">
                <el-input v-model="form.newName"></el-input>
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
    import md5 from 'js-md5';
    import http from '../../http/Http_base.js';
    import globalData from '../../http/globalData.js';
    import func from '../../common/func.js';

    //必定有的import ...
    import EnvBase from '../../env.js'
    import SvrApi from '../../svrapi.js'
    import QnUploadDefine from '../../vendor/qnbar/qnupload.js'
    var PT = EnvBase.PT;

    export default {
        data: function (){
            return {
              allData:"",
              logoImgDataObj:{},
              listImgDataObj:{},
              backgroundImgDataObj:{},
              openType:true,
              aaa:false,
              form:{
                oldName:"",
                newName:""
              },  
                
              logoPic:"",
              backgroundPic:"",
              file_id:"",
              agentType:"",
              selectfilesBtnObj:{
                1:"selectfilesBtn3",
                2:"selectfilesBtn4",
                3:"selectfilesBtn5",
                4:"selectfilesBtn6",
                5:"selectfilesBtn7",
                6:"selectfilesBtn8",
                7:"selectfilesBtn9",
                8:"selectfilesBtn10"
              },
              ossfileObj:{
                1:"ossfile3",
                2:"ossfile4",
                3:"ossfile5",
                4:"ossfile6",
                5:"ossfile7",
                6:"ossfile8",
                7:"ossfile9",
                8:"ossfile10"
              },
              uploadContainerObj:{
                1:"uploadContainer3",
                2:"uploadContainer4",
                3:"uploadContainer5",
                4:"uploadContainer6",
                5:"uploadContainer7",
                6:"uploadContainer8",
                7:"uploadContainer9",
                8:"uploadContainer10"
              },
              postfilesBtnObj:{
                1:"postfilesBtn3",
                2:"postfilesBtn4",
                3:"postfilesBtn5",
                4:"postfilesBtn6",
                5:"postfilesBtn7",
                6:"postfilesBtn8",
                7:"postfilesBtn9",
                8:"postfilesBtn10"
              },
              bucket:"",
              file_size:"",
              file_md5:"",
              file_path:"",
              width:"",
              bucket:"",
              height:"",

              signNum:1,
              textNum:'',
              textNumShow:false,
              textWords:''
            }
        },
        created:function(){
          this.getUserInfo();//获取登陆用户数据
          this.getCustomizedData(1);//获取定制页面数据
        },
        mounted:function(){
          var self = this;
          //logo上传
          var callbackOnSuccessFuncLogo = function(){
            var data = {};
            data['file_type'] = self.logoImgDataObj['0'].type;
            data['file_name'] = self.logoImgDataObj['0'].name;
            data['file_path'] = qnUploadLogo.ossPath;
            data['file_md5'] = qnUploadLogo.md5;
            data['file_size'] = qnUploadLogo.fileSize;
            data['bucket'] = qnUploadLogo.uploadSignInfo.bucket;
            data['width'] = qnUploadLogo.imgFileWidth;
            data['height'] = qnUploadLogo.imgFileHeight;
            self.setPicFunc(data);
          }
          var qnUploadLogo = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackOnSuccessFuncLogo);
            qnUploadLogo.uploadOnSelectFile = true; //选中文件立刻上传
            qnUploadLogo.selectFileBtn = 'selectfilesBtn';
            qnUploadLogo.uploadRunBtn = 'postfilesBtn';
            qnUploadLogo.uploadContainer = 'uploadContainer';
            qnUploadLogo.ossFileDisp = 'ossfile';
          qnUploadLogo.init();
          //背景图上传
          var callbackOnSuccessFuncBackground = function(){

            var data = {};
            data['file_type'] = self.backgroundImgDataObj['9'].type;
            data['file_name'] = self.backgroundImgDataObj['9'].name;
            data['file_path'] = qnUploadBackground.ossPath;
            data['file_md5'] = qnUploadBackground.md5;
            data['file_size'] = qnUploadBackground.fileSize;
            data['bucket'] = qnUploadBackground.uploadSignInfo.bucket;
            data['width'] = qnUploadBackground.imgFileWidth;
            data['height'] = qnUploadBackground.imgFileHeight;
            self.setPicFunc(data);
          }
          var qnUploadBackground = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackOnSuccessFuncBackground);
            qnUploadBackground.uploadOnSelectFile = true; //选中文件立刻上传
            qnUploadBackground.selectFileBtn = 'selectfilesBtn2';
            // qnUploadBackground.uploadRunBtn = 'postfilesBtn2';
            qnUploadBackground.uploadContainer = 'uploadContainer2';
            qnUploadBackground.ossFileDisp = 'ossfile2';
          qnUploadBackground.init();
        },
        methods:{
          //删除logo
          deleteLogo:function(){
            console.log("删除logo");
            var that = this;
            if(!!that.logoPic){

              that.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var data = {};
                  data['file_id'] = that.logoImgDataObj['0'].pic.file_id;
                  that.deletePicFunc(data);
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });


              // that.$alert("确定删除", '提示', {
              //   confirmButtonText: '确定',
              //   callback: action => {
              //     var data = {};
              //     data['file_id'] = that.logoImgDataObj['0'].pic.file_id;
              //     that.deletePicFunc(data);
              //   }
              // });
            }else{
              that.$alert("没有上传图片不能删除", '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  console.log('sss');
                }
              });
            }
          },
          //删除背景图
          deleteBackgroundPic:function(){
            var that = this;
            if(!!that.backgroundPic){

              that.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var data = {};
                  data['file_id'] = that.backgroundImgDataObj['9'].pic.file_id;
                  that.deletePicFunc(data);
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });


              // that.$alert("确定删除", '提示', {
              //   confirmButtonText: '确定',
              //   callback: action => {
              //     var data = {};
              //     data['file_id'] = that.backgroundImgDataObj['9'].pic.file_id;
              //     that.deletePicFunc(data);
              //   }
              // });
            }else{
              that.$alert("没有上传图片不能删除", '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
              });
            }
          },
          //修改滚动字幕
          changeRollingWords:function(){
            var self = this;
            var data = {};
            data['introduce'] = $("textarea").val();
            self.changeRollingWordsFunc(data);
          },
          //点击名字调用模态款
          changeName:function(name,index){
            var self = this;
            if(!!name){
              self.form.oldName = name;
              self.aaa = true;
              self.file_id = self.listImgDataObj[index].pic.file_id;
            }else{
              self.$alert("暂时不能修改", '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
              });
            }
          },
          //点击模态框关闭
          dialogClose:function(){
            var self = this;
            self.aaa = false;
          },
          //点击模态框确定
          dialogSure:function(){
            var self = this;
            self.aaa = false;
            var data = {};
            data['file_id'] = self.file_id;
            data['file_name'] = self.form.newName;
            self.changePicName(data);
          },
          //点击打开
          openChildPage:function(type,name){
            localStorage.setItem('agent_type',this.agentType);
            localStorage.setItem('ModularType',type);
            localStorage.setItem('file_name',name);
            this.$router.push('/aboutHotel');
          },
          //删除列表图片
          deleteListPic:function(index,pic){
            var data = index;
            var that = this;
            if(!!pic){
              that.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var data = {};
                  data['file_id'] = that.listImgDataObj[index].pic.file_id;
                  that.deletePicFunc(data);
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });



              // that.$alert("确定删除", '提示', {
              //   confirmButtonText: '确定',
              //   callback: action => {
              //     var data = {};
              //     data['file_id'] = that.listImgDataObj[index].pic.file_id;
              //     that.deletePicFunc(data);
              //   }
              // });
            }else{
              that.$alert("没有上传图片不能删除", '提示', {
                confirmButtonText: '确定',
                callback: action => {
                 
                }
              });
            }
          },
          //点击更换列表图片
          // changeListPic:function(index){
          //   var self = this;
          //   var data = {};
          //   data['file_type'] = index;
          //   data['file_name'] = self.listImgDataObj[index].name;
          //   data['file_path'] = self.file_path;
          //   data['file_md5'] = self.file_md5;
          //   data['file_size'] = self.file_size;
          //   data['bucket'] = self.bucket;
          //   data['width'] = self.width;
          //   data['height'] = self.height;
          //   this.setPicFunc(data);
          // },
          //滚动字幕
          changeRollingWordsFunc:function(data){
            var that = this;
            PT.apiClient.query(SvrApi.rollWords,data,  function(res) {
              if(res.code == 0){
                 that.$alert("修改成功", '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.getCustomizedData();
                  }
                });
              }else{
                that.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    console.log('sss');
                  }
                })
              }
            });
          },
          //获取定制页面数据
          getCustomizedData:function(data){
         
            var self = this;
            var data = "";
            PT.apiClient.query(SvrApi.customer, '',  function(rsp) {
              var newData = rsp;
              console.log(newData);
              if(newData.code == 0){
                 self.allData = newData.data;
                 //拆分logo,横版图,背景图
                 self.listImgDataObj = func.copyObj1(self.allData.type);
                 self.logoImgDataObj = func.copyObj2(self.allData.type);
                 self.backgroundImgDataObj = func.copyObj3(self.allData.type);
              
                 self.logoPic = self.logoImgDataObj['0'].pic.file_path;
                 

                 self.backgroundPic = self.backgroundImgDataObj['9'].pic.file_path;
                   
                var callbackQnUpload3 = function(){
                    var data = {};
                    data['file_type'] = self.listImgDataObj['1'].type;
                    data['file_name'] = self.listImgDataObj['1'].name;
                    data['file_path'] = qnUpload3.ossPath;
                    data['file_md5'] = qnUpload3.md5;
                    data['file_size'] = qnUpload3.fileSize;
                    data['bucket'] = qnUpload3.uploadSignInfo.bucket;
                    data['width'] = qnUpload3.imgFileWidth;
                    data['height'] = qnUpload3.imgFileHeight;
                    self.setPicFunc(data);
                }
                var callbackQnUpload4 = function(){
                    var data = {};
                    data['file_type'] = self.listImgDataObj['2'].type;
                    data['file_name'] = self.listImgDataObj['2'].name;
                    data['file_path'] = qnUpload4.ossPath;
                    data['file_md5'] = qnUpload4.md5;
                    data['file_size'] = qnUpload4.fileSize;
                    data['bucket'] = qnUpload4.uploadSignInfo.bucket;
                    data['width'] = qnUpload4.imgFileWidth;
                    data['height'] = qnUpload4.imgFileHeight;
                    self.setPicFunc(data);
                }
                var callbackQnUpload5 = function(){
                    var data = {};
                    data['file_type'] = self.listImgDataObj['3'].type;
                    data['file_name'] = self.listImgDataObj['3'].name;
                    data['file_path'] = qnUpload5.ossPath;
                    data['file_md5'] = qnUpload5.md5;
                    data['file_size'] = qnUpload5.fileSize;
                    data['bucket'] = qnUpload5.uploadSignInfo.bucket;
                    data['width'] = qnUpload5.imgFileWidth;
                    data['height'] = qnUpload5.imgFileHeight;
                    self.setPicFunc(data);
                }
                var callbackQnUpload6 = function(){
                    var data = {};
                    data['file_type'] = self.listImgDataObj['4'].type;
                    data['file_name'] = self.listImgDataObj['4'].name;
                    data['file_path'] = qnUpload6.ossPath;
                    data['file_md5'] = qnUpload6.md5;
                    data['file_size'] = qnUpload6.fileSize;
                    data['bucket'] = qnUpload6.uploadSignInfo.bucket;
                    data['width'] = qnUpload6.imgFileWidth;
                    data['height'] = qnUpload6.imgFileHeight;
                    self.setPicFunc(data);
                }
                var callbackQnUpload7 = function(){

                    var data = {};
                    data['file_type'] = self.listImgDataObj['5'].type;
                    data['file_name'] = self.listImgDataObj['5'].name;
                    data['file_path'] = qnUpload7.ossPath;
                    data['file_md5'] = qnUpload7.md5;
                    data['file_size'] = qnUpload7.fileSize;
                    data['bucket'] = qnUpload7.uploadSignInfo.bucket;
                    data['width'] = qnUpload7.imgFileWidth;
                    data['height'] = qnUpload7.imgFileHeight;
                    self.setPicFunc(data);
                }
                var callbackQnUpload8 = function(){

                    var data = {};
                    data['file_type'] = self.listImgDataObj['6'].type;
                    data['file_name'] = self.listImgDataObj['6'].name;
                    data['file_path'] = qnUpload8.ossPath;
                    data['file_md5'] = qnUpload8.md5;
                    data['file_size'] = qnUpload8.fileSize;
                    data['bucket'] = qnUpload8.uploadSignInfo.bucket;
                    data['width'] = qnUpload8.imgFileWidth;
                    data['height'] = qnUpload8.imgFileHeight;
                    self.setPicFunc(data);
                }
                var callbackQnUpload9 = function(){

                    var data = {};
                    data['file_type'] = self.listImgDataObj['7'].type;
                    data['file_name'] = self.listImgDataObj['7'].name;
                    data['file_path'] = qnUpload9.ossPath;
                    data['file_md5'] = qnUpload9.md5;
                    data['file_size'] = qnUpload9.fileSize;
                    data['bucket'] = qnUpload9.uploadSignInfo.bucket;
                    data['width'] = qnUpload9.imgFileWidth;
                    data['height'] = qnUpload9.imgFileHeight;
                    self.setPicFunc(data);
                }
                var callbackQnUpload10 = function(){
                    var data = {};
                    data['file_type'] = self.listImgDataObj['8'].type;
                    data['file_name'] = self.listImgDataObj['8'].name;
                    data['file_path'] = qnUpload10.ossPath;
                    data['file_md5'] = qnUpload10.md5;
                    data['file_size'] = qnUpload10.fileSize;
                    data['bucket'] = qnUpload10.uploadSignInfo.bucket;
                    data['width'] = qnUpload10.imgFileWidth;
                    data['height'] = qnUpload10.imgFileHeight;
                    self.setPicFunc(data);
                }
                //上传
                var qnUpload3 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload3);
                  qnUpload3.uploadOnSelectFile = true; //选中文件立刻上传
                  qnUpload3.selectFileBtn = 'selectfilesBtn3';
                  // qnUpload3.uploadRunBtn = 'postfilesBtn3';
                  qnUpload3.uploadContainer = 'uploadContainer3';
                  qnUpload3.ossFileDisp = 'ossfile3';
                // qnUpload3.init();
                var qnUpload4 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload4);
                  qnUpload4.uploadOnSelectFile = true; 
                  qnUpload4.selectFileBtn = 'selectfilesBtn4';
                  // qnUpload4.uploadRunBtn = 'postfilesBtn4';
                  qnUpload4.uploadContainer = 'uploadContainer4';
                  qnUpload4.ossFileDisp = 'ossfile4';
                // qnUpload4.init();
                var qnUpload5 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload5);
                  qnUpload5.uploadOnSelectFile = true; 
                  qnUpload5.selectFileBtn = 'selectfilesBtn5';
                  // qnUpload5.uploadRunBtn = 'postfilesBtn5';
                  qnUpload5.uploadContainer = 'uploadContainer5';
                  qnUpload5.ossFileDisp = 'ossfile5';
                // qnUpload5.init();
                var qnUpload6 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload6);
                  qnUpload6.uploadOnSelectFile = true; 
                  qnUpload6.selectFileBtn = 'selectfilesBtn6';
                  // qnUpload6.uploadRunBtn = 'postfilesBtn6';
                  qnUpload6.uploadContainer = 'uploadContainer6';
                  qnUpload6.ossFileDisp = 'ossfile6';
                // qnUpload6.init();
                var qnUpload7 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload7);
                  qnUpload7.uploadOnSelectFile = true;
                  qnUpload7.selectFileBtn = 'selectfilesBtn7';
                  // qnUpload7.uploadRunBtn = 'postfilesBtn7';
                  qnUpload7.uploadContainer = 'uploadContainer7';
                  qnUpload7.ossFileDisp = 'ossfile7';
                // qnUpload7.init();
                var qnUpload8 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload8);
                  qnUpload8.uploadOnSelectFile = true;
                  qnUpload8.selectFileBtn = 'selectfilesBtn8';
                  // qnUpload8.uploadRunBtn = 'postfilesBtn8';
                  qnUpload8.uploadContainer = 'uploadContainer8';
                  qnUpload8.ossFileDisp = 'ossfile8';
                // qnUpload8.init();
                var qnUpload9 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload9);
                  qnUpload9.uploadOnSelectFile = true;
                  qnUpload9.selectFileBtn = 'selectfilesBtn9';
                  // qnUpload9.uploadRunBtn = 'postfilesBtn9';
                  qnUpload9.uploadContainer = 'uploadContainer9';
                  qnUpload9.ossFileDisp = 'ossfile9';
                // qnUpload9.init();
                var qnUpload10 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackQnUpload10);
                  qnUpload10.uploadOnSelectFile = true;
                  qnUpload10.selectFileBtn = 'selectfilesBtn10';
                  // qnUpload10.uploadRunBtn = 'postfilesBtn10';
                  qnUpload10.uploadContainer = 'uploadContainer10';
                  qnUpload10.ossFileDisp = 'ossfile10';
                if(self.signNum == 1){
                  qnUpload3.init();
                  qnUpload4.init();
                  qnUpload5.init();
                  qnUpload6.init();
                  qnUpload7.init();
                  qnUpload8.init();
                  qnUpload9.init();
                  qnUpload10.init();
                  var num = self.signNum;
                  ++num;
                  self.signNum = num;
                }
              }else{
                self.$alert(newData.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    console.log('sss');
                  }
                })
              }
            });
          },
          //设置图片
          setPicFunc:function(data){
            var that = this;
            PT.apiClient.query(SvrApi.gitPic,data,  function(res) {
              console.log(res);
              if(res.code == 0){
                 that.$alert("上传成功", '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.getCustomizedData();
                  }
                });
                that.bucket="";
                that.file_size="";
                that.file_md5="";
                that.file_path="";
                that.width ="";
                that.height ="";
              }else{
                that.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                })
              }
            });
          },
          //删除图片
          deletePicFunc:function(data){
            var that = this;
            PT.apiClient.query(SvrApi.delPic,data,  function(res) {
              console.log(res);
              if(res.code == 0){
                 that.$alert("删除成功", '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.getCustomizedData();
                  }
                });
              }else{
                that.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                })
              }
            });
          },
          //获取登陆用户数据
          getUserInfo:function(){
            var self = this;
            PT.apiClient.query("bz-mix/bz/get-base-info", '',  function(rsp) {
                if (rsp.code == 0) {
                    self.agentType = rsp.data.agentType;//5代表酒店7代表足浴
                }else{
                    alert('获取用户信息错误！');
                } 
            });
          },
          changePicName:function(data){
            var self = this;
            PT.apiClient.query(SvrApi.picName, data,  function(rsp) {
              if (rsp.code == 0) {
                 self.$alert("修改成功", '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    self.form.newName = "";
                    self.getCustomizedData();
                  }
                })
              }else{
                  self.$alert(rsp.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                })
              } 
            });
          }
        },
        //监听路由
        watch:{
          'textWords':function (newVal, oldVal) {
              var self = this;
              if(newVal.length>0 && newVal.length<=140){
                self.textNumShow = true;
                self.textNum = newVal.length+"/140";
              }else if(newVal.length>140){
                self.textNumShow = true;
                self.textNum = "140/140";
                var str = newVal.substring(0,140);
                self.textWords = str;
                self.$alert("最多输入140个字符", '提示', {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                })
              }else{
                self.textNumShow = false;
              }
          },
          'allData':function(newVal, oldVal){
            var self = this;
            if(!!newVal){
              if(newVal.introduce.length > 0){
                self.textNumShow = true;
                self.textNum = newVal.introduce.length+"/140";
              }
            }
          }
        }
    };
</script>

<style scoped>
    #appHotelIndex{
      width:100%;
      overflow:hidden;
    }
    .lef{
      float:left;
    }
    #appHotelIndex .section_one{
      width:100%;
      overflow:hidden;
    }
    #appHotelIndex .section_one .section_one_top{
      width:96%;
      height:32px;
      line-height:32px;
      padding:10px 2%;
      overflow:hidden;
    }
    #appHotelIndex .section_one .section_one_top .section_one_top_lef_p{
      height:32px;
      line-height:32px;
      width:110px;
      background:#d7d7d7;
      color:#323232;
      font-size:16px;
      text-align:center;
      border-radius:5px;
      margin-right:10px;
    }
    #appHotelIndex .section_one .section_one_top .section_one_top_cen_p{
      height:32px;
      line-height:32px;
      color:#323232;
      font-size:16px;
      text-align:left;
      background:#ebebeb;
      padding-left:10px;
      margin-right:20px;
    }
    #appHotelIndex .section_one .section_one_top .section_one_top_button{
      height:32px;
      line-height:32px;
      color:#323232;
      font-size:16px;
      text-align:center;
      box-sizing:border-box;
    }
    #appHotelIndex .section_one .section_one_bottom{
      width:96%;
      overflow:hidden;
      padding:10px 2%;
    }
    #appHotelIndex .section_one .section_one_bottom .section_one_bottom_img{
      width:200px;
      height:113px;
      float:left;
      border:0px;
      box-sizing:border-box;
      position:relative;
    }
    #appHotelIndex .section_one .section_one_bottom .section_one_bottom_img p:nth-child(1){
      display:block;
      width:200px;
      height:86px;
      border:0px;
      overflow:hidden;
    }
    #appHotelIndex .section_one .section_one_bottom .section_one_bottom_img img{
      display:block;
      width:200px;
      height:86px;
      border:0px;
    }
    #appHotelIndex .section_one .section_one_bottom .section_one_bottom_img p:nth-child(3){
      display:block;
      width:200px;
      height:30px;
      line-height:30px;
      text-align:center;
      background:#cfcfcf;
      border-radius:5px;
    }
    #appHotelIndex .section_one .section_one_bottom .section_one_bottom_img .section_one_bottom_p{
      display:block;
      width:200px;
      height:30px;
      line-height:30px;
      text-align:center;
      background:#cfcfcf;
      border-radius:5px;
    }
    #appHotelIndex .section_one .section_one_bottom .section_one_bottom_btn{
      width:110px;
      height:30px;
      line-height:30px;
      text-align:center;
      box-sizing:border-box;
    }

    #appHotelIndex .section_two{
      height:600px;
      width:96%;
      padding:10px 2%;
      position:relative;
      overflow-x:scroll;
      overflow-y:hidden;
    }
    #appHotelIndex .section_two .introduceP{
      height:30px;
      line-height:30px;
      text-align:left;
      position:absolute;
      bottom:10px;
      left:0px;
      margin-left:2%;
      background:#d6d6d6;
      font-size:13px;
    }
    #appHotelIndex .section_two ul{
      list-style:none;
      height:600px;
      width:2000px;
    }
    #appHotelIndex .section_two li{
      float:left;
      width:240px;
      margin-right:10px;
      /*overflow-y:hidden;*/
      height:600px;
    }
    #appHotelIndex .section_two li .one_p{
      display:block;
      width:100%;
      height:25px;
      margin-bottom:10px;
      overflow:hidden;
    }
    #appHotelIndex .section_two li .one_p i{
      display:block;
      width:220px;
      height:25px;
      margin-left:10px;
      line-height:25px;
      text-align:center;
      font-style:normal;
      border-radius:5px;
      background:#d8d8d8;
    }
    #appHotelIndex .section_two li .two_p{
      display:block;
      width:100%;
      height:388px;
      margin-bottom:10px;
      background:orange;
    }
    #appHotelIndex .section_two li .two_p img{
      display:block;
      width:100%;
      height:388px;
      margin-bottom:10px;
      border:0px;      
    }
    #appHotelIndex .section_two li .three_p{
      display:block;
      width:100%;
      height:24px;
      overflow:hidden;
    }
    #appHotelIndex .section_two li .three_p i{
      display:block;
      width:110px;
      height:24px;
      border:1px solid #ccc;
      box-sizing:border-box;
      margin-left:65px;
      line-height:24px;
      text-align:center;
      background:#d7d7d7;
      border-radius:5px;
      font-style: normal;
    }
    #appHotelIndex .section_two li .four_p{
      display:block;
      width:220;
      height:25px;
      line-height:30px;
      overflow:hidden;
      padding:0 10px;
    }
    .selectFile{
      display:block;
      width:110px;
      height:22px;
      border:1px solid #ccc;
      box-sizing:border-box;
      text-align:center;
      background:#d7d7d7;
      border-radius:5px;
      font-style: normal;
      float:left;
      margin-left:65px;
      margin-bottom:20px;
    }
    #appHotelIndex .section_two li .four_p i:nth-child(1){
      display:block;
      width:100px;
      height:25px;
      line-height:25px;
      border:1px solid #ccc;
      box-sizing:border-box;
      text-align:center;
      background:#d7d7d7;
      border-radius:5px;
      font-style: normal;
      float:left;
      margin-right:20px;
    }
    #appHotelIndex .section_two li .four_p i:nth-child(2){
      display:block;
      width:100px;
      height:25px;
      line-height:25px;
      border:1px solid #ccc;
      box-sizing:border-box;
      text-align:center;
      background:#d7d7d7;
      border-radius:5px;
      font-style: normal;
      float:left;
    }
    #appHotelIndex .section_three{
      width:100%;
      padding:20px 2%;
      width:96%;
      overflow:hidden;
    }
    #appHotelIndex .section_three .section_three_top{
      height:30px;
      width:100%;
      margin-bottom:30px;
    }
    #appHotelIndex .section_three .section_three_top p{
      float:left;
    }
    #appHotelIndex .section_three .section_three_top p:nth-child(1){
      display:block;
      width:120px;
      height:30px;
      background:#d6d6d6;
      line-height:30px;
      text-align:center;
      border-radius:5px;
      margin-right:10px;
      font-size:15px;
    }
    #appHotelIndex .section_three .section_three_top p:nth-child(2){
      display:block;
      height:30px;
      background:#d6d6d6;
      line-height:30px;
      text-align:center;
      padding:0px 10px;
      font-size:13px;
    }
    #appHotelIndex .section_three .section_three_cen_btn{
      display:block;
      width:110px;
      height:30px;
      margin-bottom:30px;
    }
    #appHotelIndex .section_three .section_three_bottom{
      width:100%;
      height:255px;
      overflow:hidden;
    }
    #appHotelIndex .section_three .section_three_bottom p{
      display:block;
      width:450px;
      height:255px;
      border:0px;
      float:left;
      overflow:hidden;
    }
    #appHotelIndex .section_three .section_three_bottom img{
      display:block;
      width:450px;
      height:255px;
      border:0px;
      float:left;
    }
    #appHotelIndex .section_three .section_three_bottom button{
      display:block;
      width:120px;
      height:30px;
      border:0px;
      float:left;
    }
    
    #appHotelIndex .section_four{
      padding:20px 2%;
      width:96%;
      overflow:hidden;
    }
    #appHotelIndex .section_four .section_four_btn{
      display:block;
      width:110px;
      height:30px;
      line-height:30px;
      text-align:center;
      font-size:15px;
      margin-bottom:17px;
    }
    #appHotelIndex .section_four .section_four_txt{
      display:block;
      width:100%;
      height:115px;
      line-height:30px;
      text-align:left;
      font-size:15px;
    }
    #appHotelIndex .section_four .section_four_txt textarea{
      display:block;
      width:930px;
      height:115px;
      line-height:30px;
      text-align:left;
      font-size:15px;
      float:left;
    }
    #appHotelIndex .section_four .section_four_txt button{
      display:block;
      width:120px;
      height:30px;
      line-height:30px;
      text-align:center;
      font-size:15px;
      float:left;
      margin-left:30px;
    }



    /*上传*/
    .uploadbtn{
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4; 
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        text-decoration: none;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    a.uploadbtn:hover{
      background-color: #3366b7;
    }
    .progress{
        margin-top:2px;
        width: 200px;
        height: 14px!important;
        margin-bottom: 10px;
        overflow: hidden;
        background-color: #f5f5f5;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
        box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    }
    .progress-bar{ 
        background-color: rgb(92, 184, 92);
        background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
        background-size: 40px 40px;
        box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
        box-sizing: border-box;
        color: rgb(255, 255, 255);
        display: block;
        float: left; 
        font-size: 12px;
        height: 20px!important;
        line-height: 20px;
        text-align: center;
        transition-delay: 0s;
        transition-duration: 0.6s;
        transition-property: width;
        transition-timing-function: ease;
        width: 266.188px;
    }
    



    .commonUploadContainer{
      width:220px;
      padding:0px 10px;
      padding-bottom:10px;
    }
    .commonBtnLeft{
      display:block;
      width:100px;
      height:25px;
      line-height:25px;
      text-align:center;
      border-radius:5px;
      margin-right:20px;
      font-size:15px;
      padding:0px;
      box-sizing:border-box;
      float:left;
    }
    .commonBtnRight{
      display:block;
      height:25px;
      line-height:25px;
      text-align:center;
      width:100px;
      font-size:15px;
      padding:0px;
      box-sizing:border-box;
      float:left;
    }

    .iconfont{
      opacity:1;
      filter: Alpha(opacity=100);
      color:#0165c5;
      background:#ccc;
    }
</style>

