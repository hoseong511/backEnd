Promise.resolve( /* value */ )

Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 1000);
  }),
).then(data => {
  console.log(
    '프로미스 객체인 경우, resolve된 결과를 받아 then이 실햄됩니다.', data,
  );
});

Promise.resolve('bar').then(data => {
  console.log('then 메서드가 없는 경우, fulfilled 됩니다.', data);
})

// promise 객체인지 확인하고 싶을때 이용함

Promise.reject( /* value */ );

Promise.reject(new Error('reason'))
  .then(error => {})
  .catch(error => {
    console.log(error);
  });

// 프로미스 객체 여러개를 생성하여,
// 배열로 만들어 인자로 넣고 Promise.all을 실행하면.
// 배열의 모든 프로미스 객체들이 fulfilled 되었을 때, then의 함수가 실행됨.

function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

Promise.all([p(1000), p(2000), p(3000)]).then((message) => {
  console.log('모두 fulfilled 된 이후에 실행됨.', message);
})

//Promise.race
function p1(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

Promise.race([p1(1000), p1(2000), p1(3000)]).then((message) => {
  console.log('가장 빠른 하나가 fulfilled 된 이후에 실행됨.', message);
})