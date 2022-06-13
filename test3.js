// 反转链表
var reverseFunc = (list) => {
    return reverse(null, list);
}
var reverse = (pre, cur) => {
    while (cur) {
        var temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    return pre;
}
// a -> b -> c -> null
// c -> b -> a -> null
var list = {
    a: {
        val: 1,
        next: b
    },
    b: {
        val: 2,
        next: c
    },
    c: {
        val: 3,
        next: null
    }
}
