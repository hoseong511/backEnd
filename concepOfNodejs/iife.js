// IIFE; 즉시 실행 함수 표현

'use strict'
// 즉시 실행 함수안에 정의된 변수는 외부에서의 접근이 불가능함
// iife 내부의 변수는 외부에서 접근 불가능 
var  r = ( () => {
  var lang = 'js';
  return lang
})();
// 이런식으로 하면 실행된 값만 r에 저장된다.

console.log(r);

