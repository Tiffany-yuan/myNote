function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')';
}


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }
}

typeof Point   // "function"


class CustomHTMLElement {
    constructor(element) {
        this.element = element
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

// 这个类的名字是Me，但是Me只在Class的内部可用，指代当前类。在Class外部，这个类只能用MyClass引用。
var MyClass = class Me {
    getClassName() {
        return Me.name;
    }
}
// 采用Class表达式，可以写出立即执行的Class
let person = new class{
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('狗蛋');

// 类不存在变量提升
