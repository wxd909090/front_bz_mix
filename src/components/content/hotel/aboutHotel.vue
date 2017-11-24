<template>
  <div id="uploadPicVideo">
    <div class="section_one">
      <div class="section_one_top locationR">
        <p><a @click="backFunc" href="javascript:;"><i @click="backFunc" class="icon iconfont icon-fanhui" style="background:#fff;font-size:25px;margin-bottom:4px;display:block;width:25px;height:44px;float:left;padding-bottom:2px;"></i>{{file_name}}</a>/{{type | picVideo}}</p>
      </div>
      <div class="section_one_bottom" v-show="picVideoShowSign">
        <p class="section_one_bottom_oneP">投影显示</p>
        <p class="section_one_bottom_twoP b7" ><input type="checkbox"  v-model="input_one">图片</p>
        <p class="section_one_bottom_threeP b7"><input type="checkbox" v-model="input_two">视频</p>
      </div>
    </div>
    <div class="section_two">
      <div class="section_two_top">
        <p class="section_three_top_lef">图片管理</p>
        <p class="section_three_top_rig">注:上传图的尺寸为1920*1080，其它尺寸会影响显示效果,图片格式只能为jpg或png,图片大小不要超过2M。拖动图片可以改变图片顺序,删除图片点击右上角"X"。</p>
      </div>
      <div id="ossfile"></div>
      <br/>
      <div id="uploadContainer">
          <a id="selectfilesBtn" href="javascript:void(0);" class='uploadbtn'>上传图片</a>
      </div>
      <div class="section_two_bottom" >
        <ul>
          <draggable @update="datadragEnd">
            <transition-group>
              <li v-for="item in picData" class="locationR" :key="item.file_id">
                <img :src="item.file_path">
                <i class="icon iconfont icon-shanchu1 locationA" @click="deleteListPic(item.file_id)" style="top:0px;opacity:0.5;filter: Alpha(opacity=50);"></i>
              </li>
            </transition-group>
          </draggable>
        </ul>
      </div>
    </div>
    <div class="section_three" v-if="videoDiv">
      <div class="section_two_top">
        <p class="section_three_top_lef">视频管理</p>
        <p class="section_three_top_rig">注:上传视频格式为MP4、mkv、avi,视频大小最大为100M</p>
      </div>
      <!-- <p class="section_two_mid">上传视频</p> -->
      <div class="section_two_bottom">
        <div class="section_two_bottom_videoBox locationR">
          <video :src="videoData" controls="controls" width="500" height="300"></video>
          <i class="icon iconfont icon-shanchu1 locationA" @click="deleteListVideo" style="top:0px;opacity:0.5;filter: Alpha(opacity=50);"></i>
        </div>
        <!-- <h4>选择视频文件：mp4,mkv,avi</h4> -->
        <div id="ossfile2"></div>
        <br/>
        <div id="uploadContainer2">
          <a id="selectfilesBtn2" href="javascript:void(0);" class='btn'>上传视频</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import md5 from 'js-md5';
    import http from '../../../http/Http_base.js';
    import globalData from '../../../http/globalData.js';
    import func from '../../../common/func.js';
    import draggable from 'vuedraggable';

    //必定有的import ...
    import EnvBase from '../../../env.js'
    import SvrApi from '../../../svrapi.js'
    import QnUploadDefine from '../../../vendor/qnbar/qnupload.js'
    var PT = EnvBase.PT;



    export default {
        data: function (){
            return {
              agent_type:"",//传过代表酒店或者足浴
              type:"",//传过来的type
              videoDiv:false,
              bucket:"",
              file_size:"",
              file_md5:"",
              file_path:"",
              file_type:"",//过来的type对应的获取图片file_type
              file_type_video:"",//获取视频file_type
              file_name:"",
              picData:"",//获取图片数据
              videoData:"",//视频地址
              videoDataFileId:"",
              input_one:false,
              input_two:false,
              picVideoShowSign:false,
              picDataTest:"",

              sign_num:1
            }
        },
        created:function(){
          
        },
        components: {
        　　draggable
        },
        mounted:function(){
          var self = this;
          self.agent_type = localStorage.getItem('agent_type');
          self.type = localStorage.getItem('ModularType');
          self.file_name = localStorage.getItem('file_name');
          if(self.type == 1 || self.type == 38){
            self.videoDiv = true;
            self.picVideoShowSign = true;
          }else{
            self.videoDiv = false;
            self.picVideoShowSign = false;
          }
          if(!!self.agent_type && self.agent_type == 5){
            //酒店
            if(self.type == 1){
              var data = {};
              data['agent_type'] = self.agent_type;
              data['type'] = 2;
              self.file_type = 2;
              var sign = 1;
              self.getPicVideoFunc(data,sign);
              var newData = {};
              newData['agent_type'] = self.agent_type;
              newData['type'] = 4;
              self.file_type_video = 4;
              var sign = 2;
              self.getVideoFunc(newData,sign);
            }else if(self.type == 18){
              var data = {};
              data['agent_type'] = self.agent_type;
              data['type'] = 20;
              self.file_type = 20;
              self.getPicVideoFunc(data);
            }else if(self.type == 19){
              var data = {};
              data['agent_type'] = self.agent_type;
              data['type'] = 21;
              self.file_type = 21;
              self.getPicVideoFunc(data);
            }else{

            }
          }else if(!!self.agent_type && self.agent_type == 7){
            //足浴
            if(self.type == 38){
              var data = {};
              data['agent_type'] = self.agent_type;
              data['type'] = 41;
              self.file_type = 41;
              var sign = 1;
              self.getPicVideoFunc(data,sign);
              var newData = {};
              newData['agent_type'] = self.agent_type;
              newData['type'] = 4;
              self.file_type_video = 4;
              var sign = 2;
              self.getVideoFunc(newData,sign);
            }else if(self.type == 36){
              var data = {};
              data['agent_type'] = self.agent_type;
              data['type'] = 39;
              self.file_type = 39;
              self.getPicVideoFunc(data);
            }else if(self.type == 37){
              var data = {};
              data['agent_type'] = self.agent_type;
              data['type'] = 40;
              self.file_type = 40;
              self.getPicVideoFunc(data);
            }else{
              console.log(2222);
            }
          }else{

          }
          //Pic
          var callbackOnSuccessFuncPic = function(){
              var data = {};
              data['file_type'] = self.file_type;
              data['file_name'] = self.file_name;
              data['bucket'] = qnUploadPic.uploadSignInfo.bucket;
              data['file_size'] = qnUploadPic.fileSize;
              data['file_md5'] = qnUploadPic.md5;
              data['file_path'] = qnUploadPic.ossPath;
              self.setPicVideoFunc(data);

          }
          var qnUploadPic = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackOnSuccessFuncPic);
            qnUploadPic.uploadOnSelectFile = true; //选中文件立刻上传
            qnUploadPic.selectFileBtn = 'selectfilesBtn';
            // qnUploadPic.uploadRunBtn = 'postfilesBtn';
            qnUploadPic.uploadContainer = 'uploadContainer';
            qnUploadPic.ossFileDisp = 'ossfile';
          qnUploadPic.init();
          //Video
          var callbackOnSuccessFunc2 = function(){

              var data = {};
              data['file_type'] = self.file_type_video;
              data['file_name'] = self.file_name;
              data['bucket'] = qnUpload2.uploadSignInfo.bucket;
              data['file_size'] = qnUpload2.fileSize;
              data['file_md5'] = qnUpload2.md5;
              data['file_path'] = qnUpload2.ossPath;
              self.setPicVideoFunc(data);
          }
          var qnUpload2 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'intro_video', callbackOnSuccessFunc2);
            qnUpload2.uploadOnSelectFile = true; //选中文件立刻上传
            qnUpload2.maxRetries = 10; //视频的重试设置多一些，避免中途断了死定
            qnUpload2.selectFileBtn = 'selectfilesBtn2';
            // qnUpload2.uploadRunBtn = 'postfilesBtn2';
            qnUpload2.uploadContainer = 'uploadContainer2';
            qnUpload2.ossFileDisp = 'ossfile2';
          qnUpload2.init();
        },
        methods:{
          backFunc:function(){
            var self = this;
            if(self.type == 1 || self.type == 18 || self.type == 19){
              self.$router.push('/homepage');
            }else if(self.type == 38 || self.type == 36 || self.type == 37){
              self.$router.push('/footbath');
            }else{

            }
          },
          //拖拽
          datadragEnd:function(evt) {
            var self = this;
            self.dragFunc(evt.newIndex,evt.oldIndex);
          },
          dragFunc:function(newData,oldData){
            var self = this;
            var getIndex = newData;
            var oldindex = oldData;
              var length = self.picData.length;
              if(getIndex == self.picData.length-1){
                var lastIndexSort = parseInt(self.picData[length-1].sort) + 2; 
                var newType = self.picData[length-1].file_type; 
                var newFileId = self.picData[oldindex].file_id; 
                var data = {};
                data['file_id'] = newFileId;
                data['sort'] = lastIndexSort;
                data['type'] = newType;
                self.dragPicFunc(data);
              }else if(getIndex<oldindex){
                var newIndex = getIndex;
                var laterIndexSort = self.picData[newIndex].sort; //后面一个的sort
                var newType = self.picData[newIndex].file_type;
                var newFileId = self.picData[oldindex].file_id; 
                var data = {};
                data['file_id'] = newFileId;
                data['sort'] = laterIndexSort;
                data['type'] = newType;
                console.log(data);
                self.dragPicFunc(data);
              }else if(getIndex>oldindex){
                var newIndex = getIndex + 1;
                var laterIndexSort = self.picData[newIndex].sort; //后面一个的sort
                var newType = self.picData[newIndex].file_type;
                var newFileId = self.picData[oldindex].file_id; 
                var data = {};
                data['file_id'] = newFileId;
                data['sort'] = laterIndexSort;
                data['type'] = newType;
                console.log(data);
                self.dragPicFunc(data);
              }
          },
          dragPicFunc:function(data){
            var self = this;
            PT.apiClient.query(SvrApi.dragPicUrl,data,  function(res) {
                if(res.code == 0){
                  self.$alert("修改成功", '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      var data = {};
                      data['agent_type'] = self.agent_type;
                      data['type'] = self.file_type ;
                      self.getPicVideoFunc(data);
                    }
                  })
                }else{
                  self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => { 
                    }
                  })
                }
            });
          },

          //
          //事件
          //上传图片
          // uploadPic:function(){
          //   var self = this;
          //   //拼数据
          //   var data = {};
          //   data['file_type'] = self.file_type;
          //   data['file_name'] = self.file_name;
          //   data['bucket'] = self.bucket;
          //   data['file_size'] = self.file_size;
          //   data['file_md5'] = self.file_md5;
          //   data['file_path'] = self.file_path;
          //   self.setPicVideoFunc(data);
          // },
          //删除图片
          deleteListPic:function(file_id){
            var that = this;
            that.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var data = {};
                data['file_id'] = file_id;
                that.delPicVideoFunc(data);
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
          },
          //删除视频
          deleteListVideo:function(){
            var that = this;
            that.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var data = {};
                data['file_id'] = that.videoDataFileId;
                that.delPicVideoFunc(data);
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
          },
          //显示图片或视频或图片和视频
          showPicVideoFunc:function(data){
            var self = this;
            PT.apiClient.query(SvrApi.showPicVideo,data,  function(res) {
                if(res.code == 0){
                  var num = self.sign_num;
                  ++num;
                  self.sign_num = num;
                  if(self.sign_num <=2){
                    
                  }else{
                    self.$alert("修改成功", '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        
                      }
                    })
                  }
                }else{
                  self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      
                    }
                  })
                }
            });
          },
          //删除图片视频
          delPicVideoFunc:function(data){
            var self = this;
            PT.apiClient.query(SvrApi.delPicVideo,data,  function(res) {
                if(res.code == 0){
                  self.$alert("删除成功", '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      var data = {};
                      data['agent_type'] = self.agent_type;
                      data['type'] = self.file_type ;
                      self.getPicVideoFunc(data);
                      if(self.type == 1 || self.type == 38){
                        var newData = {};
                        newData['agent_type'] = self.agent_type;
                        newData['type'] = self.file_type_video;
                        self.getVideoFunc(newData);
                      }
                    }
                  })
                }else{
                  self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      
                    }
                  })
                }
            });
          },
          //上传图片和视频
          setPicVideoFunc:function(data){
            var self = this;
            PT.apiClient.query(SvrApi.setPicVideo,data,  function(res) {
                if(res.code == 0){
                  self.$alert("上传成功", '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      var data = {};
                      data['agent_type'] = self.agent_type;
                      data['type'] = self.file_type ;
                      self.getPicVideoFunc(data);

                      if(self.type == 1 || self.type == 38){
                        var newData = {};
                        newData['agent_type'] = self.agent_type;
                        newData['type'] = self.file_type_video;
                        self.getVideoFunc(newData);
                      }
                    }
                  })
                }else{
                  self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      
                    }
                  })
                }
            });
          },
          //获取图片
          getPicVideoFunc:function(data,sign){
            var self = this;
            PT.apiClient.query(SvrApi.getPicVideo,data,  function(res) {
                if(res.code == 0){
                  self.picData = res.data.type;
                  self.picDataTest = res.data.type; 
                  self.colors = res.data.type;
                  var sign = res.data.setting;
                  if(sign == 0){
                    self.input_one = true;
                    self.input_two = false;
                  }else if(sign == 3){
                    self.input_one = false;
                    self.input_two = true;
                  }
                  // if(!!sign && sign==1){
                  //   if(res.data.setting == 1){
                  //     self.input_one = true;
                  //   }else{
                  //     self.input_one = false;
                  //   }
                  // }else if(!!sign && sign==2){
                  //   if(res.data.setting == 1){
                  //     self.input_two = true;
                  //   }else{
                  //     self.input_two = false;
                  //   }
                  // }else{}
                }else{
                  self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      
                    }
                  })
                }
            });
          },
          //获取视频
          getVideoFunc:function(data){
            var self = this;
            PT.apiClient.query(SvrApi.getPicVideo,data,  function(res) {
                if(res.code == 0){
                  if(!!res.data.type[0]){
                    self.videoData = res.data.type[0].file_path;
                    self.videoDataFileId = res.data.type[0].file_id;
                  }else{
                    self.videoData = "";
                    self.videoDataFileId = "";
                  }
                }else{
                  self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      
                    }
                  })
                }
            });
          },
        },
        watch:{
          'input_one':function (newVal, oldVal) {
              var self = this;
                console.log(newVal);
                console.log(oldVal);

              if(!!newVal){
                self.input_two = false;

                var data = {};
                data['type'] = self.type;
                data['setting'] = 0;
                self.showPicVideoFunc(data);
              }else{}
          },
          'input_two':function (newVal, oldVal) {
              var self = this;
              if(!!newVal){
                self.input_one = false;

                var data = {};
                data['type'] = self.type;
                data['setting'] = 3;
                self.showPicVideoFunc(data);
              }else{}
          },
          // 'colorss':function(){
          //   console.log(colorss);
          // }
         
        }
  }
