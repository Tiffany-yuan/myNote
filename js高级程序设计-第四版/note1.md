# HTML属性
 - `async` --- 表示应该**立即开始下载脚本**，但是不会阻塞页面，不会阻塞下载资源或者其他脚本加载，只对外部脚本有效。
 -  `defer` --- 表示脚本可以**延迟到页面解析和显示后再执行**，只对外部脚本有效。
 - `crossorigin` --- 配置相关请求的CORS（跨源资源共享）。默认不使用CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据 标志，意味着出站请求会包含凭据。
 - 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启 用脚本，则`<noscript>`元素中的任何内容都不会被渲染。


# 变量
## var、let、const
let与var的作用差不多，但是有着非常大的区别：
### 1. let声明是块级作用域，var声明是函数作用域。块级作用域是函数作用域的子集。
### 2. 暂时性死区
let声明的变量不会再作用域中被提升。
```javascript
// name 会被提升 
console.log(name); // undefined 
var name = 'Matt';

// age 不会被提升
console.log(age); // ReferenceError:age is not defined 
let age = 26;
```
### 3.全局声明
使用let在全局作用域中声明的变量不会成为window对象的属性，var声明的变量则会
```javascript
var name = 'yuan';
console.log(window.name); // 'yuan'
let age = 26;
console.log(window.age);  // undefined
```
### 4. 条件声明
对于let这个声明关键字，不能依赖条件声明模式。
```javascript
if (typeof name === 'undefined') {
  let name;
}
// name 被限制在 if {} 块的作用域内 // 因此这个赋值形同全局赋值
name = 'yuan';
```

const的行为与let基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且尝试修改const声明的变量会导致运行时错误。
const 声明的限制只适用于它指向的变量的引用。

# 数据类型
ES6有6种简单数据类型：`Undefined` `Null` `Boolean` `String` `Number` `Symbol`。还有一种复杂数据类型 `Object`.
## typeof操作符
对一个值使用 typeof 操作符会返回下列字符串之一：
 - `undefined`表示值未定义
 - `boolean`表示值为布尔值
 - `string`表示值为字符串
 - `number`表示值为数值
 - `object`表示值为对象(而不是函数)或 null
 - `function`表示值为函数
 - `symbol`表示值为符号 
typeof null返回的是"object"，因为特殊值`null`被认为是一个对空对象的引用。
**typeof对原始值很有用，但是对引用值的用处不大。**

# 数值转换
有三个函数可将非数值转换为数值：Number() parseInt() parseFloat()。Number是转型函数。
Number()转换规则：
 - 布尔值。true转换为1，false转换为0
 - 数值。直接返回
 - null。 返回0
 - undefined。 返回NaN
 - 字符串：
    - 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。
    - 如果字符串包含有效的浮点值格式如“1.12”，则会转换为相应的浮点值（忽略前面的零）
    - 如果字符串包含有效的十六进制格式如“oxf”，则会转换为对应的十进制
    - 如果是空字符串，返回0
    - 除以上情况，返回NaN
 - 对象。调用valueOf()方法，并按照上述规则转换返回的值。如果转换结果是NaN，则调用toString()方法，再按照字符串的规则转换。

 

# 语句
## for-in 语句
用于枚举对象中的非符号键属性。所有可枚举的属性都会返回一次，但返回的顺序可能会因为浏览器而异。

## for-of 语句
用于遍历可迭代对象的元素。

# 变量声明
## let
`let`关键字与`var`很相似，但它的作用域是块级的。
`let`在JS运行时中也会被提升，但由于“**暂时性死区**”（temporal dead zone）的缘故，实际上不能在声明之前是用`let`变量

