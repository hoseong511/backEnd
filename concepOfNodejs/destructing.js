// 비구조화!
'use strict'

const obj = {
  title : 'node.js',
  value: '올인원 패키지'
}

// ES6이전 비구조화; 별도로 지정
// const title = obj.title
// const value = obj.value

//  ES6!!
const { title, value } = obj
console.log(title, value );

const arr = [1,2,3,4,5,6]
const [, a, b] = arr
console.log(a, b);