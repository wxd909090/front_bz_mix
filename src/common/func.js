export default {

    copyObj1 : function (obj) {
        var newObj = {};
        for(var attr in obj){
        	if(obj[attr].status == 1){
        		newObj[attr] = obj[attr];
        	}  
        }
        return newObj;
    },
    copyObj2 : function (obj) {
        var newObj = {};
        for(var attr in obj){
        	if(obj[attr].status == 0){
        		newObj[attr] = obj[attr];
        	}  
        }
        return newObj;
    },
    copyObj3 : function (obj) {
        var newObj = {};
        for(var attr in obj){
        	if(obj[attr].status == 2){
        		newObj[attr] = obj[attr];
        	}  
        }
        return newObj;
    },
    // 检查是否为空
    messageBox: function(message) {
        this.$alert(message, '提示', {
            confirmButtonText: '确定',
            callback: action => {
                this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                });
            }
        });
    }

}