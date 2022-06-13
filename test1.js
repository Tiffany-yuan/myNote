/**
 * export const demoData = [
    { id: 56, parentId: 62 },
    { id: 81, parentId: 80 },
    { id: 74, parentId: null },
    { id: 76, parentId: 80 },
    { id: 63, parentId: 62 },
    { id: 80, parentId: 86 },
    { id: 87, parentId: 86 },
    { id: 62, parentId: 74 },
    { id: 86, parentId: 74 }
]

{
    id: 74,
    parentId: null,
    children: [
        {
            id: 62,
            parentId: 74,
            children: [
                {
                    id: 63,
                    parentId: 62
                }
            ]
        },
        {
            id: 86,
            parentId: 74,
            children: [
                {
                    id: 87,
                    parentId: 86
                }
            ]
        }
    ]
}
 * */

var transFunc = (arr) => {
    var len = arr.length;
    var map = new Map();
    var rootId;
    for (var i = 0; i < len; i++) {
        var item = arr[i];
        var curId = item.id;
        map.set(curId, item);
    }
    for (var i = 0; i < len; i++) {
        var item = arr[i];
        var curId = item.id;
        var curParentId = item.parentId;
        // 处理跟节点
        if (curParentId === null) {
            rootId = curId;
             continue;
        }
        var curParentMap = map.get(curParentId);
        // 处理children
        if (curParentMap.children) {
            curParentMap.children.push(item);
        } else {
            curParentMap.children = [item];
        }
    }
    return map.get(rootId);
}
const demoData = [
    { id: 56, parentId: 62 },
    { id: 81, parentId: 80 },
    { id: 74, parentId: null },
    { id: 76, parentId: 80 },
    { id: 63, parentId: 62 },
    { id: 80, parentId: 86 },
    { id: 87, parentId: 86 },
    { id: 62, parentId: 74 },
    { id: 86, parentId: 74 }
]
var res = transFunc(demoData);
console.log(res);
console.log(JSON.stringify(res));