暂时性死区是什么呢？
由let/const声明的变量，当它们包含的词法环境(Lexical Environment)被实例化时会被创建，但只有在变量的词法绑定(LexicalBinding)已经被求值运算后，才能够被访问。
具体一点就是：当程序的控制流程在新的作用域（module，function或block作用域）进行实例化时，在此作用域中的用let/const声明的变量会先在作用域中被创建出来，但此时还未进行词法绑定，也就是对声明语句进行求值运算，所以是不能被访问的，访问就会报错。所以在 运行流程一进入作用域创建变量，到变量开始可被访问之间的一段时间，就称为TDZ暂时死区。

## const
使用`const`声明的变量必须同时初始化为某个值。一经声明，在其生命周期的任何时候都不能再重新赋予新值。
赋值为对象的const变量不能再被重新赋值为其他引用值，但对象的键不受限制。如果想让整个对象都不能被修改，可以使用Object.freeze()，这样再给属性赋值时虽然不会报错，但是会默认失败。


# 垃圾回收
JavaScript 是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存。
垃圾回收这个过程是周期性的，即垃圾回收程序每隔一定时间(或者说在代码执 行过程中某个预定的收集时间)就会自动运行。
垃圾回收用到过两种主要的 标记策略:标记清理和引用计数。

## 标记清理
JavaScript 最常用的垃圾回收策略是标记清理。

垃圾回收程序运行的时候，会标记内存中存储的所有变量（标记的方法有很多种）。然后它会将所有在上下文中的变量，以及被上下文中的变量引用的变量的标记去掉。在此后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回他们的内存。

## 引用计数
其思路是对每个值都记录它被 引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变 量，那么引用数加 1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一 个值的引用数为 0 时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序 下次运行的时候就会释放引用数为 0 的值的内存。但是这种方式会有很多问题（例如循环引用）


# 基本引用类型
## RegExp
RegExp实例的主要方法是exec()，主要用于捕获组使用。
```javascript
var text = "first second third";
var pattern = /first( second( third)?)?/gi;
var matches = pattern.exec(text);
 console.log(matches.index); // 0
console.log(matches.input); // "first second third"
console.log(matches[0]); // "first second third"
console.log(matches[1]); // " second third"
console.log(matches[2]); // " third"
```
如果模式设置了全局标记，则每次调用 exec()方法会返回一个匹配的信息。如果没有设置全局标 记，则无论对同一个字符串调用多少次 exec()，也只会返回第一个匹配的信息。
```javascript
var text = "cat, bat, sat, fat";
var pattern = /.at/;
var patterng = /.at/g;
var matchs = pattern.exec(text) // ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]
var matchsg = patterng.exec(text) // ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]
matchs = pattern.exec(text); // ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]
matchsg = patterng.exec(text) // ["bat", index: 5, input: "cat, bat, sat, fat", groups: undefined]
pattern.lastIndex // 0
patterng.lastIndex // 8
```
在全局匹配模式下，每次调用exec()都会更新lastIndex值，以反应上次匹配的最后一个字符的索引。
正则表达式的valueOf()方法返回正则表达式本身。
RegExp可以存储最多**9**个捕获组的匹配项。这些属性通过 RegExp.$1~RegExp.$9 来访问，分别包含第1~9个捕获组的匹配项。

## 原始包装类型
```javascript
var s1 = "some text";
var s2 = s1.substring(2);
```
平时我们都会这么用，但是有没有想过，为什么原始值上会有substring方法？
这是因为js中已经帮我们处理了，**在以读模式访问字符串值的任何时候，相当于是执行了下面几步**：
```javascript
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null; // 重要！！！
```
这种行为可以让原始值拥有对象的行为。对布尔值和数值而言，也会执行以上3步，只不过是使用的Boolean和Number包装类型。

**引用类型和原始值包装类型的主要区别在于对象的生命周期。在通过new实例化引用类型后，得到的实例会在离开作用域时被销毁，而自动创建的原始值包装对象则只存在于访问它的那行代码执行期间，这意味着不能在运行时给原始值添加属性和方法。**
```javascript
var s1 = "some text";
s1.color = "red";
console.log(s1.color); // undefined
```

