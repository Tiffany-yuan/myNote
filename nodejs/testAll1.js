const fs = require("fs");
const url = require("url");
const http = require("http");

let server = http.createServer((request, response) => {
    console.log(request.url);
    // let { pathname } = url.parse(request.url, true);
    const url1 = new URL(request.url);

    console.log(url1.searchParams);

    let rs = fs.createReadStream(`www${pathname}`);
    // `request`和`response`就是一个典型的读写流（`ReadStream`、`WriteStream`）
    rs.pipe(response);

    // 读取失败 ==> 404
    rs.on("error", ex => {
        response.writeHeader(404);
        response.write("404 Not Found");
        response.end();
    });
});


server.listen(8089, () => console.log('listen on 8089'));