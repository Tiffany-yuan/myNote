// 实现以下功能：
// const data = [
//     { name: ‘foo’, age: 16, city: ‘shanghai’ },
//     { name: ‘bar’, age: 24, city: ‘hangzhou’ },
//     { name: ‘fiz’, age: 22, city: ‘shanghai’ },
//     { name: ‘baz’, age: 19, city: ‘hangzhou’ }
// ];
// query(data)
//     .where(item => item.age > 18)
//     .orderBy('age')
//     .groupBy('city')
//     .execute();
// 结果返回
// [
//     [
//         { name: ‘baz’, age: 19, city: ‘hangzhou’ },
//         { name: ‘bar’, age: 24, city: ‘hangzhou’ },
//     ],
//     [
//         { name: ‘fiz’, age: 22, city: ‘shanghai’ },
//     ]
// ]
function query(arr) {
    class MyLinkedArray {
        constructor(arr) {
            this.arr = arr;
        }
        execute() {
            return this.arr;
        }
        where(condition) {
            this.arr = this.arr.filter(condition);
            return this;
        }
        orderBy(key) {
            this.arr.sort((a, b) => a[key] - b[key]);
            return this;
        }
        groupBy(key) {
            var tempObj = {};
            while (this.arr.length) {
                var curItem = this.arr.shift();
                tempObj[curItem[key]] = tempObj[curItem[key]] || [];
                tempObj[curItem[key]].push(curItem);
            }
            this.arr = Object.keys(tempObj).map(curKey => tempObj[curKey]);
            return this;
        }
    }
    var myLinkedArray = new MyLinkedArray(arr);
    return myLinkedArray;
}


const data = [
    { name: 'foo', age: 16, city: 'shanghai' },
    { name: 'bar', age: 24, city: 'hangzhou' },
    { name: 'fiz', age: 22, city: 'shanghai' },
    { name: 'baz', age: 19, city: 'hangzhou' }
];
let res = query(data)
    .where((item) => item.age > 18)
    .orderBy("age")
    .groupBy("city")
    .execute();
console.log(res);