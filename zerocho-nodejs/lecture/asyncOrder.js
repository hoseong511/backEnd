const fs = require('fs');
// 비동기를 순서대로 작동시키는 방법 -> 이게 바로 콜백 헬..
// 동시에 실행시키되 순서는 지킨다..
// sync는 순서대로 실행된다. 말그대로 하나 실행시키고 완료될때까지 기다린 후 다음작업 실행
// async는 코드가 읽혀지는 대로 바로바로 백그라운드로 넘겨버리고 백그라운드에서 동시다발적으로 실행 

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('0번', data.toString());
  fs.readFile('./readme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
      if (err) {
        throw err;
      }
      console.log('2번', data.toString());
      fs.readFile('./readme.txt', (err, data) => {
        if (err) {
          throw err;
        }
        console.log('3번', data.toString());
        fs.readFile('./readme.txt', (err, data) => {
          if (err) {
            throw err;
          }
          console.log('4번', data.toString());
          fs.readFile('./readme.txt', (err, data) => {
            if (err) {
              throw err;
            }
            console.log('5번', data.toString());
          })
        })
      })
    })
  })
})
