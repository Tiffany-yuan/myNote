// 求一个数组中，不相邻数字能组成的最大的和

var sumArrMax = function (arr) {
    if (Array.isArray(arr)) {
        var length = arr.length;
        if (length === 0) {
            return 0;
        } else if (length === 1) {
            return arr[0];
        } else if (length === 2) {
            return Math.max(arr[0], arr[1]);
        } else {
            var maxSum1 = arr[length - 1] + sumArrMax(arr.slice(0, length - 2));
            var maxSum2 = sumArrMax(arr.slice(0, length - 1));
            return Math.max(maxSum1, maxSum2);
        }
    } else {
        console.log('请输入一个数组');
    }
    
}

    var arr = [4,7,1,6,100];
    var sumArr = [];
    for(var i=1;i<=arr.length;i++){
        if(i==1){
            sumArr[i]=arr[0];
        }else if(i==2){
            sumArr[i] = Math.max(arr[0],arr[1]);
        }else{
            sumArr[i] = Math.max(sumArr[i-1],sumArr[i-2]+arr[i-1]);
        }
    }
    console.log(sumArr[arr.length]);