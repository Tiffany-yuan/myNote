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




