// 1. 并发函数
function createRequest(tasks = [], pool) {
    pool = pool || 5; // 限制并发数量
    let results = [];
    let running = 0; // 当前运行个数
    let resultsLength = tasks.length; // 用于判断最后的是否全部成功
    return new Promise((resolve, reject) => {
        function next() {
            if (running < pool && tasks.length) { // 也可用while
                running++;
                let task = tasks.shift();
                task().then(result => {
                    results.push(result);
                }).finally(() => {
                    running--;
                    next();
                })
            }
            if (resultsLength === results.length) {
                resolve(results);
            }
        }
        next();
    })
}


// test
// 执行函数可返回一个自定义请求事件的函数，用来模拟请求
let getRequestFn = function(time){
    return ()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve(time)
            }, time);
        })
    }
}
//创建模拟请求任务
let tasks = [getRequestFn(4000), getRequestFn(2000), getRequestFn(2000), getRequestFn(2000), getRequestFn(1000), getRequestFn(2000)];
// 发送请求 并发数为2
console.time();
createRequest(tasks, 2).then((value)=>{
    console.log(value);
    console.timeEnd();
})

// -----------------------------------------------------------------------------------------------------------------------------------------

// 2. JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个。完善下面的代码中的 Scheduler 类，使得一下程序能正确输出。
// class Scheduler {
//     add(promiseCreator){...}
//     // ...
//   }
    
//   const timeout = (time) => new Promise(resolve => {
//     setTimeout(resolve, time)
//   })
//   const scheduler = new Scheduler()
//   const addTask = (time, order) => {
//     scheduler.add(() => timeout(time)).then(()=>console.log(order))
//   }
  
//   addTask(1000, '1')
//   addTask(500, '2')
//   addTask(300, '3')
//   addTask(400, '4')
  
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms 时，2完成，输出2，任务3进队
// 800ms 时，3完成，输出3，任务4进队
// 1000ms 时，1完成，输出1

class Scheduler {
    constructor() {
        this.queue = [];
        this.count = 0;
    }
    add(promiseCreator) {
        let _resolve;
        const tempFunc = () => {
            this.count++;
            promiseCreator().then(() => {
                _resolve();
                this.count--;
                if (this.queue.length) {
                    this.queue.shift()();
                }
            })
        }
        if (this.count < 2 && this.queue.length === 0) {
            tempFunc();
        } else {
            this.queue.push(tempFunc);
        }
        return new Promise((resolve) => {
            _resolve = resolve;
        })
    }
}

const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time);
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
