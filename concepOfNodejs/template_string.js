// 한 문자열내에서 변수와 문자를 통합해서 사용가능함
'use strict'

// -----------기존방법
let str = 'node.js';
str += '올인원 패키지'+ "기존방법"

// 새로운 방법
const detail = '내용'
let addstr = 'node'
addstr += `올인원 패키지${detail}`
console.log`새로운방법`
console.log(addstr);
// styled-component에서 확인해보기