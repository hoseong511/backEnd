// rejected되는 시점에 p.catch안에 설정한 callback 함수

function p1(){
  return new Promise((resolve, reject) =>{
    // pending
    setTimeout(() => {
      reject(); //fulfilled
    }, 3000);
  });
}
p1()
  .then(() => {
    console.log('3000ms 후에 fulfilled 됨');
  })
  .catch(() => {
    console.log('1000ms 후에 rejected 됨.');
  })
  // 상황에 맞게 활용하자


  // executor 의 resolve 함수를 실행할때 인자를 
  // 넣어 실행하면, then의 callback 함수의 인자로 받을 수 있음.
  // data를 넣어 받을 수 있음.
  // reject 또한 마찬가지임.
function p2(){
  return new Promise((resolve, reject) =>{
    // pending
    setTimeout(() => {
      reject('error'); //fulfilled
    }, 3000);
  });
}
p2()
  .then(message => {
    console.log('3000ms 후에 fulfilled 됨', message);
  })
  .catch(reason => {
    console.log('1000ms 후에 rejected 됨.', reason);
  })


function p2(){
  return new Promise((resolve, reject) =>{
    // pending
    setTimeout(() => {
      reject('error'); //fulfilled
    }, 3000);
  });
}
p2()
  .then(message => {
    console.log('3000ms 후에 fulfilled 됨', message);
  })
  .catch(reason => {
    console.log('1000ms 후에 rejected 됨.', reason);
  })


// 보통 reject 함수를 실행할때 표준 내장 객체인 Error의  생성자를 이용하여 Error객체를 만들어 넘김. 상세한 오류내용을 찍어냄.
function p2(){
  return new Promise((resolve, reject) =>{
    // pending
    setTimeout(() => {
      reject(new Error('bad')); //fulfilled
    }, 3000);
  });
}
p2()
  .then(message => {
    console.log('3000ms 후에 fulfilled 됨', message);
  })
  .catch(reason => {
    console.log('1000ms 후에 rejected 됨.', reason);
  });



