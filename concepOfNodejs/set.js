// set; 중복되지 않고 한개의 데이터를 수집하고자 할때 이용함

'use strict'

const test = new Set();

test.add(1)
test.add(1)
test.add(2)
console.log(test);

test.forEach( item => {
  console.log(item);
});

for(const item of test){
  console.log(item);
}

const ret = test.has(0)
console.log(ret);