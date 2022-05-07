Function.prototype.bind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new Error("Type Error");
    }
    // 保存this的值
    var _this = this;

    return function F() {
        // 考虑new的情况
        if(this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, [...args, ...arguments])
    }
}

// new情况的使用场景：
// 原函数
function func(name) {
    console.log(this); // 打印：通过{name:'wy'}
    this.name = name;
}
func.prototype.hello = function(){
    console.log(this.name)
}
let obj = {a:1}
// 调用bind,返回新函数
let newFunc = func.bind(obj);

// 把新函数作为构造函数,创建实例
let o = new newFunc('seven');
console.log(o.hello()); // 打印：'seven'
console.log(obj); // 打印：{a:1}


Function.prototype.bind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw Error('Type Error');
    }
    const _this = this;
    return function F() {
        if (this instanceof F) return new this(...args, ...arguments);
        return _this.apply(context, [...args, ...arguments]);
    }
}