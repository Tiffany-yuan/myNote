// import http from "http";

const http = require("http");

// const server = http.createServer((request, response) => {
//     response.write('<h1>hello nodeJs<h1>');
//     console.log(request);
//     response.end();
// })

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.end('index page');
        return;
    }
    if (request.url === '/lalala') {
        response.end('lalala page');
        return;
    }
})

server.listen(8089, () => console.log('listen on 8089'));

