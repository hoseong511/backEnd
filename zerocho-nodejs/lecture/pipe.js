
const fs = require('fs');
const zlib = require('zlib'); // zip

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16});
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./writeme4.txt.gz'); // 압축
readStream.pipe(zlibStream).pipe(writeStream); // 스트림을 지원하는 것에만 pipe를 지원한다.