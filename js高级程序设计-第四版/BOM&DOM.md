# BOM
`BOM`的核心是`window`对象，表示浏览器的实例。`window`对象在浏览器中有两重身份，一个是`ECMAScript`中的`Global`对象，另一个就是浏览器窗口的JS接口。

因为window对象被复用为ECMAScript的Global对象，所以通过var生命的所有全局变量和函数都会变成window对象的属性和方法。
```javascript
var a = 'aaa';
let b = 'bbb';
console.log(window.a);  // 'aaa'
console.log(window.b);  // undefined
```
## window
### 窗口关系
`top`对象始终指向最上层窗口，即浏览器窗口本身。而`parent`对象始终指向当前窗口的父窗口。如果当前窗口是最上层窗口，则`parent`等于`top`（都等于`window`）。最上层的`window`如果不是通过`window.open()`打开的，那么其`name`属性就不会包含值。

还有一个`self`对象，其实就是`window`。之所以要暴露`self`，是为了和`top`、`parent`保持一致。

### 窗口位置与像素比
**`window.devicePixelRatio`：物理像素与CSS像素之间的转换比率。**

对于分辨率从 1920×1080 转换为 640×320 的设备，`window.devicePixelRatio` 的值就是 3。

`window.devicePixelRatio` 实际上与每英寸像素数(DPI，dots per inch)是对应的。DPI 表示单位像素密度，而 `window.devicePixelRatio` 表示物理像素与逻辑像素之间的缩放系数。

### 窗口大小
所有现代浏览器都支持4个属性: `innerWidth`、`innerHeight`、`outerWidth` 和 `outerHeight`。`outerWidth` 和 `outerHeight` 返回浏览器窗口自身的大小(不管是在最外层 `window` 上使用，还是在iframe中使用)。`innerWidth` 和 `innerHeight` 返回浏览器窗口中页面视口的大小(不包含浏览器边框和工具栏)。

`document.compatMode`检查页面是否处于标准模式。
- BackCompat：怪异模式
- CSS1Compat：标准模式或准标准模式

浏览器如何决定使用那个模式？ 在 HTML5 中，`DOCTYPE` 唯一的作用是启用标准模式。如果有任何其他字符位于 DOCTYPE 之前，比如注释或 XML 声明，会导致 Internet Explorer 9 或更早期的浏览器触发怪异模式。 **`<!DOCTYPE html>`**

### 定时器
JS在浏览器中是单线程执行的，但允许使用定时器指定在某个时间之后或每隔一段时间就执行相应的代码。`setTimeout()`用于指定在一定时间后执行某些代码，而`setInterval()`用于指定 每隔一段时间执行某些代码。

`setTimeout()`第二个参数是要等待的毫秒数，而不是要执行代码的确切时间。JS是单线程的，所以每次只能执行一段代码。为了调度不同代码的执行，JS维护了一个任务队列。其中的任务会按照添加到队列的先后顺序执行。`setTimeout()`第二个参数只是告诉JS引擎在指定的毫秒数过后把任务添加到这个队列。如果队列是空的，则会立即执行该代码。如果队列不是空的，则代码必须等待前面的任务执行完才能执行。

- 所有超时执行的代码(函数)都会在全局作用域中的一个匿名函数中运行，因此函 数中的`this`值在非严格模式下始终指向`window`，而在严格模式下是`undefined`。如果给`setTimeout()`提供了一个箭头函数，那么`this`会保留为定义它时所在的词汇作用域。

`setInterval()`一般来说不建议使用，因为一个任务结束和下一个任务开始之间的时间间隔是无法保证的。

例如下面这个问题：
```javascript
setInterval(fetchData, 1000)
```
假设上面的 fetchData 就是你要轮询的请求，你希望的结果是每隔一秒请求一次。

如果每次请求本身的时间小于 1秒，那么一切 ok；如果遇到网络状况不好的时候，比如某次请求用了 2秒，`setInterval()`并不会关心你的异步任务执行了多久，依然会在 1秒 后再发起一个请求。

理论上，如果出现了网络卡顿，这种轮询会在短时间内堆积大量的 pending 请求，无论是对于目标服务器和本地网络资源来说都是浪费的。

