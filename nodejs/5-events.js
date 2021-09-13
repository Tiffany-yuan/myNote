const EventEmitter = require('events'); // 引用模块

class MyEmitter extends EventEmitter {} // 初始化监听器

const myEmitter = new MyEmitter();

const cb = (data) => { // 设置监听函数
    console.log(`触发事件!${data}`);
}

myEmitter.on('event', cb);
// myEmitter.once('event', cb);
myEmitter.emit('event', 111); // 触发事件
myEmitter.emit('event', 222); // 触发事件


myEmitter.off('event', cb);
// myEmitter.removeAllListeners();

// myEmitter.on('event', () => { // 设置监听函数
//     console.log('触发事件2!');
// });
// myEmitter.on('error', (err) => {
//     console.error('错误信息');
// });
// myEmitter.emit('error', new Error('错误'));
// myEmitter.emit('event', 222); // 触发事件

// console.log(myEmitter.eventNames());



