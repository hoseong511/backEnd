// ES6 문법의 arrow 함수
'use strict'

function add2 (a,b){
  return a + b
}
const add = (a,b) => console.log(a+b)
// add(1,2)

//curried function 

function getdiscount (price, rate) {
  return price * rate;
}
const a = getdiscount(10000, 0.1)

const getdiscount2 = (price, rate) => price * rate

// getTenpercentOff = (0.1)

// const b = getdiscount2(10000,getTenpercentOff())
// getdiscount2(20000)
// console.log(b)

const ab = function (x) {
        return function (y) {
          return x * y
        }
      }
const c = ab(2)
console.log(c(3))

