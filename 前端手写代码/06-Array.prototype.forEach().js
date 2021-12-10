Array.prototype.forEach = function(callback, thisArg) {
    if (this === undefined) {
        throw new TypeError('this is undefined or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    const _this = Object(this);
    const length = _this.length >>> 0;
    for (let i = 0; i < length; i++) {
        if (i in _this) {
            callback.call(thisArg, _this[i], i, this);
        }
    }
}