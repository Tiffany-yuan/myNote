
```javaScript
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')';
}
```
ES6的类，完全可以看作构造函数的另一种写法。
```javaScript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }
}
```

```javaScript
typeof Point   // "function"
Point === Point.prototype.constructor // true
```

在类的实例上面调用方法，其实就是调用原型上的方法。
```javaScript
class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
```







