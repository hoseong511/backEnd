const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
})
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('0번', data.toString());
})
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
})
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
})
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
})
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('4번', data.toString());
})
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('5번', data.toString());
})

// 비동기 처리의 예! 순서 보장이 안된다. 백그라운드로 넘어가면 동시에 실행된다.

// 비동기 처리를 순서대로 처리하려면??

// 서버에 진입을 하면 비동기처리를 하자! 