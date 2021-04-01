'use strict'
// 객체를 합치는 기능, 스프레드 사용법
const obj = {
  titie : 'node.js'
}

const newObj = {
  name : 'node.js 온라인 올인원'
}

const ret = Object.assign({}, obj, newObj)
console.log(ret);

// 스프레드를 이용해서 객체를 합칠수 있고, 리스트 또한 합치는 것이 가능
const spread = {
  ...obj,
  ...newObj
}

const arr = [1,2,3]
const arr2 = [3,4,5,6]
const arr3 =[
  ...arr,
  ...arr2
]
console.log(arr3);
console.log(ret);
