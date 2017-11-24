<template>
  <div id="uploadPicVideo">
    <div class="section_one">
      <div class="section_one_top">
        <!-- <img src=""> -->
        <p>关于酒店/上传图片、视频</p>
      </div>
    </div>
    <div class="section_two">
      <div class="section_two_top">
        <p class="section_three_top_lef">图片管理</p>
        <p class="section_three_top_rig">注:上传图的尺寸为1280*800，其它尺寸会影响显示效果,图片格式只能为jpg或png,图片大小不要超过2M。推动图片可以改变图片顺序,删除图片点击右上角。</p>
      </div>
      <p class="section_two_mid">上传图片</p>
      <div class="section_two_bottom">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        data: function (){
            return {
              
            }
        },
        created:function(){
          
        },
        mounted:function(){

        },
        methods:{
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

<style scoped>
    #uploadPicVideo{
      width:100%;
      overflow:hidden;
    }
    #uploadPicVideo .section_one{
      width:93%;
      overflow:hidden;
      padding:0px 2% 0px 5%;
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
      height:205px;
      list-style:none;
      margin-top:10px;
      overflow-x:scroll;
      overflow-y:hidden;
    }
    #uploadPicVideo .section_two .section_two_bottom ul{
      width:1500px;
      height:205px;
      list-style:none;
    }
    #uploadPicVideo .section_two .section_two_bottom ul li{
      display:block;
      width:324px;
      height:205px;
      margin-right:32px;
      background:green;
      float:left;
    }
</style>