</script>

<style scoped>
    #uploadPicVideo{
      width:100%;
      overflow:hidden;
    }
    #uploadPicVideo .section_one{
      width:93%;
      overflow:hidden;
      padding:0px 2% 0px 5%;
      border-bottom:1px solid #888888;
    }
    #uploadPicVideo .section_one .section_one_top{
      width:100%;
      overflow:hidden;
      height:42px;
      margin-top:45px;
      line-height:42px;
      text-align:left;
      font-size:20px;

    }
    #uploadPicVideo .section_one .section_one_bottom{
      width:100%;
      height:30px;
    }
    #uploadPicVideo .section_one .section_one_bottom{
      width:100%;
      height:30px;
      margin-top:10px;
      margin-bottom:23px;

    }
    #uploadPicVideo .section_one .section_one_bottom .section_one_bottom_oneP{
      display:block;
      width:120px;
      height:30px;
      line-height:30px;
      border-radius:5px;
      text-align:center;
      background:#dbdbdb;
      float:left;
      margin-right:45px;
    }
    #uploadPicVideo .section_one .section_one_bottom .section_one_bottom_twoP{
      display:block;
      width:120px;
      height:30px;
      line-height:30px;
      border-radius:5px;
      text-align:center;
      background:#dbdbdb;
      float:left;
      margin-right:30px;
      position:relative;
    }
    #uploadPicVideo .section_one .section_one_bottom .section_one_bottom_twoP input{
      background:#fff;
    }
    #uploadPicVideo .section_one .section_one_bottom .section_one_bottom_threeP{
      display:block;
      width:120px;
      height:30px;
      line-height:30px;
      border-radius:5px;
      text-align:center;
      background:#dbdbdb;
      float:left;
    }
    #uploadPicVideo .section_one .section_one_bottom .section_one_bottom_threeP input{
      background:#fff;
    }

    #uploadPicVideo .section_two{
      width:93%;
      overflow:hidden;
      padding:0px 2% 0px 5%;
      border-bottom:1px solid #888888;
    }
    #uploadPicVideo .section_two .section_two_top{
      width:100%;
      overflow:hidden;
      margin-top:24px;
    }
    #uploadPicVideo .section_two .section_two_top .section_three_top_lef{
      float:left;
      width:120px;
      height:30px;
      line-height:30px;
      background:#d5d5d5;
      font-size:14px;
      color:#323232;
      text-align:center;
      border-radius:5px;
      margin-right:20px;
    }
    #uploadPicVideo .section_two .section_two_top .section_three_top_rig{
      float:left;
      height:30px;
      line-height:30px;
      background:#ebebeb;
      font-size:14px;
      color:#323232;
      padding:0px 10px;
    }
    #uploadPicVideo .section_two .section_two_mid{
      width:120px;
      height:30px;
      line-height:30px;
      background:#d5d5d5;
      font-size:14px;
      color:#323232;
      text-align:center;
      border-radius:5px;
      margin-top:35px;
    }
    #uploadPicVideo .section_two .section_two_bottom{
      width:100%;
      /*height:205px;*/
      overflow:hidden;
      list-style:none;
      margin-top:10px;
      overflow-x:scroll;
      overflow-y:hidden;
    }
    #uploadPicVideo .section_two .section_two_bottom ul{
      width:1780px;
      /*height:205px;*/
      overflow:hidden;
      list-style:none;
    }
    #uploadPicVideo .section_two .section_two_bottom ul li{
      display:block;
      width:324px;
      height:205px;
      margin-right:32px;
      background:green;
      float:left;
      margin-bottom:10px;
    }
    #uploadPicVideo .section_two .section_two_bottom ul li img{
      display:block;
      border:0px;
      width:324px;
      height:205px;
    }
    #uploadPicVideo .section_three{
      width:93%;
      overflow:hidden;
      padding:0px 2% 0px 5%;
      border-bottom:1px solid #888888;
    }
    #uploadPicVideo .section_three .section_two_top{
      width:100%;
      overflow:hidden;
      margin-top:24px;
    }
    #uploadPicVideo .section_three .section_two_top .section_three_top_lef{
      float:left;
      width:120px;
      height:30px;
      line-height:30px;
      background:#d5d5d5;
      font-size:14px;
      color:#323232;
      text-align:center;
      border-radius:5px;
      margin-right:20px;
    }
    #uploadPicVideo .section_three .section_two_top .section_three_top_rig{
      float:left;
      height:30px;
      line-height:30px;
      background:#ebebeb;
      font-size:14px;
      color:#323232;
      padding:0px 10px;
    }
    #uploadPicVideo .section_three .section_two_mid{
      width:120px;
      height:30px;
      line-height:30px;
      background:#d5d5d5;
      font-size:14px;
      color:#323232;
      text-align:center;
      border-radius:5px;
      margin-top:35px;
    }
    #uploadPicVideo .section_three .section_two_bottom{
      width:100%;
      height:240px;
      list-style:none;
      margin-top:20px;
      margin-bottom:50px;
    }
    #uploadPicVideo .section_three .section_two_bottom .section_two_bottom_videoBox{
      width:324px;
      height:240px;
      float:left;
      margin-right:20px;

    }
    #uploadPicVideo .section_three .section_two_bottom .section_two_bottom_videoBox video{
      width:324px;
      height:240px;
      display:block;
      border:1px solid #ccc;
      box-sizing:border-box;
    }
    #uploadPicVideo .section_three .section_two_bottom .section_two_bottom_btn{
      float:left;
      width:120px;
      height:30px;
      display:block;
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

    .iconfont{
      opacity:1;
      filter: Alpha(opacity=100);
      color:#0165c5;
      background:#ccc;
    }
</style>

