const querystring = require("querystring");
const url = require("url");

// let queryStr = "appkey=12158997&taobaoNick=sanchephoto&taobaoId=1893301994&version=premium";

let queryStr = "https://p1.kuaidizs.cn/newIndex/index.xhtml?appkey=12158997&taobaoNick=sanchephoto&taobaoId=1893301994&version=premium";

// let str = querystring.parse(queryStr);

// let str = url.parse(queryStr);
// let str = url.parse(queryStr, true);
// console.log(str);


// const myURL = new URL('/foo', 'https://example.org/');
// console.log(myURL);

const url1 = new URL(queryStr)
const appkey = url1.searchParams.get('appkey');
console.log(appkey);
url1.searchParams.append('name','yuan');
console.log(url1.href);
url1.searchParams.delete('appkey');
url1.searchParams.set('taobaoNick', 'yuan');
console.log(url1.href);
