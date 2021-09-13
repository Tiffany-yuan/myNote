// declare var
/*
declare let jQuery: (selector: string) => any;

jQuery = function (selector) {
    return document.querySelector(selector);
}
*/

// declare function
/*declare function jQuery(selector: string): any;*/

// declare class
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
let dog = new Animal('yanggoudan');



