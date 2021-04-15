/*
callback hell은 callback을 연속적으로 이용해서 코드의 가독성을 떨어뜨림.. 그래서 
promise를 이용해서 코드의 가독성을 높이자!
보통 비동기 작업을 할때 callback hell 과 promise로 표현할때
then 함수에서 다시 프로미스 객체를 리턴하는 방법을 통해 체이닝하면,
비동기 작업을 순차적으로 표현가능
*/
function c(callback) {
  setTimeout(() => {
    callback();
  }, 1000)
};

c(() => {
  console.log('1000ms 후에 callback함수가 실행');
});

c(() => {
  c(() => {
    c(() => {
      console.log('1000ms 후에 callback 함수가 실행');
    })
  })
})

function p() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hihi');
    }, 1000);
  });
}

p()
  .then(message => {
    console.log(message);
    return p();
  })
  .then(() => p())
  .then(p)
  .then(() => {
    console.log('4000ms 후');
  })