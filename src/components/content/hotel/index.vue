<template>
  <div id="appHotelIndex">
    <div class="section_one">
      <div class="section_one_top">
        <p class="lef section_one_top_lef_p">定制页面</p>
        <p class="lef section_one_top_cen_p">注：上传图片上不要带文字，可以修改模块名称，按照尺寸上传图片，其他尺寸会影响显示效果。图片格式可能是jpg或者png,单张图片大小不要过1M</p>
        <button class="lef section_one_top_button">恢复默认图片</button>
      </div>
      <div class="section_one_bottom">
        <div class="section_one_bottom_img locationR">
          <img v-bind:src="logoPic?logoPic:defaultImgUrl">
          <i @click="deleteLogo" class="icon iconfont icon-delete-black locationA" style="opacity:0.3;filter: Alpha(opacity=30);"></i>
          <p>logo尺寸200*86</p>
        </div>

        
        <h4>选择图片文件:jpg,gif,png,bmp</h4>
        <div id="ossfile"></div>
        <br/>
        <div id="uploadContainer">
          <a id="selectfilesBtn" href="javascript:void(0);" class='btn'>选择文件</a>
        </div>
        <button @click="changeLogo" class="section_one_bottom_btn lef">更换LOGO</button>


      </div>
    </div>
    <div class="section_two">
      <ul>
        <li class="lef  locationR" v-for="item in listImgDataObj">
          <p class="one_p mouse-Up"><i @click="openChildPage(item.type)" v-if="item.open">打开</i></p>
          
          <!-- <p class="three_p">{{item.pic.file_path}}</p> -->
          <p class="two_p"><img v-bind:src="item.pic.file_path"></p>
          <div id="ossfile3"></div>
          <br/>
          <div id="uploadContainer3">
            <a id="selectfilesBtn3" href="javascript:void(0);" class='btn'>选择文件</a>
          </div>
          <p class="three_p" @click="changeName(item.pic.file_name)"><i>{{item.pic.file_name}}</i></p>
          <p class="four_p"><i>{{item.name}}</i><i>更换</i></p>
          <i class="icon iconfont icon-delete-black locationA" @click="deleteListPic(item.type)" style="top:35px;opacity:0.3;filter: Alpha(opacity=30);"></i>
        </li>
        <!-- <li class="lef">
          <p class="one_p"></p>
          <p class="two_p"><img src="../../../../static/img/img.jpg"></p>
          <p class="three_p"><i>电视直播</i></p>
          <p class="four_p"><i>尺寸340*520</i><i>更换</i></p>
        </li>
        <li class="lef">
          <p class="one_p mouse-Up" @click="aboutHotel"><i>打开</i></p>
          <p class="two_p"><img src="../../../../static/img/img.jpg"></p>
          <p class="three_p"><i>关于酒店</i></p>
          <p class="four_p"><i>尺寸340*520</i><i>更换</i></p>
        </li>
        <li class="lef">
          <p class="one_p"></p>
          <p class="two_p"><img src="../../../../static/img/img.jpg"></p>
          <p class="three_p"><i>电视直播</i></p>
          <p class="four_p"><i>尺寸340*520</i><i>更换</i></p>
        </li>
        <li class="lef">
          <p class="one_p mouse-Up" @click="hotelService"><i>打开</i></p>
          <p class="two_p"><img src="../../../../static/img/img.jpg"></p>
          <p class="three_p"><i>酒店服务</i></p>
          <p class="four_p"><i>尺寸340*520</i><i>更换</i></p>
        </li>
        <li class="lef">
          <p class="one_p"></p>
          <p class="two_p"><img src="../../../../static/img/img.jpg"></p>
          <p class="three_p"><i>电视直播</i></p>
          <p class="four_p"><i>尺寸340*520</i><i>更换</i></p>
        </li>
        <li class="lef">
          <p class="one_p mouse-Up" @click="SurroundingAttractions"><i>打开</i></p>
          <p class="two_p"><img src="../../../../static/img/img.jpg"></p>
          <p class="three_p"><i>电视直播</i></p>
          <p class="four_p"><i>尺寸340*520</i><i>更换</i></p>
        </li> -->
      </ul>
    </div>
    <div class="section_three">
      <div class="section_three_top">
        <p class="section_three_top_lef">背景图</p>
        <p class="section_three_top_rig">注:上传图的尺寸为1280*800，其它尺寸会影响显示效果,图片格式只能为jpg或png,图片大小不要超过2M</p>
      </div>

      <button class="section_three_cen_btn" @click="changeBackgroundPic">更换</button>

      <div class="section_three_bottom locationR">
        <img v-bind:src="backgroundPic?backgroundPic:defaultImgUrl">
        <i @click="deleteBackgroundPic" class="icon iconfont icon-delete-black locationA" style="left:431.6px;opacity:0.3;filter: Alpha(opacity=30);"></i>
      </div>

      <div id="ossfile2"></div>
      <br/>
      <div id="uploadContainer2">
        <a id="selectfilesBtn2" href="javascript:void(0);" class='btn'>选择文件</a>
        <!-- <a id="postfilesBtn2" href="javascript:void(0);" class='btn'>开始上传</a> -->
      </div>



    </div>
    <div class="section_four">
      <button class="section_four_btn">滚动字幕</button>
      <div  class="section_four_txt">
        <textarea placeholder="请输入滚动文字 0/140">{{allData.introduce}}</textarea>
        <button @click="changeRollingWords">确定</button>
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

