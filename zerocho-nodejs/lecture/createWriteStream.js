const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.'); //
writeStream.end(); // 메모리가 1MB만 있어도 64kB씩 나눠서 작성하는 것이 가능하다.
