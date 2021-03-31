// window는 웹브라우저 상의 window라서 노드에서 사용 불가. 
// node의 import는 require임. const dns = require('dns')
const dns = require('dns');
let global = 0
if (true){
  global = 1;
}
console.log(global);
var global2