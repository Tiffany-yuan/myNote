## NodeJs简介
> 作为异步事件驱动的JavaScript运行时，Node旨在构建可伸缩的网络应用程序。 在下面的“hello world”示例中，可以同时处理许多连接。 在每次连接时都会触发回调，但是如果没有工作要做，Node将会休眠。

NodeJs的本质是一个Javascript运行时。该运行时基于异步事件驱动进行运作。

异步 --- 异步IO。执行IO请求后，调用方不等执行结果就继续执行下面的代码，IO操作完成后执行者会告诉调用者“我执行完了”。在NodeJs中通知方式是“回调”。

### NodeJs为什么这么快
单线程解决了多线程环境下线程切换开销以及可能的线程同步开销
异步+事件驱动保证了NodeJs主线程不会阻塞，会一直接受请求(这也是受人诟病的地方，其他语言实现的服务器，请求过大会排队处理，NodeJs会将请求全部入队，导致内存暴涨)

### 用node起一个本地服务

```javascript
const http = require("http");

let server = http.createServer((request, response) => {
    response.write('<h1>hello nodeJs<h1>');
    response.end();
})

server.listen(8089);
```

### fs
`xxxFileSync`是同步方式，一般情况下建议使用异步。

`fs.readFile()` 函数会缓冲整个文件。 （若要最小化内存成本，则尽可能选择流式`fs.createReadStream()`）

`fs.writeFile()`用来写文件。若不存在该文件，则创建并写入。存在的话替换文件内容。

上面这些方法都是把数据缓存到内存中，然后再回调，这样比较浪费内存。对于大文件，可以使用流（Stream）。


### url
querystring 模块提供用于解析和格式化 URL 查询字符串的实用工具。

`querystring.parse`只是对?后面(不包括`?`)的参数进行解析（以`=`和`&`分隔）

### new URL(input[, base])

如果 input 是相对路径，则需要 base。 如果 input 是绝对路径，则忽略 base。

### path
path模块只是处理文件路径，说白了就是字符串处理，跟文件系统无关