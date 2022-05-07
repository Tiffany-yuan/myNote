const create = function (ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new TypeError('Type Error');
    }
    let obj = new Object();
    obj.__proto__ = ctor.prototype;
    let res = ctor.apply(obj, args);
    const isObject = typeof res === 'object' && res !== null;
    const isFunction = typeof res === 'function';
    return isObject || isFunction ? res : obj;
}



// const create = function (ctor, ...args) {
//     if (typeof ctor !== 'function') {
//         throw Error('Type Error');
//     }
//     var obj = {};
//     obj.__proto__ = ctor.prototype;
//     var res = ctor.apply(obj, args);
//     const isObject = typeof res === 'object' && res !== null;
//     const isFunction = typeof res === 'function';
//     return isObject || isFunction ? res : obj;
// }
