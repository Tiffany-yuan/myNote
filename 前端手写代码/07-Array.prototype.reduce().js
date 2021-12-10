Array.prototype.myReduce = function(callback, initialValue) {
    if (this === undefined) {
        throw new TypeError('this is undefined or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    const _this = Object(this);
    const length = _this.length >>> 0;
    if (length === 0 && initialValue === undefined) {
        throw new TypeError('不能在没有初始值的空数组上使用reduce');
    }
    let accumulator = initialValue || 0;
    for (let i = 0; i < length; i++) {
        accumulator = callback.call(undefined, accumulator, _this[i], i,  _this);
    }
    return accumulator;
}

var a = [1, 2, 3];
var b1 = a.reduce((a, b) => a + b, 10);
var b2 = a.myReduce((a, b) => a + b, 10);
console.log(b1);
console.log(b2);
