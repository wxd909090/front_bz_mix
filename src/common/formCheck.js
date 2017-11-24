export default {

    // -------------------addStoreForm----------------------
    // 检查是否为空
    checkEmpty : function (rule, value, callback) {
        setTimeout(() => {
            console.log(value);
            if(value==""||value==undefined){
                callback(new Error('不能为空'));
            }else{
                callback();
            }
        }, 500);
    },
    // 检查是否是正整数
    checkPlusNumber : function (rule, value, callback) {
        if (!value) {
            return callback(new Error('不能为空'));
        }
        setTimeout(() => {
            value = Number(value);
            if (!Number.isInteger(value)) {
                callback(new Error('请输入大于0的整数值'));
            } else {
                if (value < 0) {
                    callback(new Error('必须大于0'));
                } else {
                    callback();
                }
            }
        }, 500);
    },
    // 验证电话号码
    checkContactNumber : function(rule, value, callback){   
        var mobile = $.trim(value);
        var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
        var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
        var error = "请正确填写电话号码，例如:13511111111或010-11111111";  
        //如果为1开头则验证手机号码 
        if(value==""||value==undefined){
            callback(new Error('号码不能为空'));
        }else{
            if (mobile.substring(0, 1) == 1) {  
                if (isMobile.exec(mobile)&&mobile.length==11) {  
                    callback();
                    return false;  
                }else{
                    callback(new Error(error));
                    return false;  
                }  
            }else if (mobile.substring(0, 1) == 0) {  
                if (isPhone.test(mobile)) {  
                    callback();
                    return false;  
                }else{
                    callback(new Error(error));
                    return false;  
                }    
            }else{
                callback(new Error(error));
            }  
        } 
    }  
    // -------------------addStoreForm----------------------
}
