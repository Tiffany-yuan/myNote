
const fs   = require('fs');
const path = require('path');
const events = require('events')
const myEmitter = new events.EventEmitter();

// 用户数据
const userData = JSON.parse(fs.readFileSync(path.join(__dirname,'./user.json'),'utf-8'))

const nowLoginUser = {};

const question = [
    {
        question:'Username:',
        deal(res){
            if(userData.some(item=>item.username === res)){
                nowLoginUser.username = res;
                //发布
                myEmitter.emit('nextQuestion')
            }else{
                process.stdout.write(`username does not exist\n`);
                process.stdout.write(this.question);
            }
        }
    },
    {
        question:'Password:',
        deal(res){
            if(userData.some(item=>item.username ===  nowLoginUser.username && item.password === res)){
                nowLoginUser.password = res;
                process.stdout.write(`Logged in as ${nowLoginUser.username}\n`);
                process.exit()
            }else{
                process.stdout.write(`wrong password\n`);
                process.stdout.write(this.question);
            }
        }
    }
]

let index = 0;
// 订阅
myEmitter.on('nextQuestion',()=>process.stdout.write(question[++index].question))
process.stdout.write(question[0].question);
process.stdin.on('data',chunk=>question[index].deal(chunk.toString().trim()))