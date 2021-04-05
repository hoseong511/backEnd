'use strict'

const promise1 = new Promise((resolve, reject) => resolve('즉시 호출'))
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('3초 뒤에 호출'), 3000)
})

Promise.all([promise1, promise2])
.then(values => console.log(values))

// 다양한 api들의 응답값을 한번에 받아서 출력할떄 이용?
// 2가지 비동기 작업이 완료되는 시점을 기다려야 할떄.. 완료를 보장
// Promise.race()