// use strict 에 대해서?

const obj = {
  title: "node.js"
}

const isEmptyObj = () => obj.title ? true : false;

isEmptyObj();
console.log(isEmptyObj());

const arr = [2,3,4]

const isBiggerThenOne = arr.every(key => key > 1)

console.log(isBiggerThenOne);