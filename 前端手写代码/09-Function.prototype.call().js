Function.prototype.myCall = function(context = window, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    const fn = Symbol('fn');
    context[fn] = this; // 在context上新增一个属性，并指向当前的执行函数
    const res = context[fn](...args); // 运行时函数的this值就被隐式的绑定到context上
    delete context[fn];
    return res;
}

// Function.prototype.myCall = function (context = window, ...args) {
//     if (typeof this !== 'function') {
//         throw Error('Type Error');
//     }
//     var fn = new Symbol('fn');
//     context[fn] = this;
//     var res = context[fn](...args);
//     delete context[fn];
//     return res;
// }