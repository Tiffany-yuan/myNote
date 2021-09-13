// function sayHello(person: string) {
//     return 'Hello, ' + person;
// }
// let user = [0, 1, 2];
// console.log(sayHello(user));
var isDone = false;
// let createdByNewBoolean: boolean = new Boolean(1);  // 返回的是一个Boolean对象
var und = undefined;
var nul = null;
function alertName() {
    alert('My name is Tom');
}
var unusable = null;
// let num: number = undefined;
// let u: undefined;
// let num: number = u;
// let v: void;
// let num: number = v;
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7; 
// let myFavoriteNumber: any = 'seven';
// myFavoriteNumber = 7;
var anyThing = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
// let something;
// something = 'seven';
var something;
something = 'seven';
var tom = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
// let arr1: number[] = [1,2,3,4,5];
// let arr1: number[] = [1,'2',3,4,5]; // error
// let arr1: (number|string)[] = [1,'2',3,4,5];
var arr2 = [1, 2, 3, 4, 5];
var arr3 = [1, 2, 3, 4, 5];
var list = ['qwe', 123124, { a: '123', b: '2eq' }];
function sum(x, y) {
    return x + y;
}
// let sum2 = function(x: number, y: number): number {
//     return x + y;
// }
var sum2 = function (x, y) {
    return x + y;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// function buildName (firstName: string, lastName?: string) {
//     if (lastName) {
//         return firstName + ' ' + lastName
//     }
//     return firstName
// }
// function buildName (firstName?: string, lastName: string) {
//     if (lastName) {
//         return firstName + ' ' + lastName
//     }
//     return firstName
// }
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = 'cat'; }
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    return firstName;
}
var cat = buildName(undefined, 'cat');
function push(array) {
    var item = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        item[_i - 1] = arguments[_i];
    }
    item.forEach(function (item) {
        array.push(item);
    });
}
var a = [];
push(a, 1, 2, 3);
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
