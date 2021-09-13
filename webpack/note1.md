webpack处理文件的过程可以分为两个维度：文件间的关系和文件的内容。文件间的关系处理，主要是通过文件和模块标记方法来实现；文件内容的处理主要通过loaders和plugins来处理。

使用loader时需要注意：
1. use属性的值需要是一个由Loader名称组成的数组，Loader的执行顺序是由后到前的
2. 每一个Loader都可以通过URL querystring的方式传入参数，例如css-loader?minimize中的minimize告诉css-loader要开启CSS压缩
给Loader传入属性的方式除了有querystring外，还可以通过Object传入。


`Entry`：入口，Webpack执行构建的第一步将从Entry开始，可抽象成输入。
`Module`：模块，在Webpack里一切皆模块，一个模块对应着一个文件。Webpack会从配置的Entry开始递归找出所有依赖的模块。
`Chunk`：代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。
`Loader`：模块转换器，用于把模块原内容按照需求转换成新内容。
`Plugin`：扩展插件，在Webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
`Output`：输出结果，在Webpack经过一系列处理并得出最终想要的代码后输出结果。

output.filename 配置输出文件的名称，为string类型。如果只有一个输出文件，则可以将它写成静态不变的；但是有多个chunk要输出时，就需要借助模版和变量了。
```
filename: '[name].[chunkhash].js'
```

这里再解释下`chunk`这个概念，`chunk`表示一个文件，默认情况下webpack的输入是一个入口文件，输出也是一个文件，这个文件就是一个`chunk`，chunkId就是产出时给每个文件一个唯一标识id，chunkhash就是文件内容的md5值，name就是在entry中指定的key值。

变量名     |    含义
-------- | -----------
id  | chunk的唯一标识，从0开始
name  | chunk的名称
hash  | chunk的唯一标识的Hash值
chunkhash  | chunk内容的Hash值

其中，hash和chunkhash的长度是可指定的，[hash:8]代表取8位的Hash值，默认是20位。

output.chunkFilename配置无入口的Chunk在输入时的文件名称。chunkFilename和filename非常相似，但chunkFilename只用于制定在运行过程中生成的chunk在输出时的文件名称。chunkFilename支持和filename一致的内置变量。

## Module
module配置处理模块的规则。
#### 配置Loader
rules配置模块的读取和规则解析，通常用来配置Loader，只一个数组。
 - 条件匹配：通过test、include、exclude三个配置项来选中Loader要应用规则的文件。
 - 应用规则：对选中的文件通过use配置项来应用Loader，可以只应用一个Loader或者按照从后往前的顺序应用一组Loader，同时可以分别向Loader传入参数。
 - 重置顺序：一组Loader的执行顺序默认是从右到左执行的，通过enforce选项可以将其中一个Loader的执行顺序放到最前或最后。

🌰：
```
module: {
    rules: [
        {
            // 命中JS文件
            test: /\.js$/,
            // 用babel-loader转换JS文件
            // ?cacheDirectory表示传给babel-loader的参数，用于缓存babel的编译结果，加快重新编译的速度
            use: ['babel-loader?cacheDirectory'],
            // 只命中src目录里的JS文件，加快Webpack的搜索速度
            include: path.resolve(__dirname, 'src')
        },
        {
            // 命中SCSS文件
            test: /\.scss$/,
            // 使用一组Loader去处理SCSS文件
            // 处理顺序为从后到前，即先交给sass-loader处理，再交给css-loader，最后交给style-loader
            use: ['style-loader', 'css-loader', 'sass-loader'],
            // 排除node_modules目录下的文件
            exclude: path.resolve(__dirname, 'node_modules'),
        },
        {
            // 对非文本文件采用file-loader加载
            test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
            use: ['file-loader'],
        }
    ]
}
```

上面的test、include、exclude这三个命中文件的配置项只传入了一个字符串或正则，其实它们也支持数组类型。数组中的每项之间是 **“或”** 的关系，即文件的路径只要满足数组中任何一个条件，就会被命中。


