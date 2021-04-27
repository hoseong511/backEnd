const fs = require('fs').promises;

fs.readFile('./readme.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('4번', data.toString());
    return fs.readFile('./readme.txt');
  })

  // async/await으로 더 깔끔하게

  async function main() {
    let data = await fs.readFile('./readme.txt')
    console.log('11번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('22번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('33번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('44번', data.toString());
  }
  main();