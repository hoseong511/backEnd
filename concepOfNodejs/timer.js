// 이벤트루프에서??
'use strict'
// 메모리 누수를 막기 위해서 변수에 할당해야함
const setTime = setTimeout( () => {
  console.log('first');
}, 0); // 최소지연시간이라는 것을 알아두어야함.

const setImmed = setImmediate(()=> {
  console.log("second");
}, 0) // --> 임의의 결과가 출력됨!  절대적인 함수가 아님을 알 수 있음
// 그니깐 함수가 처리되는 시간이 있다는 말임. cpu에서 처리되는...

const interval = setInterval(()=> {
  console.log("third");
}, 1000)

clearTimeout(setTime)
clearImmediate(setImmed)
clearInterval(interval)
// time 함수 초기화


// 함수 실행시점이 유동적이다.