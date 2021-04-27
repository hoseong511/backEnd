const fs = require('fs').promises; // 프로미스를 지원한다. .promises

fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch( (err) => {
    throw err;
  })
// fs.readFile('./readme.txt', (err, data) => {
//   if (err) {
//     throw
//   }
//   console.log(data);
//   console.log(data.toStirng());
// })