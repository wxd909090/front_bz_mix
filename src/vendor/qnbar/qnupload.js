//这坨是spark md5 min库  https://github.com/satazor/js-spark-md5
(function(factory){if(typeof exports==="object"){module.exports=factory()}else if(typeof define==="function"&&define.amd){define(factory)}else{var glob;try{glob=window}catch(e){glob=self}glob.SparkMD5=factory()}})(function(undefined){"use strict";var add32=function(a,b){return a+b&4294967295},hex_chr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32(a<<s|a>>>32-s,b)}function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a+=(b&c|~b&d)+k[0]-680876936|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[1]-389564586|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[2]+606105819|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[3]-1044525330|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[4]-176418897|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[5]+1200080426|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[6]-1473231341|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[7]-45705983|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[8]+1770035416|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[9]-1958414417|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[10]-42063|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[11]-1990404162|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[12]+1804603682|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[13]-40341101|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[14]-1502002290|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[15]+1236535329|0;b=(b<<22|b>>>10)+c|0;a+=(b&d|c&~d)+k[1]-165796510|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[6]-1069501632|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[11]+643717713|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[0]-373897302|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[5]-701558691|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[10]+38016083|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[15]-660478335|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[4]-405537848|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[9]+568446438|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[14]-1019803690|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[3]-187363961|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[8]+1163531501|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[13]-1444681467|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[2]-51403784|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[7]+1735328473|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[12]-1926607734|0;b=(b<<20|b>>>12)+c|0;a+=(b^c^d)+k[5]-378558|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[8]-2022574463|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[11]+1839030562|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[14]-35309556|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[1]-1530992060|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[4]+1272893353|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[7]-155497632|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[10]-1094730640|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[13]+681279174|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[0]-358537222|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[3]-722521979|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[6]+76029189|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[9]-640364487|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[12]-421815835|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[15]+530742520|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[2]-995338651|0;b=(b<<23|b>>>9)+c|0;a+=(c^(b|~d))+k[0]-198630844|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[7]+1126891415|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[14]-1416354905|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[5]-57434055|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[12]+1700485571|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[3]-1894986606|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[10]-1051523|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[1]-2054922799|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[8]+1873313359|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[15]-30611744|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[6]-1560198380|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[13]+1309151649|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[4]-145523070|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[11]-1120210379|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[2]+718787259|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[9]-343485551|0;b=(b<<21|b>>>11)+c|0;x[0]=a+x[0]|0;x[1]=b+x[1]|0;x[2]=c+x[2]|0;x[3]=d+x[3]|0}function md5blk(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24)}return md5blks}function md5blk_array(a){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=a[i]+(a[i+1]<<8)+(a[i+2]<<16)+(a[i+3]<<24)}return md5blks}function md51(s){var n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)))}s=s.substring(i-64);length=s.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=s.charCodeAt(i)<<(i%4<<3)}tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function md51_array(a){var n=a.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk_array(a.subarray(i-64,i)))}a=i-64<n?a.subarray(i-64):new Uint8Array(0);length=a.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=a[i]<<(i%4<<3)}tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function rhex(n){var s="",j;for(j=0;j<4;j+=1){s+=hex_chr[n>>j*8+4&15]+hex_chr[n>>j*8&15]}return s}function hex(x){var i;for(i=0;i<x.length;i+=1){x[i]=rhex(x[i])}return x.join("")}if(hex(md51("hello"))!=="5d41402abc4b2a76b9719d911017c592"){add32=function(x,y){var lsw=(x&65535)+(y&65535),msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}}if(typeof ArrayBuffer!=="undefined"&&!ArrayBuffer.prototype.slice){(function(){function clamp(val,length){val=val|0||0;if(val<0){return Math.max(val+length,0)}return Math.min(val,length)}ArrayBuffer.prototype.slice=function(from,to){var length=this.byteLength,begin=clamp(from,length),end=length,num,target,targetArray,sourceArray;if(to!==undefined){end=clamp(to,length)}if(begin>end){return new ArrayBuffer(0)}num=end-begin;target=new ArrayBuffer(num);targetArray=new Uint8Array(target);sourceArray=new Uint8Array(this,begin,num);targetArray.set(sourceArray);return target}})()}function toUtf8(str){if(/[\u0080-\uFFFF]/.test(str)){str=unescape(encodeURIComponent(str))}return str}function utf8Str2ArrayBuffer(str,returnUInt8Array){var length=str.length,buff=new ArrayBuffer(length),arr=new Uint8Array(buff),i;for(i=0;i<length;i+=1){arr[i]=str.charCodeAt(i)}return returnUInt8Array?arr:buff}function arrayBuffer2Utf8Str(buff){return String.fromCharCode.apply(null,new Uint8Array(buff))}function concatenateArrayBuffers(first,second,returnUInt8Array){var result=new Uint8Array(first.byteLength+second.byteLength);result.set(new Uint8Array(first));result.set(new Uint8Array(second),first.byteLength);return returnUInt8Array?result:result.buffer}function hexToBinaryString(hex){var bytes=[],length=hex.length,x;for(x=0;x<length-1;x+=2){bytes.push(parseInt(hex.substr(x,2),16))}return String.fromCharCode.apply(String,bytes)}function SparkMD5(){this.reset()}SparkMD5.prototype.append=function(str){this.appendBinary(toUtf8(str));return this};SparkMD5.prototype.appendBinary=function(contents){this._buff+=contents;this._length+=contents.length;var length=this._buff.length,i;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk(this._buff.substring(i-64,i)))}this._buff=this._buff.substring(i-64);return this};SparkMD5.prototype.end=function(raw){var buff=this._buff,length=buff.length,i,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff.charCodeAt(i)<<(i%4<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.prototype.reset=function(){this._buff="";this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}};SparkMD5.prototype.setState=function(state){this._buff=state.buff;this._length=state.length;this._hash=state.hash;return this};SparkMD5.prototype.destroy=function(){delete this._hash;delete this._buff;delete this._length};SparkMD5.prototype._finish=function(tail,length){var i=length,tmp,lo,hi;tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(this._hash,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=this._length*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(this._hash,tail)};SparkMD5.hash=function(str,raw){return SparkMD5.hashBinary(toUtf8(str),raw)};SparkMD5.hashBinary=function(content,raw){var hash=md51(content),ret=hex(hash);return raw?hexToBinaryString(ret):ret};SparkMD5.ArrayBuffer=function(){this.reset()};SparkMD5.ArrayBuffer.prototype.append=function(arr){var buff=concatenateArrayBuffers(this._buff.buffer,arr,true),length=buff.length,i;this._length+=arr.byteLength;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk_array(buff.subarray(i-64,i)))}this._buff=i-64<length?new Uint8Array(buff.buffer.slice(i-64)):new Uint8Array(0);return this};SparkMD5.ArrayBuffer.prototype.end=function(raw){var buff=this._buff,length=buff.length,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i,ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff[i]<<(i%4<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.ArrayBuffer.prototype.reset=function(){this._buff=new Uint8Array(0);this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.ArrayBuffer.prototype.getState=function(){var state=SparkMD5.prototype.getState.call(this);state.buff=arrayBuffer2Utf8Str(state.buff);return state};SparkMD5.ArrayBuffer.prototype.setState=function(state){state.buff=utf8Str2ArrayBuffer(state.buff,true);return SparkMD5.prototype.setState.call(this,state)};SparkMD5.ArrayBuffer.prototype.destroy=SparkMD5.prototype.destroy;SparkMD5.ArrayBuffer.prototype._finish=SparkMD5.prototype._finish;SparkMD5.ArrayBuffer.hash=function(arr,raw){var hash=md51_array(new Uint8Array(arr)),ret=hex(hash);return raw?hexToBinaryString(ret):ret};return SparkMD5});






// QnUpload
function  QnUpload(apiBaseUrl, usePlatform, useModule, useFunc, callbackOnSuccess) {

    var thatQnUploader = this;

    var baseUrl = apiBaseUrl;

    this.uploadSignInfo = null;
    this.useUploadFileName = ''; //如果非原文件名，实际使用的文件名
    this.uploader = null;
    this.platform = usePlatform;
    this.module = useModule;
    this.func = useFunc;

    this.uploadOnSelectFile = false;
    this.maxRetries = 2;

    //页面元素相关
    this.selectFileBtn = 'selectfilesBtn';
    this.uploadRunBtn = 'postfilesBtn';
    this.uploadContainer = 'uploadContainer';
    this.ossFileDisp = 'ossfile';

    this.ossPath = '';//上传到oss后的使用路径
    this.imgFileWidth = 0;
    this.imgFileHeight = 0;
    this.fileSize = 0;
    this.md5 = '';
    this.md5Film = '';

    this.CONST_STATUS_UNSELECTED = 'UNSELECTED';//未选择文件
    this.CONST_STATUS_SELECTED = 'SELECTED';//已选择文件
    this.CONST_STATUS_UPLOADING = 'UPLOADING';//上传过程中
    this.CONST_STATUS_SUCCESS = 'SUCCESS';//上传成功
    this.CONST_STATUS_FAIL = 'FAIL';//上传失败
    this.status = this.CONST_STATUS_UNSELECTED;
    
    //获取随机字符串
    var getRandomString = function(len) {
    　　len = len || 32;
    　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
    　　var maxPos = chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
        　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    //获取文件后缀
    this.getSuffix = function(filename) {
        var pos = filename.lastIndexOf('.')
        var suffix = ''
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix;
    }

    this.showMsg = function(msg){
        alert(msg);
    }

    //计算文件md5
    this.calculateMd5ByChunkSize = function(file, chunkSize, callBack){    
        var fileReader = new FileReader(),    
            blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,      
            // read in chunks of 2MB    
            chunks = Math.ceil(file.size / chunkSize),    
            currentChunk = 0,    
            spark = new SparkMD5();    
        
        fileReader.onload = function(e) {    
            spark.appendBinary(e.target.result); // append binary string    
            currentChunk++;    
        
            if (currentChunk < chunks) {    
                loadNext();    
            }    
            else {    
                callBack(spark.end());  
            }    
        };    
        
        function loadNext() {    
            var start = currentChunk * chunkSize,    
                end = start + chunkSize >= file.size ? file.size : start + chunkSize;    
        
            fileReader.readAsBinaryString(blobSlice.call(file, start, end));    
        };    
        
        loadNext();    
    } 

    //计算电影视频文件md5
    this.calculateFilmMd5 = function(file, callBack){    
        var fileReader = new FileReader(),    
            blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,      
            chunkSize = 4096,//4k  
            currentChunk = 0,   
            spark = new SparkMD5();

        var segHashResults = new Array();
        
        //读取OK时执行事件
        fileReader.onload = function(e) {    
            spark.appendBinary(e.target.result); // append binary string   
            segHashResults.push(spark.end());
            currentChunk++;

            if (currentChunk < 4){
                loadSeg(currentChunk);

            }else{
                //console.log(segHashResults);
                var filmOrgMd5 = segHashResults.join(";");
                var filmMd5 = SparkMD5.hash(filmOrgMd5);
                callBack(filmMd5);
            }
        };    
        
        function loadSeg(idx) {
            var start = 0, end = 0;
            if (idx == 0){
                start = chunkSize;
                end = chunkSize * 2;

            } else if (idx == 1){
                start = Math.floor(file.size / 3 * 2);
                end = Math.floor(file.size / 3 * 2) + chunkSize;

            } else if (idx == 2){
                start = Math.floor(file.size / 3);
                end = Math.floor(file.size / 3) + chunkSize;

            } else if (idx == 3){
                start = file.size - chunkSize - chunkSize;
                end = file.size - chunkSize;
            }

            fileReader.readAsBinaryString(blobSlice.call(file, start, end));    
        };    
        
        /*
        loadSeg(chunkSize, chunkSize * 2);
        loadSeg(Math.floor(file.size / 3 * 2), Math.floor(file.size / 3 * 2) + chunkSize);
        loadSeg(Math.floor(file.size / 3), Math.floor(file.size / 3) + chunkSize);
        loadSeg(file.sizefile.size - chunkSize - chunkSize, file.sizefile.size - chunkSize);
        */

        loadSeg(0);
    } 

    this.dealUploadSignAsFrontSetting = function(paramData){
        thatQnUploader.uploadSignInfo = paramData;

        var mimeTypes = [];
        var fileSizeMB = 10;
        var minFileSizeMB = 0;
        if (thatQnUploader.uploadSignInfo.mime_types){
            mimeTypes[0] = { title : "files", extensions :thatQnUploader.uploadSignInfo.mime_types };
        }
        if (thatQnUploader.uploadSignInfo.max_size_mb){
            fileSizeMB = thatQnUploader.uploadSignInfo.max_size_mb;
        }
        if (thatQnUploader.uploadSignInfo.min_size_mb){
            minFileSizeMB = thatQnUploader.uploadSignInfo.min_size_mb;
            console.log('minFileSizeMB = ' + minFileSizeMB);
        }

        

        plupload.addFileFilter('min_file_size', function(minSize, file, cb) {
            var undef;
         
            // Invalid file size
            if (file.size !== undef && minSize && file.size < minSize) {
                this.trigger('Error', {
                  code : plupload.FILE_SIZE_ERROR,
                  message : plupload.translate('File size error.'),
                  file : file
                });
                cb(false);
            } else {
                cb(true);
            }
        });

        thatQnUploader.uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : thatQnUploader.selectFileBtn, //id of the DOM element or DOM element itself to use as file dialog trigger.
            container: thatQnUploader.uploadContainer, //id of the DOM element or DOM element itself that will be used to wrap uploader structures. Defaults to immediate parent of the browse_button element.
            flash_swf_url : 'lib/plupload-2.3.1/js/Moxie.swf',
            silverlight_xap_url : 'lib/plupload-2.3.1/js/Moxie.xap',
            //url : 'http://oss.aliyuncs.com', 
            multi_selection: false, //多文件上传
            max_retries: thatQnUploader.maxRetries, //最大上传重试次数

            'filters': {
                mime_types : mimeTypes,
                max_file_size : fileSizeMB + 'mb', 
                min_file_size : minFileSizeMB * 1024 *1024,
                prevent_duplicates : true //不允许选取重复文件
            },
            'url': thatQnUploader.uploadSignInfo.host,

            init: {
                //init()执行
                PostInit: function() {
                    document.getElementById(thatQnUploader.ossFileDisp).innerHTML = '';

                    if (!thatQnUploader.uploadOnSelectFile){
                        document.getElementById(thatQnUploader.uploadRunBtn).onclick = function() {
                            
                            thatQnUploader.uploader.start();

                            return false;
                        };
                    }
                },

                //成功选择了待上传文件后触发
                FilesAdded: function(up, files) {
                    while (up.files.length > 1) {
                        up.removeFile(up.files[0]);
                    }
                    up.refresh();
                    files = up.files;
                    document.getElementById(thatQnUploader.ossFileDisp).innerHTML = '';
                    plupload.each(files, function(file) {
                        document.getElementById(thatQnUploader.ossFileDisp).innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                        +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                        +'</div>';

                        console.log('file type = ' + file.type);

                        thatQnUploader.fileSize = file.size;
                        if (file.type == 'image/jpeg' || file.type == 'image/png' 
                            || file.type == 'image/bmp' || file.type == 'image/gif'){
                            var nativeFile = file.getNative();

                            //获取md5
                            thatQnUploader.calculateMd5ByChunkSize(nativeFile, file.size, function(md5){
                                thatQnUploader.md5 = md5;
                                console.log('image file md5 = ' + thatQnUploader.md5);
                            });

                            var reader = new FileReader();
                            reader.readAsDataURL(nativeFile);
                            reader.onload = (function (e) {
                                var image = new Image();
                                image.src = e.target.result;
                                image.onload = function () {
                                    thatQnUploader.imgFileWidth = this.width;
                                    thatQnUploader.imgFileHeight = this.height;
                                };
                            });
                        }

                        if (file.type == 'video/x-matroska' || file.type == 'video/mp4' 
                            || file.type == 'video/avi'){
                            var nativeFile = file.getNative();

                            if (file.size <= 100 * 1024 * 1024){//100mb内计算文件md5
                                thatQnUploader.calculateMd5ByChunkSize(nativeFile, file.size, function(md5){
                                    thatQnUploader.md5 = md5;
                                    console.log('file md5 = ' + thatQnUploader.md5);
                                });
                            }

                            thatQnUploader.calculateFilmMd5(nativeFile, function(md5){
                                thatQnUploader.md5Film = md5;
                                console.log('film file md5 = ' + thatQnUploader.md5Film);
                            });
                        }
                        
                    });

                    if (thatQnUploader.uploadOnSelectFile){
                        thatQnUploader.uploader.start();
                    }
                },

                //开始执行上传前触发
                BeforeUpload: function(up, file) {
                    /*check_object_radio();
                    set_upload_param(up, file.name, true);*/
                    thatQnUploader.queryUploadSignAndParams(
                        thatQnUploader.platform, 
                        thatQnUploader.module, 
                        thatQnUploader.func, 
                        thatQnUploader.dealUploadSignAsUpload, 
                        false);
                },

                //上传过程持续多次触发，用来更新进度条
                UploadProgress: function(up, file) {
                    var d = document.getElementById(file.id);
                    d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                    var prog = d.getElementsByTagName('div')[0];
                    var progBar = prog.getElementsByTagName('div')[0]
                    progBar.style.width= 2*file.percent+'px';
                    progBar.setAttribute('aria-valuenow', file.percent);
                },

                //文件成功上传后触发
                FileUploaded: function(up, file, info) {
                    if (info.status == 200)
                    {
                        var theHost = thatQnUploader.uploadSignInfo.host;
                        if (thatQnUploader.uploadSignInfo.access_host){
                            theHost = thatQnUploader.uploadSignInfo.access_host;
                        }
                        var fileName = file.name;
                        if (thatQnUploader.useUploadFileName){
                            fileName = thatQnUploader.useUploadFileName;
                        }
                        thatQnUploader.ossPath = theHost + '/' + thatQnUploader.uploadSignInfo.dir + fileName;
                        //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + file.name;
                        if (callbackOnSuccess){
                            callbackOnSuccess();
                        }
                    }
                    else
                    {
                        alert('文件上传有些异常， status=' + info.status);
                        //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                    } 
                },

                //Fires when a error occurs 
                Error: function(up, err) {
                    if (err.code == -600) {
                        if (minFileSizeMB > 0){
                            thatQnUploader.showMsg("文件大小错误，请选择" + minFileSizeMB + "mb 到 " + fileSizeMB + "mb范围内的文件");
                        }else{
                            thatQnUploader.showMsg("文件过大，请选择" + fileSizeMB + "mb范围以内的文件");
                        }
                        
                    }
                    else if (err.code == -601) {
                        thatQnUploader.showMsg("文件类型错误，请选择 " + thatQnUploader.uploadSignInfo.mime_types + " 类型的文件");
                    }
                    else if (err.code == -602) {
                        thatQnUploader.showMsg("请勿重复上传，这个文件已经上传过一遍了");
                    }
                    else 
                    {
                        thatQnUploader.showMsg("error:" + err.response);
                    }
                }
            }
        });

        
        thatQnUploader.uploader.init();
    }

    this.dealUploadSignAsUpload = function(paramData){
        thatQnUploader.uploadSignInfo = paramData;

        var uploadFileName = "${filename}";
        if (thatQnUploader.uploadSignInfo.upload_file_name){
            var suffix = thatQnUploader.getSuffix(thatQnUploader.uploader.files[0].name);
            uploadFileName = thatQnUploader.uploadSignInfo.upload_file_name + suffix;
            thatQnUploader.useUploadFileName = uploadFileName;
        }

        var new_multipart_params = {
            'key' : thatQnUploader.uploadSignInfo.dir + uploadFileName, //阿里云要的格式
            'policy': thatQnUploader.uploadSignInfo.policy,
            'OSSAccessKeyId': thatQnUploader.uploadSignInfo.accessid, 
            'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
            //'callback' : callbackbody,
            'signature': thatQnUploader.uploadSignInfo.signature,
        };

        thatQnUploader.uploader.setOption({
            'url': thatQnUploader.uploadSignInfo.host,
            'multipart_params': new_multipart_params
        });

        thatQnUploader.uploader.start();
    }

    this.queryUploadSignAndParams = function(platform, module, func, callback, isAync){
        var xmlhttp = null;
        if (window.XMLHttpRequest)
        {
            xmlhttp=new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (!isAync){
            isAync = false;
        }
      
        if (xmlhttp!=null)
        {
            var serverUrl = baseUrl + 'common/oss/upload';
            xmlhttp.open( "POST", serverUrl, isAync );//这里必须同步请求！
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.timout = 3000;
            xmlhttp.withCredentials = true;

            var poststr = "platform=" + platform + "&module=" + module + "&func=" + func;
            xmlhttp.send( poststr );

            if (isAync){
                xmlhttp.onreadystatechange = function(){
                    if (xmlhttp.readyState == 4){
                        //console.log('async rsp:' + xmlhttp.responseText);
                        if (xmlhttp.status == 200){
                            var obj = JSON && JSON.parse(xmlhttp.responseText) || $.parseJSON(xmlhttp.responseText);
                            if (obj.code != 0){
                                alert('服务器错误:' + obj.msg);
                            }else{
                                if (!obj.data || obj.data.length == 0){
                                   alert('非法上传功能，请到后端配置此功能的上传');
                                }else{
                                    if (callback){
                                        callback(obj.data);
                                    }
                                }
                            }
                        }else{
                            alert('服务器出现异常');
                        }
                    }
                }
            }else{
                //console.log('sync rsp:' + xmlhttp.responseText);
                if (xmlhttp.status == 200){
                    var obj = JSON && JSON.parse(xmlhttp.responseText) || $.parseJSON(xmlhttp.responseText);
                    if (obj.code != 0){
                        alert('服务器错误:' + obj.msg);
                    }else{
                        if (!obj.data || obj.data.length == 0){
                           alert('非法上传功能，请到后端配置此功能的上传');
                        }else{
                            if (callback){
                                callback(obj.data);
                            }
                        }
                    }
                }else{
                    alert('服务器出现异常');
                }
            }
            
            
            return xmlhttp.responseText
        }
        else
        {
            alert("Your browser does not support XMLHTTP.");
        }
    }


    this.init = function(){
        //提前取一次sign用来设置上传参数
        thatQnUploader.queryUploadSignAndParams(
            thatQnUploader.platform, 
            thatQnUploader.module, 
            thatQnUploader.func, 
            thatQnUploader.dealUploadSignAsFrontSetting, 
            true);
    }

    this.setUsage = function(usagePlatform, usageModule, usageFunc){
        thatQnUploader.platform = usagePlatform;
        thatQnUploader.module = usageModule;
        thatQnUploader.func = usageFunc;
    }
}



export default {
    QnUpload : QnUpload
}
