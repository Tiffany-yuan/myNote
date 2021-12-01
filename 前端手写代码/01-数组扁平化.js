var arr = [1, [2, 3, [4, 5, 6, [7, 8]]]];
// 1. flat
var res1 = arr.flat(Infinity);
console.log('res1', res1);

// 2.1 正则 - (这种数据类型会变成string)
var res2 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');
console.log('res2', res2);

// 2.2 正则改良版
var res3 = JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`);
console.log('res3', res3);

// 3. reduce
var flatten = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, [])
}
var res4 = flatten(arr);
console.log('res4', res4);

// 4. 递归
var res5 = [];
var func = arr => {
    arr.forEach(item => {
        if (Array.isArray(item)) {
            func(item);
        } else {
            res5.push(item);
        }
    });
}
func(arr);
console.log('res5', res5);