// Promise 객체를 리턴하는 함수

function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  })
}

// Promise 객체를 이용해서 비동기 로직을 수행할 때

// p(3000).then(message => {
//   console.log(`${message} ms 후에 실행됨.`);
// })

// 비동기 처리가 끝날때 까지 기다림.. 코드를 순차적으로 표현하는데 효율적이다.??
// 블록 내부에서!!!
(async function main() {
  const ms = await p(1000);
  console.log(`${ms} ms 후에 실행된다.`);
})();

function p1(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(ms);
      reject(new Error('reason'));
    }, ms);
  })
}
(async function main2() {
  try {
    const ms = await p1(1000);
  } catch (error) {
    console.log(error);
  }
})();

// async 함수에서 return 되는 값은 Promise.resolve 함수로 감싸기

async function asyncP() {
  const ms = await p1(1000);
  return 'Mark: ' + ms;
}

(async function main2() {
  try {
    const name = await asyncP();
    console.log(name);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('end');
  }
})();

// Promise

p(1000)
  .then(() => p(1000))
  .then(() => p(1000))
  .then(() => {
    console.log('3000ms 후에 실행');
  });

// async await
(async function main() {
  await p(1000);
  await p(1000);
  await p(1000);
  console.log('async await !3000 ms 후에 실행');
})();

// promise.all

(async function main() {
  const result = await Promise.all([p(1000), p(2000), p(3000)]);
  console.log(result);
})();

// promise.race
(async function main() {
  const result = await Promise.race([p(1000), p(2000), p(3000)]);
  console.log(result);
})();