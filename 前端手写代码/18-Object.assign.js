Object.defineProperties(Object, 'assign', {
    value: function (target, ...arg) {
        if (target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        // 目标对象需要统一是引用数据类型，若不是会自动转换
        let obj = Object(target);
        for (let i = 0; i < arg.length; i++) {
            const curSource = arg[i];
            // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
            for (const key in curSource) { // for...in 会拿到继承的属性
                if (Object.prototype.hasOwnProperty.call(curSource, key)) { // hasOwnProperty不会拿到继承的属性
                    obj[key] = curSource[key];
                }
            }
        }
        return obj;
    },
    enumerable: false,
    writable: true,
    configurable: true,
})
