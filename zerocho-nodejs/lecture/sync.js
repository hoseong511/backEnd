const fs = require('fs');

let data = fs.readFileSync('./readme.txt');
console.log('1번');
data = fs.readFileSync('./readme.txt');
console.log('2번');
data = fs.readFileSync('./readme.txt');
console.log('3번');
data = fs.readFileSync('./readme.txt');
console.log('4번');