'use strict'

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("go"), 2)  
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("즉시"), 1)
})

Promise.race([promise1, promise2]).then(value => console.log(value))

// 먼저 반환되는 값을 출력한다. -> promise.race