## Module
webpack在启动后会从配置的入口模块出发找到所有依赖的模块，`resolve`配置webpack如何寻找模块所对应的文件。webpack内置JS模块化语法解析功能，默认会采用模块化标准里的规则去寻找，但我们也可以根据自己的需要修改默认的规则。

#### alias
`resolve.alias`配置项通过别名来将原导入路径映射成一个新的导入路径。

🌰：
```javascript
resolve:{
    alias:{
        components: './src/components/'
    }
}
```
当通过`import Button from 'components/button'`导入时，实际上被alias等价替换成了`import Button from './src/components/button'`。

#### extensions
在导入语句没带文件后缀时， Webpack会自动带上后缀后去尝试访问文件是否存在。
🌰：
```javascript
resolve: {
    extensions: ['.js', '.json']
}
```
当遇到require('./data')这样的导入语句时，Webpack会先寻找./data.js文件，如果该文件不存在，就去寻找./data.json文件，如果还是找不到，就报错。


## DevServer

#### hot
模块热替换功能

#### inline
如果 开启inline，则DevServer会在构建变化后的代码时通过 代理客户端控制网页刷新。

如果 关闭inline，则DevServer将无法直接控制要开发的网页。这时它会通过iframe 的方式去运行要开发的网页。在构建完变化后的代码时，会通过刷新 iframe 来实现实时预览，但这时我们需要去 http://localhost:8080/webpack­-dev-server/ 实时预览自己的网页。

#### historyApiFallback
historyApiFallback用户方便的开发单页应用。
最简单的配置：
```javascript
historyApiFallback: true;
```
这样会使任何请求都会返回index.html，用于只有一个HTML文件的应用。

若应用由多个单页面应用组成，则需要DevServer根据不同的请求返回不同的HTML文件，配置如下：
```javascript
historyApiFallback: {
    rewrites: [
        // /user开头的都返回user.html
        {from: /^\/user/, to: '/user.html'},
        // /home开头的都返回home.html
        {from: /^\/home/, to: '/home.html'},
        {from: /./, to: '/index.html'}
    ]
}
```

### contentBase
devServer.contentBase配置DevServer HTTP服务器的文件根目录。默认情况下是当前的执行目录，通常是项目根目录。若想将根目录下的public目录设置成DevServer服务器的文件根目录，配置如下：
```javascript
devServer:{
    contentBase: path.join(__dirname, 'public')
}
```
### disableHostCheck
用于配置是否关闭用于DNS重新绑定的HTTP请求的HOST检查。DevServer默认只接收来自本地的请求，关闭后可以接收来自任意HOST的请求。通常和 `host: '0.0.0.0'`搭配使用：
```javascript
devServer:{
    disableHostCheck: true,
    host: '0.0.0.0'
}
```
### https
DevServer默认使用HTTP服务，也能使用HTTPS服务。
```javascript
devServer:{
    https: true
}
```
这样DevServer会自动为我们生成一份HTTPS证书。

### Devtool开发工具
来控制是否生成，以及如何生成Source Map。一下是官方文档的配置选项：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191205143057396.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FteWxlZVlNWQ==,size_16,color_FFFFFF,t_70)

从表格中看出`eval`方式可大幅提高持续构建效率，这对经常需要边改边调试的同学而言非常重要，这种适用于开发环境。对于生产环境，则希望更精准的Source Map，需要从bundle中分离并独立存在。

**推荐方式：**

开发环境推荐： `cheap-module-eval-source-map`

生产环境推荐： `cheap-module-source-map`

### watch和watchOptions

监听模式默认是关闭的。在使用DevServer时，监听模式默认是开启的。

webpack提供了watchOptions配置项去更灵活的监控监听模式。

```javascript
module.export = {
    // 只有在开启监听模式时，watchOptions才有意义
    watch: true,
    watchOptions: {
        // 支持正则
        ingnored: /node_modules/,
        // 监听到变化后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        aggregateTimeout: 300,
        // 默认每秒询问1000次
        poll: 1000
    }
}
```



