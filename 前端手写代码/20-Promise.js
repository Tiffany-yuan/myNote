
// https://juejin.cn/post/6860037916622913550
// Prmise用法
// new Promise((resolve, reject) => {
//     // 成功则执行resolve，否则执行reject
// }).then(
//     res => {
//         // resolve对应出发函数的执行
//     },
//     err => {
//         // reject对应出发函数的执行
//     }
// ).then( // 支持链式调用
//     res => { }
// ).catch(
//     err => { }
// )
// Promise.resolve();
// Promise.reject();
// Promise.all([promise1, promise2]).then();
// Promise.race([promise1, promise2]).then();

// Promise 的入参是一个函数，接受两个参数，reslove函数 和 reject函数

// 创建 Promise 时，并不会生成微任务，而是需要等到 Promise 对象调用 resolve 或者 reject 函数时，才会产生微任务。
// 产生的微任务并不会立即执行，而是等待当前宏任务快要执行结束时再执行。

// promise中存放了 成功态回调函数 和 失败态回调函数 两个队列；
// then() 注册成功事件，会将回调函数存放在 成功态回调函数 中，catch () 注册失败事件，会将回调函数存放在 失败态回调函数 中；
// reslove() 会发布成功事件，并依次执行 成功态回调函数队列中的函数，reject() 会发布失败事件，并依次执行 失败态回调函数队列中的函数；


// 定义三种状态
const PENDING = 'PENDING';       // 进行中
const FULFILLED = 'FULFILLED';   // 已成功
const REJECTED = 'REJECTED';     // 已失败

