// 되도록 다중 스레드는 다른언어를 이용해서 구현하기
// 다른 언어의 스크립트를 호출 시키는 법. 다른언어에 인자를 넘기는 법은?
// js에서 python으로 데이터를 넘기기 (spawn.js -> test.py)
const spawn = require('child_process').spawn;
const word = 'hi python'
const obj_data = {
  'hi' : 1,
  'hello' : 2,
  'list_test': [1,15,11,4,5,6,7,2]
}
const select_number = 3;

const process = spawn('python', ['test.py', `${JSON.stringify(obj_data)}`, `${select_number}`]);
// 위와 같이 cmd로 python 을 실행시키고, test.py 스크립트의 인자를 전달하여 실행시키는 것이 가능하다.
process.stdout.on('data', function (data) {
  const reg = /[0-9]/gi;
  console.log(data.toString().match(reg));
})
process.stderr.on('data', function (data) {
  console.error(data.toString());
})