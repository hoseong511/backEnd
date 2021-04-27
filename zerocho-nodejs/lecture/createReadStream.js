const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16}); // 16 바이트씩 조각내어 보내기 default: 64kB

const data = [];
readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data: ', chunk.toString(), chunk.length);
})
readStream.on('end', () => {
  console.log('end: ', Buffer.concat(data).toString());
});
readStream.on('error', (err) => {
  console.log('error: ', err);
})