const cloneDeep1 = (target, hash = new WeakMap()) => {
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    // 哈希表中存在直接返回
    if (hash.has(target)) return hash.get(target);

    // 保证对象的原型不丢失
    let ctor = target.constructor;
    const cloneTarget = new ctor();
    hash.set(target, cloneTarget);

    // 针对Symbol属性
    const symKeys = Object.getOwnPropertySymbols(target);
    symKeys.length && symKeys.forEach(symKey => {
        const symVal = target[symKey];
        if (typeof symVal === 'object' && symVal !== null) {
            cloneTarget[symKey] = cloneDeep1(symVal);
        } else {
            cloneTarget[symKey] = symVal;
        }
    })

    for (const i in target) {
        if (Object.prototype.hasOwnProperty.call(target, i)) {
            const curVal = target[i];
            cloneTarget[i] = typeof symVal === 'object' && symVal !== null ? cloneDeep1(curVal) : curVal;
        }
    }
    return cloneTarget;
}