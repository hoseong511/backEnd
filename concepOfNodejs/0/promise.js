// Promise
// 비동기적 상황에서 코드를 순차적으로 실행되게 하는 기능
// prmise mdn
// 
// ES6 부터 JavaScript 의 표준 내장 객체로 추가됨.
// ES6를 지원하는 브라우저나 Node.js에서 전역에 있는 Promise 를 확인할 수 있음.
// 
console.log(Promise);

// 생성자를 통해서 프로미스 객체를 만들 수 있음.
// 생성자의 인자로 executor 라는 함수를 이용
new Promise(/* executor */(resolve, reject) => {});

/*
executor 함수는 resolve와 reject를 인자로 갖는다.
resolve와 reject는 함수다.
resolve(), reject()
*/

// 생성자를 통해서 프로미스 객체를 만드는 순간 pending(대기) 상태로 진입,
new Promise(/* executor */(resolve, reject) => {});

new Promise((resolve, reject) => {
  // 1. pending
  // 2. 비동기 처리 상황
  
  // 3.1 fulfilled => resolve();
  // 3.2 reject => reject();
});

// p라는 프로미스 객체는 1000ms 후에 fulfilled되는 상황

const p = new Promise((resolve, reject) =>{
            // pending
            setTimeout(() => {
              resolve(); //fulfilled
            }, 3000);
          });
p.then(/*callback*/() => {
  console.log('1000ms 후에 fulfilled 됨');
})

// 실무에서는 then을 설정하는 시점을 정확히하고, 함수의 실행과 동시에 프로미스객체를 만들면서
// pending이 시작하도록 하기 위해 프로미스 객체를 생성하면서 리턴하는 함수
// p를 만들어 함수 p 실행과 동시에 then을 설정.
function p1(){
  return new Promise((resolve, reject) =>{
    // pending
    setTimeout(() => {
      resolve(); //fulfilled
    }, 3000);
  });
}
p1().then(() => {
  console.log('3000ms 후에 fulfilled 됨');
})