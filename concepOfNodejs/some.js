// some vs every ; 
// 1개이상의 요소를 만족하면 true를 반환함, every는 모든요소 만족
'use strict'

const arr = [0, -1, -2]

const res = arr.some(key => key < -2)
console.log(res);
