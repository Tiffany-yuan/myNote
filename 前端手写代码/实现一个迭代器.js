var myIterator = (arr) => {
    let index = 0;
    return {
        next: () => {
            return {
                value: arr[index++] || undefined,
                done: index > arr.length
            }
        }
    }
}

// test
var arr = [6, 17, 'yuan'];
var iteratorArr = myIterator(arr);
console.log(iteratorArr.next());
console.log(iteratorArr.next());
console.log(iteratorArr.next());
console.log(iteratorArr.next());
