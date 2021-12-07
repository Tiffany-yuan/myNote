const http = require('http')
const port = 8000;

http.createServer(function (req, res) {
  // 开启Cors
  res.writeHead(200, {
    //设置允许跨域的域名，也可设置*允许所有域名
    'Access-Control-Allow-Origin': '*',
    //跨域允许的请求方法，也可设置*允许所有方法
    "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    //允许的header类型
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  let list = []
  let num = 0

  // 生成10万条数据的list
  for (let i = 0; i < 10000; i++) {
    num++
    list.push({
      src: 'https://img-blog.csdnimg.cn/3d48e6b1e4f84b9e9e835f02c06fe1fd.jpg?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6JCM5ZyG5ZyG5LiN6JCM,size_13,color_FFFFFF,t_70,g_se,x_16',
      text: `萌圆圆${num}`,
      tid: num
    })
  }
  res.end(JSON.stringify(list));
}).listen(port, function () {
  console.log('server is listening on port ' + port);
})