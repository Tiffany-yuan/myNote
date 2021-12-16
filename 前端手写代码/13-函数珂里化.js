/**
 * 实现  add(1)(2)(3)(4)=10;  
 *      add(1)(1,2,3)(2)=9;
 * 
 * 在Function需要转换为字符串时，通常会自动调用函数的 toString 方法，toString() 方法返回一个表示当前函数源代码的字符串。
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
var res1 = add(1)(2)(3)(4);
var res2 = add(1)(2)(3)(4, 5, 6);
var res12 = res1 + res2;
console.log('res1', res1);
console.log('res2', res2);
console.log('res12', res12);