<script type="text/javascript" src="../../../../static/upload/js/lib/plupload-2.3.1/js/plupload.full.min.js"></script>
<script type="text/javascript" src="../../../../static/upload/js/qnupload.js"></script>
<script>
    import md5 from 'js-md5';
    import http from '../../../http/Http_base.js';
    import globalData from '../../../http/globalData.js';
    import url from '../../../env.js';
    import func from '../../../commonJs/func.js';

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


              defaultImgUrl:"../../../../static/img/img.jpg"
            }
        },
        created:function(){
          
        },
        mounted:function(){
          globalData.agent_id = 312;
          globalData.agent_type = 5;
          this.getCustomizedData();
        },
        methods:{
          //删除logo
          deleteLogo:function(){
            console.log("删除logo");
            var that = this;
            that.$alert("确定删除", '提示', {
              confirmButtonText: '确定',
              callback: action => {
                var data = {};
                data['file_id'] = that.logoImgDataObj[30].pic.file_id;
                that.deletePicFunc(data);
              }
            });
          },
          //更换logo
          changeLogo:function(){
            var data = {};
            data['agent_id'] = globalData.agent_id;
            data['file_type'] = 30;
            data['file_name'] = this.logoImgDataObj[30].name;
            data['file_path'] = globalData.file_path;
            data['file_md5'] = globalData.file_md5;
            data['file_size'] = globalData.file_size;
            data['bucket'] = globalData.bucket;
            data['width'] = globalData.width;
            data['height'] = globalData.height;
            this.setPicFunc(data);
          },
          //更换背景图
          changeBackgroundPic:function(){
            console.log(this.logoImgDataObj);
            var data = {};
            data['agent_id'] = globalData.agent_id;
            data['file_type'] = 42;
            data['file_name'] = this.backgroundImgDataObj[42].name;
            data['file_path'] = globalData.file_path;
            data['file_md5'] = globalData.file_md5;
            data['file_size'] = globalData.file_size;
            data['bucket'] = globalData.bucket;
            data['width'] = globalData.width;
            data['height'] = globalData.height;
            this.setPicFunc(data);
          },
          //删除背景图
          deleteBackgroundPic:function(){
            console.log("删除背景图");
            var that = this;
            that.$alert("确定删除", '提示', {
              confirmButtonText: '确定',
              callback: action => {
                var data = {};
                data['file_id'] = that.backgroundImgDataObj[42].pic.file_id;
                that.deletePicFunc(data);
              }
            });
          },
          //滚动字幕
          changeRollingWords:function(){
            var that = this;
            var data = {};
            data['agent_id'] = globalData.agent_id;
            data['introduce'] = $("textarea").val();
            http.authHttp.post(url.apiUrl2+"bz-mix/bz/agent/introduce/update",data).done(function(res) { 
                console.log(res);
                // var newData = res;
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








          //点击打开
          openChildPage:function(data){
            if(data == 1 || data == 38){
              this.$router.push('/aboutHotel');
            }else{
              this.$router.push('/hotelService');
            }
          },
          //删除列表图片
          deleteListPic:function(data){
            console.log(data)
          },
          getCustomizedData:function(){
            var self = this;
            var data = {};
            data['agent_id'] = 312;
            data['agent_type'] = 5;
            http.authHttp.post(url.apiUrl2+"bz-mix/bz/get/list/custom",data).done(function(res) { 
                console.log(res);
                //var newData = JSON.parse(res);
                var newData = res;
                if(newData.code == 0){
                   self.allData = newData.data;
                   //拆分logo,横版图,背景图
                   self.listImgDataObj = func.copyObj1(self.allData.type);
                   self.logoImgDataObj = func.copyObj2(self.allData.type);
                   self.backgroundImgDataObj = func.copyObj3(self.allData.type);
                   if(!!self.logoImgDataObj['30'].pic.file_path){
                     self.logoPic = self.logoImgDataObj['30'].pic.file_path;
                   }else{
                     self.logoPic = "";
                   }
                   if(!!self.backgroundImgDataObj['42'].pic.file_path){
                     self.backgroundPic = self.backgroundImgDataObj['42'].pic.file_path;
                   }else{
                     self.backgroundPic = "";
                   }
                   
                }else{
                   that.$alert(newData.msg, '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        console.log('sss');
                      }
                    })
                }
            });
          },
          changeName:function(name){
            var self = this;
            self.form.oldName = name;
            self.aaa = true;
            console.log(name);
          },
          dialogClose:function(){
            var self = this;
            self.aaa = false;
          },
          dialogSure:function(){
              var self = this;
              self.aaa = false;
              var data = {};
              data['oldName'] = self.form.oldName;
              data['newName'] = self.form.newName;
              http.authHttp.post(url.URL,data).done(function(res) { 
                console.log(res);
                //刷新页面请求 
                //self.getCustomizedData()
              });
          },


          

          


          setPicFunc:function(data){
            var that = this;
            http.authHttp.post(url.apiUrl2+"bz-mix/bz/screen/set",data).done(function(res) { 
                console.log(res);
                // var newData = res;
                if(res.code == 0){
                   that.$alert("上传成功", '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      that.getCustomizedData();
                    }
                  });
                  globalData.bucket="";
                  globalData.file_size="";
                  globalData.file_md5="";
                  globalData.file_path="";
                  globalData.width ="";
                  globalData.height ="";

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
          deletePicFunc:function(data){
            var that = this;
            http.authHttp.post(url.apiUrl2+"bz-mix/bz/screen/pic/del",data).done(function(res) { 
                console.log(res);
                // var newData = res;
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
                      console.log('sss');
                    }
                  })
                }
            });
          }
        },

        watch:{
          '$route.path':function (to, from) {
              console.log('sss');
              console.log(to);
              console.log(from);
          }
        }
  };
  
  
  var callbackOnSuccessFunc = function(){
    //一般来说需要把这个路径和buccket写入js变量或隐藏input去，提交时判断，没有的话就是没传文件
    console.log('bucket=' + qnUpload.uploadSignInfo.bucket + ', aliyunPath=' + qnUpload.ossPath + ', file_size=' + qnUpload.fileSize + ', img_file_width=' + qnUpload.imgFileWidth + ', img_file_height=' + qnUpload.imgFileHeight + ', md5=' + qnUpload.md5);

      globalData.bucket=qnUpload.uploadSignInfo.bucket;
      globalData.file_size=qnUpload.fileSize;
      globalData.file_md5=qnUpload.md5;
      globalData.file_path=qnUpload.ossPath;
      globalData.width =qnUpload.imgFileWidth;
      globalData.height =qnUpload.imgFileHeight;
  }
  var callbackOnSuccessFunc2 = function(){
      globalData.bucket=qnUpload.uploadSignInfo.bucket;
      globalData.file_size=qnUpload.fileSize;
      globalData.file_md5=qnUpload.md5;
      globalData.file_path=qnUpload.ossPath;
      globalData.width =qnUpload.imgFileWidth;
      globalData.height =qnUpload.imgFileHeight;
  }
  //logo上传
  var qnUpload = new QnUpload(App.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackOnSuccessFunc);
    qnUpload.uploadOnSelectFile = true; //选中文件立刻上传
    qnUpload.selectFileBtn = 'selectfilesBtn';
    qnUpload.uploadRunBtn = 'postfilesBtn';
    qnUpload.uploadContainer = 'uploadContainer';
    qnUpload.ossFileDisp = 'ossfile';
    qnUpload.init();

  //背景图上传
  var qnUpload2 = new QnUpload(App.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackOnSuccessFunc2);
    qnUpload2.uploadOnSelectFile = true; //选中文件立刻上传
    qnUpload2.selectFileBtn = 'selectfilesBtn2';
    qnUpload2.uploadRunBtn = 'postfilesBtn2';
    qnUpload2.uploadContainer = 'uploadContainer2';
    qnUpload2.ossFileDisp = 'ossfile2';
    qnUpload2.init();
  var callbackOnSuccessFunc3 = function(){
    globalData.bucket=qnUpload.uploadSignInfo.bucket;
    globalData.file_size=qnUpload.fileSize;
    globalData.file_md5=qnUpload.md5;
    globalData.file_path=qnUpload.ossPath;
    globalData.width =qnUpload.imgFileWidth;
    globalData.height =qnUpload.imgFileHeight;
  }
  //背景图上传
  var qnUpload3 = new QnUpload(App.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackOnSuccessFunc3);
    qnUpload3.uploadOnSelectFile = true; //选中文件立刻上传
    qnUpload3.selectFileBtn = 'selectfilesBtn3';
    qnUpload3.uploadRunBtn = 'postfilesBtn3';
    qnUpload3.uploadContainer = 'uploadContainer3';
    qnUpload3.ossFileDisp = 'ossfile3';
    qnUpload3.init();
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
     /* background:blue;*/
      /*border:1px solid #ccc;*/
      box-sizing:border-box;
      position:relative;
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
    #appHotelIndex .section_one .section_one_bottom .section_one_bottom_btn{
      width:110px;
      height:30px;
      line-height:30px;
      text-align:center;
      box-sizing:border-box;
      /*margin-top:43px;
      margin-left:20px;*/
    }

    #appHotelIndex .section_two{
      height:530px;
      width:96%;
      padding:10px 2%;
      position:relative;
      overflow-x:scroll;
      overflow-y:hidden;
    }
    #appHotelIndex .section_two ul{
      list-style:none;
      height:530px;
      width:1750px;
    }
    #appHotelIndex .section_two li{
      float:left;
      width:240px;
      margin-right:10px;
      /*overflow-y:hidden;*/
      height:530px;
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
      margin-bottom:15px;
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
      width:100%;
      height:22px;
      overflow:hidden;
    }
    #appHotelIndex .section_two li .four_p i:nth-child(1){
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
      margin-left:10px;
    }
    #appHotelIndex .section_two li .four_p i:nth-child(2){
      display:block;
      width:90px;
      height:22px;
      border:1px solid #ccc;
      box-sizing:border-box;
      text-align:center;
      background:#d7d7d7;
      border-radius:5px;
      font-style: normal;
      float:left;
      margin-left:20px;
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
    
</style>