class Promise {
    constructor(exector) {
        // 初始化状态
        this.status = PENDING;
        // 将成功、失败结果放在this上，便于then、catch访问
        this.value = undefined;
        this.reason = undefined;
        // 成功态回调函数队列
        this.onFulfilledCallbacks = [];
        // 失败态回调函数队列
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                // 成功态函数依次执行
                this.onFulfilledCallbacks.forEach(fn => fn(this.value));
            }
        };
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 失败态函数依次执行
                this.onRejectedCallbacks.forEach(fn => fn(this.value));
            }
        };
        // 把内部的resolve和reject传入exector，用户可调用resolve和reject
        // exector执行可能报错，用try catch包一下
        try {
            exector(resolve, reject);
        } catch (error) {
            reject(error);
        }
        
    }

    // then、catch是微任务，这里用setTimeOut模拟
    /**
     * 实现链式调用：
     * 1. 保存之前promise实例，即保存this
     * 2. 根据then回掉函数执行的返回值
     * - 如果是promise实例，那么返回的下一个promise实例会等待这个promise状态发生变化
     * - 如果不是promise实例，根据目前情况直接执行resolve或reject
     */
    then(onFulfilled, onReject) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onReject = typeof onReject === 'function' ? onReject : reason => reason;
        // 保存this
        const self = this;
        return new Promise((resolve, reject) => {
            if (self.status === PENDING) {
                // 这里注意⚠️：即然从始至终都是resolved来实现状态转变，那么为什么需要resolve方法呢？ 这是因为then的回调函数中的返回值有可能是一个Promise。按照规范，如果返回一个Promise，那么需要等这个Promise的完成工作，并且用它fulfilled的值来作为结果。
                self.onFulfilledCallbacks.push(() => {
                    try {
                        // 模拟微任务
                        setTimeout(() => {
                            const result = onFulfilled(self.value);
                            // 分两种情况：
                            // 1. 回调函数返回值是Promise，执行then
                            // 2. 回调函数返回值不是Promise，调用Promise的resolve函数
                            result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                        })
                    } catch (e) {
                        reject(e);
                    }
                });
                self.onRejectedCallbacks.push(() => {
                    try {
                        setTimeout(() => {
                            const result = onReject(self.value);
                            result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                        })
                    } catch (e) {
                        reject(e);
                    }
                })
            } else if (self.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const result = onFulfilled(self.value);
                        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                })
            }else if (self.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const result = onReject(self.value);
                        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                })
            }
        })
        // setTimeout(() => {
        //     if (this.status === PENDING) {
        //         // 说明promise内部有异步代码执行，还未改变状态，添加到成功/失败回调任务队列即可
        //         this.onFulfilledCallbacks.push(onFulfilled);
        //         this.onRejectedCallbacks.push(onReject);
        //     } else if (this.status === FULFILLED) {
        //         onFulfilled(this.value);
        //     } else if (this.status === REJECTED) {
        //         onReject(this.reason);
        //     }
        // })
    }

    // Promise.prototype.catch就是Promise.prototype.then(null, onRejected)的别名
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    /**
     * 这里就不需要考虑 thenable 对象了，参数有两种情况：
     * 1. Promise 实例
     * 2. 不是Promise 实例
     */
    static resolve(value) {
        if (value instanceof Promise) {
            return value;
        } else {
            // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
            return new Promise((resolve, reject) => resolve(value));
        }
    }
    /**
     * Promise.reject也会返回一个Promise实例，状态为REJECTED。
     * 与Promise.resolve不同的是，Promise.reject方法的参数会原封不动地作为reject的参数
     */
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }
    /**
     * 返回一个promise对象，只有当所有promise都成功时返回的promise才成功
     * 1. 所有的promise状态变为FULFILLED，返回的promise状态才变为FULFILLED
     * 2. 一个promise状态变为REJECTED，返回的promise状态就变为REJECTED
     * 3. 数组成员不一定都是promise，需要用Promise.resolve()处理
    */
    static all(promiseArr) {
        const len = promiseArr.length;
        const values = new Array(len);
        // 记录已经成功执行的promise个数
        let count = 0;
        return new promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                // promise.resolve()处理，确保每个都是promise实例
                Promise.resolve(promiseArr[i]).then(
                    val => {
                        values[i] = val;
                        count++;
                        // 如果全部执行完，返回promise的状态就可以改变了
                        if (count === len) resolve(values);
                    },
                    err => reject(err),
                );
            }
        })
    }

    // 与all相反
    static any(promiseArr) {
        const len = promiseArr.length;
        let count = 0;
        return new Promise((resolve, reject) => {
            for (var i = 0; i < len; i++) {
                Promise.resolve(promiseArr[i]).then(
                    val => resolve(val),
                    err => {
                        count++;
                        // 如果全部执行完，返回promise的状态就可以改变了
                        if (count === len) reject(err);
                    }
                )
            }
        })
    }

    // 哪个快返回哪个
    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            promiseArr.forEach(p => {
                Promise.resolve(p).then(
                    val => resolve(val),
                    err => reject(err)
                )
            })
        })
    }

    // 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
    // 把每一个Promise的结果，集合成数组，返回
    static allSettled(promiseArr) {
        var len = promiseArr.length;
        var values = new Array(len);
        var count = 0;
        return new Promise((resolve, reject) => {
            for (var i = 0; i < len; i++) {
                Promise.resolve(promiseArr[i]).then(
                    val => {
                        values[i] = {
                            status: FULFILLED,
                            value: val
                        };
                        count++;
                        if (count === len) {
                            resolve(values);
                        }
                    },
                    err => {
                        values[i] = {
                            status: REJECTED,
                            reason: err
                        };
                        count++;
                        if (count === len) {
                            resolve(values);
                        }
                    }
                )
            }
        })
    }
}
// const promise = new Promise((resolve, reject) => {
//     Math.random() < 0.5 ? resolve(1) : reject(-1);
// }).then(
//     res => console.log(res),
//     err => console.log(err),
// )

// // 创建Promise对象 x1，并在 exector 函数中执行业务逻辑
// function exector(resolve, reject) {
//     resolve(100);
// }
// let x1 = new Promise(exector);

// // x1 延迟绑定回调函数 onResolve
// function onResolve(value) {
//     console.log(value);
//     let x2 = new Promise((resolve, reject) => {
//         resolve(value + 1);
//     })
//     console.log(x2);
//     return x2;
// }
// let x2 = x1.then(onResolve);
// console.log(x2);

// x2.then(value => {
//     console.log(value);
//     console.log(x2);
// })
