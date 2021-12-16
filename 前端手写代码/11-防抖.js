/**
 * 先区分下防抖节流：
 * 防抖和节流的本质是不同的。
 * 防抖是将多次执行变成最后一次执行。
 * 节流是将多次执行变成每隔一段时间执行
 */

const debounce = (fn, time) => {
    let timer = null;
    return function () {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, arguments);
        }, time);
    }
}
