<template>
  <div>
    <br/><br/>
    <h4>图片文件:jpg,gif,png,bmp</h4>
    <div id="ossfile"></div>
    <br/>
    <div id="uploadContainer">
        <a id="selectfilesBtn" href="javascript:void(0);" class='uploadbtn'>选择文件</a>
        <a id="postfilesBtn" href="javascript:void(0);" class='uploadbtn'>开始上传</a>
    </div>


    <hr>
    <h4>选择视频文件：mp4,mkv,avi</h4>
    <div id="ossfile2"></div>
    <br/>
    <div id="uploadContainer2">
        <a id="selectfilesBtn2" href="javascript:void(0);" class='uploadbtn'>选择文件</a>
        <a id="postfilesBtn2" href="javascript:void(0);" class='uploadbtn'>开始上传</a>
    </div>
  </div>

</template>


<script>
//必定有的import ...
import EnvBase from '../../env.js'
import SvrApi from '../../svrapi.js'
import QnUploadDefine from '../../vendor/qnbar/qnupload.js'
var PT = EnvBase.PT;

export default {
    name : 'demoPage2',

    mounted: function() {
        const self = this;
        
        //================= 绑定上传元素执行上传 =================


        var callbackOnSuccessFunc = function(){
            //一般来说需要把这个路径和buccket写入js变量或隐藏input去，提交时判断，没有的话就是没传文件
            alert('bucket=' + qnUpload.uploadSignInfo.bucket + ', aliyunPath=' + qnUpload.ossPath + ', file_size=' + qnUpload.fileSize + ', img_file_width=' + qnUpload.imgFileWidth + ', img_file_height=' + qnUpload.imgFileHeight + ', md5=' + qnUpload.md5);
        }
        //参数请和后端确认
        var qnUpload = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'page_img', callbackOnSuccessFunc);
        qnUpload.init();



        var callbackOnSuccessFunc2 = function(){
            //一般来说需要把这个路径和buccket写入js变量或隐藏input去，提交时判断，没有的话就是没传文件
            alert('bucket2=' + qnUpload2.uploadSignInfo.bucket + ', aliyunPath2=' + qnUpload2.ossPath + ', md5=' + qnUpload2.md5);
        }

        //参数请和后端确认
        var qnUpload2 = new QnUploadDefine.QnUpload(PT.config.apiBaseUrl, 'PT_MIX_BZ', 'PROJECTOR_PAGE', 'intro_video', callbackOnSuccessFunc2);
        //qnUpload2.uploadOnSelectFile = true; //选中文件立刻上传
        qnUpload2.maxRetries = 10; //视频的重试设置多一些，避免中途断了死定
        qnUpload2.selectFileBtn = 'selectfilesBtn2';
        qnUpload2.uploadRunBtn = 'postfilesBtn2';
        qnUpload2.uploadContainer = 'uploadContainer2';
        qnUpload2.ossFileDisp = 'ossfile2';
        qnUpload2.init();
    },

    data: function() {
        return {
            
        }
    },//end of function


    methods: {
        
    
    },//end of methods
}

</script>

<style >

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
        height: 14px;
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
        height: 20px;
        line-height: 20px;
        text-align: center;
        transition-delay: 0s;
        transition-duration: 0.6s;
        transition-property: width;
        transition-timing-function: ease;
        width: 266.188px;
    }
</style>
