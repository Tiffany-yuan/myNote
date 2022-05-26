
let map = new Map();
var calc = (...args) => {
    args.sort((a, b) => a - b);
    let str = args.join('');
    if (map.has(str)) {
        return map.get(str);
    }
    let res = args.reduce((pre, cur) => pre + cur);
    map.set(str, res);
    return res;
}