/**
 * 柯里化
 * 实现  add(1)(2)(3)(4)=10;  
 *      add(1)(1,2,3)(2)=9;
 * 
 * 在Function需要转换为字符串时，通常会自动调用函数的 toString 方法，toString() 方法返回一个表示当前函数源代码的字符串。
 * 拓展： 对象转换为数字时：会先调用对象的valueOf方法来转换，最后再用toString方法转换
 *       对象转换为字符串：会先调用对象的toString方法来转换，最后再用valueOf方法转换
 */

var add = function () {
    let _args = [...arguments];
    let _add = function () {
        _args.push(...arguments);
        return _add;
    }
    _add.toString = function () {
        var res = _args.reduce((a, b) => a + b)
        return res;
    }
    return _add;
}
var res1 = add(1)(2)(3)(4); // 此时res是function，需要打印出来，就会调用Function上的toString方法
var res2 = add(1)(2)(3)(4, 5, 6);
var res12 = res1 + res2;
console.log('res1', res1);
console.log('res2', res2);
console.log('res12', res12);



/**
 * 组合 compose
 * 函数组合是指将多个函数按顺序执行，前一个函数的返回值作为下一个函数的参数，最终返回结果。
 * 这样做的好处是可以将复杂任务分割成多个子任务，然后通过组合函数再组合成复杂任务。
 * 例如：
    function fn1(x) {
        return x + 1;
    }
    function fn2(x) {
        return x + 2;
    }
    function fn3(x) {
        return x + 3;
    }
    function fn4(x) {
        return x + 4;
    }
    const a = compose(fn1, fn2, fn3, fn4); => fn1(fn2(fn3(fn4(1))))
    console.log(a(1)); // 1+4+3+2+1=11
*/

var compose = function (...fns) {
    if (fns.length === 0) return (val) => val;
    if (fns.length === 0) return fns[0];
    return fns.reduce((pre, cur) => (...args) => pre(cur(...args)))
}
