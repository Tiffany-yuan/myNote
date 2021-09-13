## HTML属性
 - `async` --- 表示应该**立即开始下载脚本**，但是不会阻塞页面，不会阻塞下载资源或者其他脚本加载，只对外部脚本有效。
 -  `defer` --- 表示脚本可以**延迟到页面解析和显示后再执行**，只对外部脚本有效。
 - `crossorigin` --- 配置相关请求的CORS（跨源资源共享）。默认不使用CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据 标志，意味着出站请求会包含凭据。
 - 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启 用脚本，则`<noscript>`元素中的任何内容都不会被渲染。


## 变量
### var、let、const
let与var的作用差不多，但是有着非常大的区别：
#### 1. let声明是块级作用域，var声明是函数作用域。块级作用域是函数作用域的子集。
#### 2. 暂时性死区
let声明的变量不会再作用域中被提升。
```javascript
// name 会被提升 
console.log(name); // undefined 
var name = 'Matt';

// age 不会被提升
console.log(age); // ReferenceError:age is not defined 
let age = 26;
```
#### 3.全局声明
使用let在全局作用域中声明的变量不会成为window对象的属性，var声明的变量则会
```javascript
var name = 'yuan';
console.log(window.name); // 'yuan'
let age = 26;
console.log(window.age);  // undefined
```
#### 4. 条件声明
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

## 数据类型
ES6有6种简单数据类型：`Undefined` `Null` `Boolean` `String` `Number` `Symbol`。还有一种复杂数据类型 `Object`.
### typeof操作符
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

## 数值转换
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

 

## 语句
### for-in 语句
用于枚举对象中的非符号键属性。所有可枚举的属性都会返回一次，但返回的顺序可能会因为浏览器而异。

### for-of 语句
用于遍历可迭代对象的元素。

## 变量声明
### let
`let`关键字与`var`很相似，但它的作用域是块级的。
`let`在JS运行时中也会被提升，但由于“**暂时性死区**”（temporal dead zone）的缘故，实际上不能在声明之前是用`let`变量

暂时性死区是什么呢？
由let/const声明的变量，当它们包含的词法环境(Lexical Environment)被实例化时会被创建，但只有在变量的词法绑定(LexicalBinding)已经被求值运算后，才能够被访问。
具体一点就是：当程序的控制流程在新的作用域（module，function或block作用域）进行实例化时，在此作用域中的用let/const声明的变量会先在作用域中被创建出来，但此时还未进行词法绑定，也就是对声明语句进行求值运算，所以是不能被访问的，访问就会报错。所以在 运行流程一进入作用域创建变量，到变量开始可被访问之间的一段时间，就称为TDZ暂时死区。

### const
使用`const`声明的变量必须同时初始化为某个值。一经声明，在其生命周期的任何时候都不能再重新赋予新值。
赋值为对象的const变量不能再被重新赋值为其他引用值，但对象的键不受限制。如果想让整个对象都不能被修改，可以使用Object.freeze()，这样再给属性赋值时虽然不会报错，但是会默认失败。


## 垃圾回收
JavaScript 是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存。
垃圾回收这个过程是周期性的，即垃圾回收程序每隔一定时间(或者说在代码执 行过程中某个预定的收集时间)就会自动运行。
垃圾回收用到过两种主要的 标记策略:标记清理和引用计数。

### 标记清理
JavaScript 最常用的垃圾回收策略是标记清理。

垃圾回收程序运行的时候，会标记内存中存储的所有变量（标记的方法有很多种）。然后它会将所有在上下文中的变量，以及被上下文中的变量引用的变量的标记去掉。在此后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回他们的内存。

### 引用计数
其思路是对每个值都记录它被 引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变 量，那么引用数加 1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一 个值的引用数为 0 时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序 下次运行的时候就会释放引用数为 0 的值的内存。但是这种方式会有很多问题（例如循环引用）


## 基本引用类型
### RegExp
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

### 原始包装类型
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

### String
#### slice()、substr()、substring()区别
```javascript
str.slice(startIndex[, endIndex])
str.substr(startIndex[, length])
str.substring(startIndex[, endIndex])
```
参数为负数的情况：
slice: startIndex 或 endIndex 为负数，都是从倒数第几个元素开始取。
substr: startIndex 为负数时是从倒数第几个元素开始取； length 为 0 或者是 负数，则返回一个空字符串。
substring: 任何一个参数小于 0 或者为 NaN，则被当作 0。如果 startIndex 大于 endIndex，substring 的执行效果就像两个参数调换了一样。



