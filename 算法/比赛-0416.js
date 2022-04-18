var perfectMenu = function(materials, cookbooks, attribute, limit) {
    // 用result来存放所有可以满足饱腹感的结果集，最后再求其中最大美味度的结果
    var result = [];
    var path = [];
    var len = cookbooks.length;
    // 回溯
    var backtracking = (startIndex, remainMaterials, curLimit) => {
        if (curLimit <= 0) {
            result.push([...path]);
        }
        for (var i = startIndex; i < len; i++) {
            var [a, b, c, d, e] = cookbooks[i];
            var [ra, rb, rc, rd, re] = remainMaterials;
            // 如果食材足够，则存入结果集
            if (ra >= a && rb >= b && rc >= c && rd >= d && re >= e) {
                remainMaterials = [ra - a, rb - b, rc - c, rd - d, re - e];
                curLimit -= attribute[i][1];
                path.push(i);
                backtracking(i + 1, remainMaterials, curLimit);
                remainMaterials = [ra, rb, rc, rd, re];
                curLimit += attribute[i][1];
                path.pop();
            }
        }
    };
    backtracking(0, materials, limit);
    // 再计算最大美味度的结果
    var maxNum = -1;
    result.forEach(item => {
        var num = 0;
        item.forEach(curIndex => {
            num += attribute[curIndex][0];
        })
        maxNum = Math.max(maxNum, num);
    })
    return maxNum;
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[][]} ops
 * @return {number}
 */
var getNumber = function(root, ops) {
    // 从最后的操作往前冲，遇到红色的直接加1并结束，遇到蓝色的直接结束
    const check = (node) => {
        for (let i = ops.length - 1; i >= 0; i--) {
            if (ops[i][0] === 1 && node >= ops[i][1] && node <= ops[i][2]) {
                ans++;
                break;
            }
            if (ops[i][0] === 0 && node >= ops[i][1] && node <= ops[i][2]) {
                break;
            }
        }
    }
    const dfs = (root) => {
        if (!root) return;
        dfs(root.left);
        check(root.val);
        dfs(root.right);
    }
    let ans = 0;
    dfs(root);
    return ans;
};