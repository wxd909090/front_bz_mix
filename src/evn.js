// export default {
//   apiUrl: 'http://api2.qnbar.cn/',
//   localName: 'ftDev'
// }
var service='http://api2.qnbar.cn/';
var api={
   login:service+"zyu/oss/admin/login",
   addstoreinfo:service+"bz-oss/oss/mix-agent/create-agent",
   editstoreinfo:service+"bz-oss/oss/mix-agent/update-agent",
   getstorelist:service+"bz-oss/oss/mix-agent/get-list",
   changepass:service+"bz-oss/oss/change/pwd",
}
export default {
  api:api
}