**Object构造函数作为一个工厂函数，能够根据传入值的类型返回相应原始值包装类型的实例。**
```javascript
let obj = new Object("some text");
console.log(obj instanceof String); // true
```

## String
### slice()、substr()、substring()区别
```javascript
str.slice(startIndex[, endIndex])
str.substr(startIndex[, length])
str.substring(startIndex[, endIndex])
```
参数为负数的情况：
slice: startIndex 或 endIndex 为负数，都是从倒数第几个元素开始取。
substr: startIndex 为负数时是从倒数第几个元素开始取； length 为 0 或者是 负数，则返回一个空字符串。
substring: 任何一个参数小于 0 或者为 NaN，则被当作 0。如果 startIndex 大于 endIndex，substring 的执行效果就像两个参数调换了一样。


# 集合引用类型

## Object

## Array
Array 构造函数还有两个 ES6 新增的用于创建数组的静态方法: `from()`和`of()`。`from()`用于将类数组结构转换为数组实例，而`of()`用于将一组参数转换为数组实例。
### Array.from()
```javascript
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]

const m = new Map().set(1, 2).set(3, 4);
const s = new Set().add(1).add(2).add(3).add(4);
console.log(Array.from(m)); // [[1, 2], [3, 4]]
console.log(Array.from(s)); // [1, 2, 3, 4]

// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);

// 可以使用任何可迭代对象 
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
};
console.log(Array.from(iter)); // [1, 2, 3, 4]
```
**Array.from()还接收第二个可选的映射函数参数；还可以接受第三个参数，用于指定映射函数中this的值，但这个重写的this值在箭头函数中不适用。**
```javascript
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x**2);
const a3 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 2});
console.log(a2); // [1, 4, 9, 16]
console.log(a3); // [1, 4, 9, 16]
```

**Array.of()可以把一组参数转换为数组。**
```javascript
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
```

### 检测数组
判断一个对象是不是数组。在只有一个网页（因而只有一个全局作用域）的情况下，使用 instanceof操作符足以。
```javascript
if (value instanceof Array) {}
```
使用`instanceof`的问题是假定只有一个全局执行上下文。如果页面上有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的Array构造函数。 为了解决这个问题，可以用 Array.isArray() 方法。
```javascript
if (Array.isArray(value)) {}
```

