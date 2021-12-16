const myInstanceof = function (left, right) {
    let rightProto = right.prototype;
    let leftProto = left.__proto__;
    while (true) {
        if (leftProto === null) return null;
        if (leftProto === rightProto) return true;
        leftProto = leftProto.__proto__;
    }
}
