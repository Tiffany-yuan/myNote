// *generator 
// 实现一个斐波拉契数列：
// function fib(max) {
//     var a = 0;
//     var b = 1;
//     var arr = [0, 1];
//     while (arr.length < max) {
//         [a, b] = [b, a + b];
//         arr.push(b);
//     }
//     console.log(arr);
//     return arr;
// }
// fib(5);

// function* fib2(max) {
//     var a = 0;
//     var b = 1;
//     var n = 0;
//     while (n < max) {
//         yield a;
//         [a, b] = [b, a + b];
//         n++;
//     }
//     return;
// }
// var f = fib2(5);
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());


//*thunk
// start----------test-1
// function getAuthor(cb){
//     setTimeout(() => {
//         cb('baidu');
//     })
// }

// function getBlog(cb, author) {
//     setTimeout(() => {
//         if (author === 'baidu') {
//             cb('https://baidu.com');
//         }
//     })
// }

// function getBlogThunk(author) {
//     return function (cb) {
//         return getBlog(cb, author);
//     }
// }

// function getAuthorThunk(cb) {
//     return function (cb) {
//         return getAuthor(cb);
//     }
// }

// function magic(gen){
//     const runner = gen(resume);
//     function resume(){
//       const thunkcall = runner.next(...arguments)
//       if(!thunkcall.done){
//           thunkcall.value(resume)
//       }
//     }
//     resume()
//   }
  
// magic(function*(cb){
//     const author = yield getAuthorThunk();
//     console.log(`Author: ${author}`);
//     const blog = yield getBlogThunk(author);
//     console.log(`Blog: ${blog}`);
// })
// end-----------test-1

// start----------test-2
// fs.readFile(fileName, cb);

// var readFileThunk = Thunk(fileName);
// readFileThunk(cb);

// var Thunk = (fileName) => (cb) => {
//     return fs.readFile(fileName, cb);
// }
// end----------test-2

// start----------test-3
var thunkify = require('thunkify');
var fs = require('fs');
var readFile = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFile('ad.html');
    // console.log(r1.toString());
    var r2 = yield readFile('package.json');
    // console.log(r2.toString());
}
var g = gen();
var r1 = g.next();
console.log('---------:'+JSON.stringify(r1));
console.log('---------:'+r1.value);
r1.value((err, data) => {
    if (err) throw err;
    console.log(data);
    var r2 = g.next(data);
    r2.value((err, data) => {
        if (err) throw err;
        console.log(data);
        g.next(data);
    })
})
// end----------test-3