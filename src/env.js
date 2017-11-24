

//qnbar平台工具的基础配置
//var PT = require('./vendor/qnbar/platform.js');
import Platform from './vendor/qnbar/platform.js'

var PT = new Platform.Platform();
PT.config.env = "test";
PT.config.hostBaseUrl = 'http://bz.local.qnbar.cn/';
PT.config.platformUsagespace = 'PT_MIX_BZ';
PT.config.apiBaseUrl = 'http://api2.dev.qnbar.cn/';
PT.config.qnloginBaseUrl = "http://passport.t.qnbar.cn/";
PT.config.qnloginPlatformNo = 10;  
PT.config.loginJumpBackUrl = encodeURIComponent(PT.config.hostBaseUrl);
PT.init();

export default {
    PT : PT
}