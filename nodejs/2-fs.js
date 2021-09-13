const fs = require('fs');

// fs.readFile('./1-http.js', { encoding: 'utf8' }, (err, data) => {
//     if (err) {
//         console.error('读取文件失败', err);
//         return;
//     }
//     console.log(data);
// })

// fs.readFile('./note1.md',(err, data) => {
//     if(err){
//         console.log('error', err);
//     }else{
//         // 如果文件不是文本文件，就不能toString了。data默认是buffer类型。
//         console.log(data);
//         console.log('-------------------------------------------------');
//         console.log(data.toJSON());
//         console.log('-------------------------------------------------');
//         console.log(data.toString());
//     }
// });



// fs.writeFile('./test.md', {aaa: 111},(err) => {
//     if(err){
//         console.log('error', err);
//     }
// });

// fs.appendFile('./test.md', '我是追加内容啊啊啊', (err) => {
//     if(err){
//         console.log('error', err);
//     }
// });



// fs.readFile('./img1.jpg', (err, data) => {
//     if(err){
//         console.log('error', err);
//     }else{
//         console.log(data);
//         fs.writeFile('img2.jpg', data, (err) => {
//             if(err){
//                 console.log('error', err);
//             }
//         });
//     }
// })



const rs = fs.createReadStream("img1.jpg");
const ws = fs.createWriteStream("img3.jpg");
rs.pipe(ws);

rs.on("error", ex => {
    console.log("读取失败", ex);
});
rs.on("data", (data) => {
    console.log(data);
});
rs.on("end", () => {
    console.log("读取完成");
});

ws.on("error", ex => {
    console.log("写入失败", ex);
});

ws.on("finish", () => {
    console.log("写入完成");
});