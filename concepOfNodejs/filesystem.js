// 빈번히 사용됨.
'use strict'

const fs = require('fs')

fs.readFile('test.txt', 'utf-8', (err, data) => {
  // 에러에대한 핸들링이 우선임.
  if (err){
    console.error(err);
    return
  }

  console.log(data);
}); // default값이 utf-8

const content = 'something to Write!'
fs.writeFile('fast.txt', content, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('success')

})