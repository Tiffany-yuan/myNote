// 二叉树的中序遍历
var midOrderTraverSal = root => {
    // 非递归
    // root.left && midOrderTraverSal(root.left)
    // console.log(root.data)
    // root.right && midOrderTraverSal(root.right)

    // 非递归
    let arr = []
    while (arr.length || root) {
        if (root) {
            arr.push(root)
            root = root.left
        } else {
            const currentNode = arr.pop()
            console.log(currentNode.data)
            root = currentNode.right
        }
    }
}
// 二叉树的前序遍历
var preOrderTraverSal = root => {
    // 递归
    // console.log(root.data)
    // root.left && preOrderTraverSal(root.left)
    // root.right && preOrderTraverSal(root.right)

    // 非递归
    var arr = []
    arr.push(root)
    while (arr.length) {
        const currentNode = arr.pop()
        console.log(currentNode.data);
        currentNode.right && arr.push(currentNode.right)
        currentNode.left && arr.push(currentNode.left)
    }
}
// 二叉树的后序遍历
var postOrderTraverSal = root => {
    // 递归
    // root.left && postOrderTraverSal(root.left)
    // root.right && postOrderTraverSal(root.right)
    // console.log(root.data)
    // 非递归
    let arr = []
    let preNode = null
    while (arr.length || root) {
        if (root) {
            arr.push(root)
            root = root.left
        } else {
            let currentNode = arr.pop()
            let rightNode = currentNode.right
            if (rightNode && preNode !== rightNode) {
                arr.push(currentNode)
                root = rightNode
            } else {
                preNode = currentNode
                console.log(currentNode.data);
            }
        }
    }

}
// 二叉树的层序遍历
var levelOrderTraverSal = root => {
    if (!root) return;
    let childArr = [];
    console.log(root.data);
    childArr.push(root.left);
    childArr.push(root.right);
    while (childArr.length) {
        const currentNode = childArr.shift()
        if (!currentNode) {
            continue
        }
        console.log(currentNode.data);
        childArr.push(currentNode.left)
        childArr.push(currentNode.right)
    }
}
var getNodeArr = root => {
    let childArr = [];
    childArr.push(root.left);
    childArr.push(root.right);
    getNodeArr()
}
var node3 = { data: 5, left: null, right: null };
var node4 = { data: 6, left: null, right: null };
var node1 = { data: 1, left: node3, right: null };
var node2 = { data: 3, left: null, right: node4 };
var root = { data: 4, left: node1, right: node2 };
// midOrderTraverSal(root);
// console.log('--------------------');
// preOrderTraverSal(root);
// console.log('--------------------');
postOrderTraverSal(root);
// console.log('--------------------');
// levelOrderTraverSal(root)