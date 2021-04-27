const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 10_000_000; i++) {
  file.write('안녕하세요. 큰 용량의 파일을 만들어 볼 것입니다. 현재 디스크 용량을 확인해주세요')
}
file.end();