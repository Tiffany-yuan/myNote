function compareJsonFun(json1, json2) {
    let res = true;
    const compareFn = () => {
        const keyArr1 = Object.keys(json1);
        const keyArr2 = Object.keys(json2);
        if (keyArr1.length !== keyArr2.length) {
            res = false;
        }
        keyArr1.forEach(curKey => {
            if (json2.hasOwnProperty(curKey)) {
                if (json1[curKey] !== json2[curKey]) {
                    compareFn(json1[curKey], json2[curKey]);
                }
            } else {
                res = false;
            }
        })
    }
    compareFn(json1, json2);
    return res;
}

const json1 = { a: '123', b: '3', c: { d: '3', e: '4' } };
const json2 = { a: '123', b: '2', c: { d: '3', e: '4' } };
compareJsonFun(json1, json2);
