const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]

// 1. flat
var res1 = Array.from(new Set(arr));
console.log('res1', res1);

// 2. 两层for循环+splice
const unique1 = arr => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                // 每删除一个重复元素，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
                len--;
                j--;
            }
        }
    }
    return arr;
}

// 3. indexOf
const unique2 = arr => {
    let res = [];
    arr.forEach(item => {
        if (res.indexOf(item) < 0) res.push(item);
    })
    return res;
}

// 4. filter
const unique3 = arr => {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}

// 5. Map
const unique4 = arr => {
    let map = new Map();
    let res = [];
    arr.forEach(item => {
        if (!map.has(item)) {
            map.set(item, true);
            res.push(item);
        }
    })
    return res;
}

