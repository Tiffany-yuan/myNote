# 入门示例拓展

## 分组模式
在正则中，我们使用“()”来进行分组，一对圆括号括起来的表达式就是一个分组。

### 捕获组
> 捕获组就是把正则表达式中子表达式匹配的内容，保存到内存中以数字编号或显式命名的组里，方便后面引用。当然，这种引用既可以是在正则表达式内部，也可以是在正则表达式外部。一般一个小括号括起来就是一个捕获组。捕获组可以进行嵌套。以深度优先进行编号，在js中编号从1开始。

```javascript
var reg = /(2(3)4)(5(6)7)/;
var str = "234567"
var arr = reg.exec(str);
console.log(arr);
//  ["234567", "234", "3", "567", "6", index: 0, input: "234567", groups: undefined]
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527145103224.png)

#### 捕获组实际应用

```javascript
var reg = /([a-z]+)\s([a-z]+)/;
var text = "first second";
var arr = reg.exec(text);
console.log(arr)
// ["first second", "first", "second", index: 0, input: "first second", groups: undefined]
```


### 非捕获组
非捕获分组工作模式分组（?:）会作为匹配校验，并出现在匹配结果字符里面，但不作为子匹配返回。
我们看看下面两个🌰：
```javascript
var str = '000aaa111';             
var reg = /([a-z]+)(\d+)/; //捕获性分组匹配
var arr = reg.exec(str);  
console.log(arr);  //["aaa111", "aaa", "111", index: 3, input: "000aaa111", groups: undefined]
```
```javascript
var str2 = '000aaa111';
var reg2 = /(?:[a-z]+)(?:\d+)/; //非捕获性分组匹配
var arr2 = reg2.exec(str2);
console.log(arr2); //["aaa111", index: 3, input: "000aaa111", groups: undefined]
```
 
## 环视
 > 环视，在不同的地方又称为零宽断言，简称断言。
 > 环视强调的是它所在的位置，前面或者后面，必须满足环视表达式中的匹配情况，才能匹配成功。
 > 环视可以认为是虚拟加入到它所在位置的附加判断条件，并不消耗正则的匹配字符。

简单环视例子：
```javascript
'ABC'.match(/(?=A)[A-Z]/);  
// ["A"]
```
首先`?=A`所在的位置，后面是A。表达式`[A-Z]`匹配'A-Z'中任意一个字母，根据两个的先后位置关系，组合在一起，就能匹配到'A'。

### 环视的类型

1. 肯定顺序： `(?=exp)` --- 表示后面要有什么
2. 否定顺序： `(?!exp)` --- 表示后面不能有什么
3. 肯定逆序： `(?<=exp)` --- 表示前面要有什么 （大部分浏览器不支持）
4. 否定逆序： `(?<!exp)` --- 表示前面不能有什么 （大部分浏览器不支持）

#### 肯定顺序环视
```javascript
//匹配.jpg后缀文件名
var reg = /\w+(?=\.jpg)/g; //正向前瞻匹配
var str = '123.jpg,456.gif,abc.jpg';
var arr = str.match(reg);  
console.log(arr);
// ["123", "abc"]
```

思考🤔；这里为什么用的是字符串的match方法，而不是RegExp对象的exec方法，如果用的是exec会是什一样的结果么？


#### 否定顺序环视
```javascript
//匹配3个及以上的a，而且后面不能有000的字符
var str = 'aaa000 aaaa111 aaaaaaa222';
var reg = /a{3,}(?!000)/g; //反向前瞻匹配
str.match(reg);
// ["aaaa", "aaaaaaa"]
```

对于大的数值，例如23456543，如果展示成这样“23,456,543”会更清楚。如果需要用正则做这样的处理该怎么写呢？

正则应该是这样，`/\B(?=(\d{3})+(?!\d))/g`
```javascript
"1234567890".replace(/\B(?=(\d{3})+(?!\d))/g,",");
// "1,234,567,890"
```

#### 肯定逆序环视
```javascript
//获取name参数的值
var str = 'name=qiuying';
var reg = /(?<=name=).+/; //反向前瞻匹配
str.match(reg);
// ["qiuying"]
```


&nbsp;

### 使用正则修改文本
之前我们看到的例子都是从字符串中提取匹配信息，现在我们看看替换的例子：

#### 例子一
如果我现在希望得到“second first”：

方法一：
```javascript
var reg = /([a-z]+)\s([a-z]+)/;
var text = "first second";
var arr = reg.exec(text);
var arrTurn = arr[2] + " " + arr[1];
console.log(arrTurn);
```

方法二：
```javascript
var reg = /([a-z]+)\s([a-z]+)/;
var text = "first second";
var arr = reg.exec(text);
var arrTurn = RegExp.$2 + " " + RegExp.$1;
console.log(arrTurn);
```

方法三：
```javascript
var reg = /([a-z]+)\s([a-z]+)/;
var text = "first second";
var arrTurn = text.replace(reg,"$2 $1");
console.log(arrTurn);
```

#### 例子二
需要对小数格式做处理：通常是保留小数点后两位数字，如果第三位不为零，也需要保留，去掉其他的数字。结果就是12.3750000034或者12.375会被修正为12.375，而37.500会被修正为37.50。
```javascript
var str = '34.345200000234';
str = str.replace(/(.\d\d[1-9]?)\d*/,'$1');
// 34.345
```

&nbsp;


## match和exec区别
1. exec是RegExp对象方法，match是String对象方法；

2. 只有在正则表达式必须指定全局g属性时，match才能返回所有匹配，否则match与exec方法结果无差异，是等价的；

3. exec永远返回与第一个匹配相关的信息，其返回数组第一个值是第一个匹配的字串，剩下的是所有分组的反向引用（即子括号的匹配内容）；

4. exec在设置g属性后，虽然匹配结果不受g的影响，返回结果仍然是一个数组（第一个值是第一个匹配到的字符串，以后的为分组匹配内容），但是会改变index和lastIndex等的值，将该对象的匹配的开始位置设置到紧接这匹配子串的字符位置，当第二次调用exec时，将从lastIndex所指示的字符位置开始检索。同样match方法在设置了g属性后，也会改变index和lastIndex的值，但是是一次性的。无法像exec那样能逐过程累积（即将结果放入Matches 集合中去了），因此无法累积获取下一次检索的位置。

若之前的例子用exec方法：
```javascript
var reg = /\w+(?=\.jpg)/g; //正向前瞻匹配
var str = '123.jpg,456.gif,abc.jpg';
reg.exec(str); 
// ["123", index: 0, input: "123.jpg,456.gif,abc.jpg", groups: undefined]
reg.exec(str); 
// ["abc", index: 16, input: "123.jpg,456.gif,abc.jpg", groups: undefined]
```