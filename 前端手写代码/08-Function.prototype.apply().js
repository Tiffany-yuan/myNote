Function.prototype.myApply = function(context = window, args) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    const fn = Symbol('fn');
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}

// Function.prototype.myApply = function (context = window, args) {
//     if (typeof this !== 'function') {
//         throw Error('Type Error');
//     }
//     var fn = new Symbol('fn');
//     context[fn] = this;
//     var res = context[fn](...args);
//     delete context[fn];
//     return res;
// }