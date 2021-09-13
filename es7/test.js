function setClass(a) {
    if(a == '1') {
        return (value) => {
            console.log(value)
        }
    }
    return () => {
        console.log(1)
    }
}

@addCxh(setClass(1))
class DaBao {}

@addCxh(setClass(2))
class XiaoBao{}

function addCxh(addFun){
    return (target) => {
        target.cxh = addFun;
    }
}

DaBao.cxh(2);
XiaoBao.cxh();