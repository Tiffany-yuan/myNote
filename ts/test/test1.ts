// function sayHello(person: string) {
//     return 'Hello, ' + person;
// }

// let user = [0, 1, 2];
// console.log(sayHello(user));

let isDone: boolean = false;
// let createdByNewBoolean: boolean = new Boolean(1);  // 返回的是一个Boolean对象

let und: undefined = undefined;
let nul: null = null;

function alertName(): void {
    alert('My name is Tom');
}

let unusable: void = null;

// let num: number = undefined;

// let u: undefined;
// let num: number = u;

// let v: void;
// let num: number = v;

// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7; 

// let myFavoriteNumber: any = 'seven';
// myFavoriteNumber = 7;


let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);

// let something;
// something = 'seven';

let something: any;
something = 'seven';

// interface Person {
//     name: string;
//     age?: number;
//     [propName: string]: any;
// }
// let tom: Person = {
//     name: 'Tom',
//     age: 23,
//     gender: 'male'
// }

// interface Person {
//     name: string;
//     age?: number;   // error
//     [propName: string]: string;
// }
// let tom: Person = {
//     name: 'Tom',
//     age: 23,
//     gender: 'male'
// }

interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

// let arr1: number[] = [1,2,3,4,5];

// let arr1: number[] = [1,'2',3,4,5]; // error

// let arr1: (number|string)[] = [1,'2',3,4,5];

let arr2: Array<number> = [1,2,3,4,5];

interface NumberArray {
    [index: number]: number;
}
let arr3: NumberArray = [1,2,3,4,5];

let list: any[] = ['qwe', 123124, {a: '123',b: '2eq'}];

function sum(x: number, y: number): number {
    return x + y;
}

// let sum2 = function(x: number, y: number): number {
//     return x + y;
// }
let sum2: (x: number, y: number) => number = function(x: number, y: number): number {
    return x + y;
}

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}

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

function buildName (firstName: string, lastName: string = 'cat') {
    if (lastName) {
        return firstName + ' ' + lastName
    }
    return firstName
}
let cat = buildName(undefined, 'cat');

function push (array: any[], ...item: any[]) {
    item.forEach(function(item) {
        array.push(item);
    })
}
let a = [];
push(a, 1, 2, 3);

// function reverse(x: number | string): number | string {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''))
//     } else if (typeof x === 'string'){
//         return x.split('').reverse().join('');
//     }
// }

// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''))
//     } else if (typeof x === 'string'){
//         return x.split('').reverse().join('');
//     }
// }

declare var jQuery: (selector: string) => any;
declare var $: (selector: string) => any;



