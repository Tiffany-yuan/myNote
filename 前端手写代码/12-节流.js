/**
 * 先区分下防抖节流：
 * 防抖和节流的本质是不同的。
 * 防抖是将多次执行变成最后一次执行。
 * 节流是将多次执行变成每隔一段时间执行
 */

const throttle = function (fn, time) {
    let flag = false;
    return function () {
        if (flag) return;
        const context = this;
        flag = true;
        setTimeout(() => {
            fn.apply(context, arguments);
            flag = false;
        }, time);
    }
}