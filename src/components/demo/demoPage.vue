<template>
  <div>
    <br/><br/>
    <button @click="jumpToAgentPlatform('25332560351461377')" >跳转到某代理商管理</button>
    <br/><br/>
    <button @click="jumpToBzMixPlatform('25194861737017352')">跳转到某商户管理</button>
  </div>

</template>


<script>
//必定有的import ...
import EnvBase from '../../env.js'
import SvrApi from '../../svrapi.js'
var PT = EnvBase.PT;

export default {
    name : 'demoPage',

    mounted: function() {
        const self = this;
       
    },

    data: function() {
        return {
            
        }
    },//end of function


    methods: {
        jumpToAgentPlatform(guid){
            var newWin = window.open('static/loading.html');
            var jumpParams = {
                bind_usagespace : 'PT_AGENT_BZ', //代理商平台
                bind_guid : guid,
                bind_user_type : 'agent',
            };
            PT.apiClient.query(SvrApi.grantJumpPlatform, jumpParams, function(rsp){
                if (rsp.code == 0){
                    var url = rsp.data.site_url + "?service_ticket=" + rsp.data.service_ticket + "&local_sess_clean=1";
                    console.log(url);
                    newWin.location.href = url;
                }else{
                    alert(rsp.msg);
                }
            });
        },


        jumpToBzMixPlatform(guid){
            var newWin = window.open('static/loading.html');
            var jumpParams = {
                bind_usagespace : 'PT_MIX_BZ', //商户平台
                bind_guid : guid,
                bind_user_type : 'merchant',
            };
            PT.apiClient.query(SvrApi.grantJumpPlatform, jumpParams, function(rsp){
                if (rsp.code == 0){
                    var url = rsp.data.site_url + "?service_ticket=" + rsp.data.service_ticket + "&local_sess_clean=1";
                    console.log(url);
                    newWin.location.href = url;
                }else{
                    alert(rsp.msg);
                }
            });
        }
    
    },//end of methods
}

</script>

<style >

</style>
