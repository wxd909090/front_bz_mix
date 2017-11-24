// import evn from '../evn.js'

// var baseUrl = evn.apiUrl;
// 豆瓣电影基本url
// var basedouban='https://api.douban.com/v2/movie/search';
export default {
  authHttp: {
    post: function(url, data) {
      return $.ajax({
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        type: 'POST',
        url:  url,
        data: data
      })
    },

  }
}