### 迭代器方法
```javascript
var a = ["foo", "bar", "baz", "qux"];
// 因为这些方法都返回迭代器，所以可以将它们的内容 // 通过Array.from()直接转换为数组实例
var aKeys = Array.from(a.keys()); // [0, 1, 2, 3]
var aValues = Array.from(a.values()); // ["foo", "bar", "baz", "qux"]
var aEntries = Array.from(a.entries()); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

### 复制和填充方法
`fill()` 填充数组
```javascript
array.fill(value, start, end)
```
- value --- 必需。填充的值。
- start --- 可选。开始填充位置。
- end --- 可选。停止填充位置 (默认为 array.length)

` copyWithin()` 批量复制方法(按照指定范围浅复制数组中的部分内容，然后将它们插入到指 定索引开始的位置)
```javascript
array.copyWithin(target, start, end)
```
- target --- 必需。复制到制定目标索引位置。
- start --- 可选。元素复制的起始位置。
- end --- 可选。停止复制的索引位置 (默认为 array.length)
```javascript
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].copyWithin(5);  // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].copyWithin(0, 5); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].copyWithin(4, 0, 3); // [0, 1, 2, 3, 0, 1, 2, 3, 8, 9]
```

### 转换方法
所有对象都有 toLocaleString()、toString()和 valueOf()方法。其中，valueOf() 返回的还是数组本身。而 toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的 字符串。也就是说，对数组的每个值都会调用其 toString()方法，以得到最终的字符串。
```javascript
['red', 'yellow', 'blue'].valueOf(); // ['red', 'yellow', 'blue']
['red', 'yellow', 'blue'].toString(); // 'red,yellow,blue'
```
在 调用数组的 toLocaleString()方法时，会得到一个逗号分隔的数组值的字符串。它与另外两个方法 唯一的区别是，为了得到最终的字符串，会调用数组每个值的 toLocaleString()方法，而不是 toString()方法。

```javascript
["red", "green", "blue"].join();  // 'red,green,blue'
["red", "green", "blue"].join(undefined);  // 'red,green,blue'
```
**如果不给 join()传入任何参数，或者传入 undefined，则仍然使用逗号作为 分隔符。**

### 栈方法 队列方法
push --- 末尾推入
pop --- 末尾弹出
shift --- 头部弹出 
unshift --- 头部推入

### 排序
reverse()和 sort()。
sort()接受一个比较函数，用于判断哪个值应该排在前面。
```javascript
[0, 1, 10, 5, 15].sort((a,b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
});
[0, 1, 10, 5, 15].sort((a,b) => {
    return a - b;
});
```

### 操作方法
- concat（） --- 在现有数组全部元素基础上 创建一个新数组

`concat` 默认会扁平化数组，如不需要扁平化，可以在参数数组上指定一个特殊的符号`Symbol.isConcatSpreadable`
```javascript
let colors = ["red", "green", "blue"];
let newColors = ["black", "brown"];
colors.concat(newColors); // ['red', 'green', 'blue', 'black', 'brown'] 
newColors[Symbol.isConcatSpreadable] = false; 
colors.concat(newColors); // ['red', 'green', 'blue', ['black', 'brown']]
```
```javascript
array.slice(startIndex[, endIndex]);
array.splice(index, howmany, item1, ....., itemX)
```
- index --- 必选。整数，指定在什么位置删除/添加项目，使用负数指定从数组末尾开始的位置。
- howmany --- 可选。要删除的项目数。
- item1, ....., itemX --- 要添加到数组中的新项目。

### 迭代方法
- `every()`: 对数组每一项都运行传入的函数，如果对每一项函数都返回true，则这个方法返回true。
- `filter()`: 对数组每一项都运行传入的函数，函数返回true的项会组成数组后返回。
- `forEach()`: 对数组每一项都运行传入的函数，没有返回值。
- `map()`: 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
- `some()`: 对数组每一项都运行传入的函数，如果有一项函数返回true，则这个方法返回true。

**这些方法都不改变调用它们的数组**

### 归并方法
`reduce()`和`reduceRight()`。
这两个方法都会迭代数 组的所有项，并在此基础上构建一个最终返回值。`reduce()`方法从数组第一项开始遍历到最后一项。 而`reduceRight()`从最后一项开始遍历至第一项。

这个函数返回的任何值都会作为下一次调用同一个函数的第一个参数。如果没有给这两个方法传入可选的第二个参数(作为归并起点值)，则第一次迭代将从数组的第二项开始，因此传给归并函数 的第一个参数是数组的第一项，第二个参数是数组的第二项。

### 定型数组
为什么引入`定型数组`这个概念？ 在 WebGL 的早期版本中，因为JavaScript数组与原生数组之间不匹配，所以出现了性能问题。（JavaScript默认双精度浮点格式，但图形驱动程序API通常不以这个格式）。

#### ArrayBuffer
`Float32Array`实际上是一种视图，可以允许js运行时访问一块名为`ArrayBuffer`的预分配内存。`ArrayBuffer`是所有定型数组及视图引用的基本单位。

`ArrayBuffer`一经创建就不能再调整大小。不过，可以使用`slice()`复制其全部或部分到一个新实例中：
```javascript
const buf1 = new ArrayBuffer(16);
console.log(buf1.byteLength); // 16
const buf2 = buf1.slice(4, 12);
console.log(buf2.byteLength); // 8
```
#### DataView
第一种允许你读写`ArrayBuffer`的视图是`DataView`。

必须在对已有的`ArrayBuffer`读取或写入时才能创建`DataView`实例。这个实例可以使用全部或部分`ArrayBuffer`，且维护着对该缓冲实例的引用，以及视图在缓冲中开始的位置。
```javascript
const buf = new ArrayBuffer(16);
// DataView默认使用整个ArrayBuffer
const fullDataView = new DataView(buf);
console.log(fullDataView.byteOffset); // 0
console.log(fullDataView.byteLength); // 16
console.log(fullDataView.buffer === buf); // true
```

### Map
初始化Map：
```javascript
const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);
```
实力对象方法：set()   get()   has()   delete()   clear()

遍历方法：`keys()`   `values()`   `entries()`   `forEach()`

#### 选择Object还是Map
1. 内存占用 

    但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。

2. 插入性能 

    向 Object和 Map中插入新键/值对的消耗大致相当，不过插入Map在所有浏览器中一般会稍微快一点。

3. 查找速度

    从大型Object和Map中查找键/值对的性能差异极小，但如果只包含少量键/值对， 则Object有时候速度更快。

4. 删除性能

    Map的delete()操作都比插入和查找更快。

### WeakMap
`WeakMap`是`Map`的“兄弟”类型，其API也是`Map`的子集。`WeakMap`中的“weak”(弱)， 描述的是JavaScript垃圾回收程序对待“弱映射”中键的方式。

弱映射中的键只能是Object或者继承自Object的类型。值的类型没有限制。

**WeakMap中的键不属于正式的引用，不会阻止垃圾回收。只要键存在，键/值对就会存在于映射中，并被当作值的引用，因此就不会被当作垃圾回收**

```javascript
var weakmap = new WeakMap();
var k1 = {x: 1};
var k2 = {y: 2};
weakmap.set(k2, 'k2');
console.log(weakmap.size); // undefined
console.log(weakmap.keys()); // Uncaught TypeError: weakmap.keys is not a function
```

### Set
`Set`在很多方面都像是加强的`Map`。由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

与Map类似，Set可以包含任何js数据类型作为值。

#### Set的顺序与迭代
`Set`是有序的。
遍历方法：`keys()`   `values()`   `entries()`   `forEach()`（或者Symbol.iterator属性，它引用values()）
```javascript
const s = new Set(["val1", "val2", "val3"]);
console.log(s.values === s[Symbol.iterator]); // true
console.log(s.keys === s[Symbol.iterator]); // true
```
#### Set对象的作用
- 数组去重
```javascript
var set = new Set([1, 2, 3, 3, 4, 4]);
console.log([...set]); // [1, 2, 3, 4]
```
- 合并两个set对象
```javascript
var set = new Set([1, 2, 3]);
var set2 = new Set([3, 4, 5]);
console.log(new Set([...set, ...set2]));  // {1, 2, 3, 4, 5}
```
- 交集
```javascript
var set = new Set([1, 2, 3]);
var set2 = new Set([3, 4, 5]);
console.log(new Set([...set].filter(item => set2.has(item))));  // {3}
```
- 差集
```javascript
var set = new Set([1, 2, 3]);
var set2 = new Set([3, 4, 5]);
console.log(new Set([...set].filter(item => !set2.has(item))));  // {1, 2}
```
### WeakSet
 

# 函数
 ## 箭头函数
剪头函数虽然简洁，但是不能使用`arguments`、`super`和`new.target`，也不能用作构造函数，也没有`prototype`属性。

函数名就是指向函数的指针。

ECMAScript函数既不关心传入的参数个数，也不关心这些参数的数据类型。在使用function关键自定义（非箭头）函数时，可以在函数内部访问arguments对象，从中获取传进来的每个参数。

虽然箭头函数中没有 arguments 对象，但可以在包装函数中把它提供给箭头函数。（就是把箭头函数再用非函数包一层）

## 没有函数重载
因为没有函数签名，所以自然也没有重载。

可以通过检查参数的类型和数量，来模拟函数重载。

## 默认参数值
函数的默认参数值不限于原始值或对象类型，也可以使用调用函数返回的值：
```javascript
function getNums() {
// 每次调用后递增
    return '呀嘛哈哈';
}
function makeName(name = 'yuan', petName = getNums()) {
  return `${name} ${petName}`;
}
makeName(); // 'yuan 呀嘛哈哈'
```

函数的默认参数只有在函数调用时才会求值，不会在函数定义时求值。计算默认值的函数只有在调用函数且未传递对应参数时才会被调用。

剪头函数虽然不支持 arguments 对象，但支持收集参数的定义方式，因此也可以实现与使用 arguments 一样的逻辑：
```javascript
let getSum = (...values) => {
  return values.reduce((x, y) => x + y, 0);
}
console.log(getSum(1,2,3)); // 6
```

## 函数声明与函数表达式
JS引擎在任何代码执行前，会先读取函数声明，并在执行上下文中生成函数定义。 而 函数表达式 必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。 这个过程叫做 **函数声明提升**。

## 函数内部
在ES5中，函数内部存在两个特殊的对象：`arguments` 和 `this`。ES6中又新增了 `new.target` 属性。

### arguments 
看一个经典的阶乘函数：
```javascript
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
```
**这里注意，使用`arguments.callee`可以让函数逻辑与函数名解耦**

但是在严格模式下是不能访问`arguments.callee`的，可以使用命名函数表达式达到目的。
```javascript
function factorial = (function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
})
```


### this
在标准函数中，this引用的是把函数当成方法调用的上下文对象，这时候通常称其为this值(在网页的全局上下文中调用函数时，this指向windows)。

箭头函数中的this会保留定义该函数时的上下文。

### new.target
ES6新增了检测函数是否使用new关键字调用的`new.target`属性。吴国函数是正常调用的，则`new.target`是`undefined`；如果是使用`new`关键字调用的，则`new.target`将引用被调用的构造函数。
```javascript
function King() {
  console.log(new.target);
}
new King(); // ƒ King() { console.log(new.target); }
King();     // undefined
```

### 函数的方法
`apply()` 和 `call()`。这两个方法都会设置调用函数时函数体内 this 对象的值。 只是传参的形式不同，`call()`向函数传递参数时，必须将参数一个一个列出来。

### 尾调用优化
在 ES6 优化之前，执行这个例子会在内存中发生如下操作。
1. 执行到 outerFunction 函数体，第一个栈帧被推到栈上。
2. 执行 outerFunction 函数体，到 return 语句。计算返回值必须先计算 innerFunction。
3. 执行到 innerFunction 函数体，第二个栈帧被推到栈上。
4. 执行 innerFunction 函数体，计算其返回值。
5. 将返回值传回 outerFunction，然后 outerFunction 再返回值。
6. 将栈帧弹出栈外。

在 ES6 优化之后，执行这个例子会在内存中发生如下操作。
1. 执行到 outerFunction 函数体，第一个栈帧被推到栈上。
2. 执行 outerFunction 函数体，到达 return 语句。为求值返回语句，必须先求值 innerFunction。 
3. 引擎发现把第一个栈帧弹出栈外也没问题，因为 innerFunction 的返回值也是 outerFunction
的返回值。
4. 弹出 outerFunction 的栈帧。
5. 执行到 innerFunction 函数体，栈帧被推到栈上。
6. 执行 innerFunction 函数体，计算其返回值。
7. 将 innerFunction 的栈帧弹出栈外。 

很明显，第一种情况下每多调用一次嵌套函数，就会多增加一个栈帧。而第二种情况下无论调用多
少次嵌套函数，都只有一个栈帧。这就是 ES6 尾调用优化的关键:如果函数的逻辑允许基于尾调用将其 销毁，则引擎就会那么做。

### 闭包
闭包会保留它们包含函数的作用域，所以比其他函数更占内存。过度使用闭包可能导致内存过度占用。V8优化的js引擎会努力回收被闭包困住的内存，不过我们还是建议谨慎使用闭包。