## location
`location` 是最有用的`BOM`对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。这个对象独特的地方在于，它既是`window`的属性，也是`document`的属性。即`window.location`和`document.location`指向同一个对象。

### URLSearchParams
URLSearchParams 提供了一组标准 API 方法，通过它们可以检查和修改查询字符串。**目前还是一个实验中的功能！！！**
```javascript
var a = '?appkey=222&taobaoNick=yuan&taobaoId=111&version=premium&isNewUser=0';
var searchParams = new URLSearchParams(a);
searchParams.forEach((val, key)=>console.log(key, val)); //appkey 222   taobaoNick yuan   taobaoId 111   version premium   isNewUser 0
```

### 操作地址
以下三个方法相同：
```javascript
window.location = "http://www.baidu.com";
location.href = "http://www.baidu.com";
location.assign("http://www.baidu.com");
```
**只要修改了location的一个属性，就会导致页面重新加载新的url。**

调用`reload()`而不传参数，页面会以最有效的方式重新加载。也就是说，如果页面自上次请求以来没有修改过，浏览器可能会从缓存中加载页面。如果想强制从服务器重新加载，可以给`reload()`传个true:
```javascript
location.reload(); // 重新加载，可能是从缓存加载 
location.reload(true); // 重新加载，从服务器加载
```

## navigator
`navigator.userAgent` 用来判断浏览器类型

### 检测插件
```javascript
// 插件检测，IE10 及更低版本无效
let hasPlugin = function(name) {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins){
        if (plugin.name.toLowerCase().indexOf(name) > -1){
            return true;
        }
    }
     return false;
}
// 检测Flash 
console.log(hasPlugin("Flash"));
```
### 检测插件
现代浏览器支持navigator上的(在 HTML5 中定义的)`registerProtocolHandler()`方法。 这个方法可以把一个网站注册为处理某种特定类型信息应用程序。

要使用`registerProtocolHandler()`方法，必须传入3个参数:要处理的协议(如"mailto"或 "ftp")、处理该协议的URL，以及应用名称。例如，要把一个Web应用程序注册为默认邮件客户端，可以这样做:
```javascript
navigator.registerProtocolHandler("mailto",
  "http://www.somemailclient.com?cmd=%s",
  "Some Mail Client");
```
这个例子为"mailto"协议注册了一个处理程序，这样邮件地址就可以通过指定的 Web 应用程序打开。注意，第二个参数是负责处理请求的 URL，%s 表示原始的请求。

## history对象
### 导航
`go()`可以在用户历史记录中沿任何方向导航，可以前进也可以后退。

这个方法只接受一个参数，这个参数可以是一个整数，表示前进或后退多少步。负值表示在历史记录中后退，而正值表示在历史记录中前进。
```javascript
// 后退一页 
history.go(-1);
// 前进一页 
history.go(1);
// 前进两页 
history.go(2);
```
`go()`有两个简写方法：`back()`和`forward()`。

`history`对象还有一个 length 属性，表示历史记录中有多个条目。 如果`history.length === 1`，可以确定这是用户窗口中的第一个页面。

### 历史状态管理
**hashchange 事件**。 `hashchange`会在页面URL的散列变化时被触发。 而状态管理API则可以让开发者改变浏览器URL而不会加载新页面。 可以使用`history.pushState()`方法。

`history.pushState()`接收3个参数：
```javascript
history.pushState(state, title [, url])
```
- state --- 必选。一个state对象
- title --- 必选。新状态的标题。
- url --- 可选。相对的URL。

```javascript
let stateObject = {foo:"bar"};
history.pushState(stateObject, "My title", "baz.html");
```
因为`pushState()`会创建新的历史记录，所以也会相应地启用“后退”按钮。单击“后退”按钮，就会触发`window`对象上的`popstate`事件。`popstate`事件的事件对象有一个`state`属性，其中包含通过`pushState()`第一个参数传入的state对象。
```javascript
window.addEventListener("popstate", (event) => { 
    let state = event.state;
    if (state) { // 第一个页面加载时状态是null
        processState(state);
    }
});
```
```javascript
history.replaceState({newFoo: "newBar"}, "New title");
```





