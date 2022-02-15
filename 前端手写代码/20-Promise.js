
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
        onReject = typeof onReject === 'function' ? onReject : value => value;
        // 保存this
        const self = this;
        return new Promise((resolve, reject) => {
            if (self.status === PENDING) {
                self.onFulfilledCallbacks.push(() => {
                    try {
                        // 模拟微任务
                        setTimeout(() => {
                            const result = onFulfilled(self.value);
                            // 分两种情况：
                            // 1. 回调函数返回值是Promise，执行then
                            // 1. 回调函数返回值不是Promise，调用Promise的resolve函数
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
}
const promise = new Promise((resolve, reject) => {
    Math.random() < 0.5 ? resolve(1) : reject(-1);
}).then(
    res => console.log(res),
    err => console.log(err),
)