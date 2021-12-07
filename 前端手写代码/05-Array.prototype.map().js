Array.prototype.filter = (callback, thisArg) => {
    if (this === undefined) {
        throw new TypeError('this is undefined or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    let res = [];
    const _this = Object(this);
    // * >>>0 ，保证length为number，且为正整数，异常情况下兜底0
    const length = _this.length >>> 0;
    for (let i = 0; i < length; i++) {
        // 检查i是否在_this的的属性
        if (i in _this) {
            res[i] = callback.call(thisArg, _this[i], i, this);
        }
    }
    return res;
}