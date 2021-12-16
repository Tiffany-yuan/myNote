/**
 * 这里只写寄生组合继承
 */

let inheritPrototype;
// 1. 使用过渡函数对象
inheritPrototype = function (subClass, superClass) {
    // 声明一个过渡函数对象
    function F() { };
    // 过度函数
    F.prototype = superClass.prototype;
    // 通过原型继承方式创建新对象
    var p = new F();
    // 拓展新对象
    p.constructor = superClass;
    // 返回拓展后的新对象
    subClass.prototype = p;
}

// 2. Object.create
inheritPrototype = function (subClass, superClass) {
    var p = Object.create(superClass.prototype);
    p.constructor = superClass;
    subClass.prototype = p;
}

