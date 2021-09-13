var http = require('http');
var fs = require('fs');

// http.createServer(function(req, res) {
//     var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
//     switch(path) {
//         case '':
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('HomePage');
//             break;
//         case '/about':
//             res.writeHead(200, {'Context-Type': 'text/plain'});
//             res.end('About');
//             break;
//         default:
//             res.writeHead(200, {'Context-Type': 'text/plain'});
//             res.end('Not Found');
//             break;
//     }
    
// }).listen(3000);

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function (err, data) {   // __dirname会被解析为正在执行的脚本所在的目录
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    })
}

http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/img/logo.jpg':
            serveStaticFile(res, 'public/img/logo.jpg', 'image.jpeg');
            break;
        default:
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
    }
    
}).listen(3000);

console.log('Server started on localhost:3000...')