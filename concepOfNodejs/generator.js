// async 와 await를 사용하면서 중요도가 떨어졌지만
// generator는 ??의 특징은 알고있어야함
'use strict'

// yield 함수를 끝내지 않고 생성? 함
// return 

function* log () {
  console.log(0, yield);
  console.log(1, yield);
  console.log(2, yield);
}

const gen = log()

gen.next()
gen.next('zero')
gen.next('first')
gen.next('second')





