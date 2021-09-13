/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function(maze, entrance) {
    var arr = []
    var startX = entrance[0]
    var startY = entrance[1]
    var hash = new Set()
    var count = 0
    arr.push(entrance)
    hash.add(`${startX}-${startY}`)
    // 每次都可能 上下左右 移动
    var moveX = [-1, 1, 0, 0]
    var moveY = [0, 0, -1, 1]
    // 判断是否边界
    function isBorder (node) {
        return node[0] === 0 || node[1] === 0 || node[0] == maze.length - 1 || node[1] == maze[0].length - 1
    }
    // 判断是否合法
    function isVaild (node) {
        return node[0] > -1 && node[1] > -1 && node[0] < maze.length && node[1] < maze[0].length
    }
    while(arr.length > 0) {
        count++
        var tempNextArr = []
        while (arr.length > 0) {
            var curNode = arr.shift()
            for(var j = 0; j < 4; j++) {
                var nextX = curNode[0] + moveX[j]
                var nextY = curNode[1] + moveY[j]
                if (isVaild([nextX, nextY]) && maze[nextX][nextY] == '.' && !hash.has(`${nextX}-${nextY}`)) {
                    if (isBorder([nextX, nextY])) {
                        return count
                    }
                    tempNextArr.push([nextX, nextY])
                    hash.add(`${nextX}-${nextY}`)
                }
            }
        }
        arr = tempNextArr
    }
    return -1;
};


