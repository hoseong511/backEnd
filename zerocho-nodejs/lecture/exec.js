// 프로세스 하나를 띄워 명령어를 입력할 수 있다.
const exec = require('child_process').exec;

var process = exec('cmd /c chcp 65001>nul && dir');

process.stdout.on('data', function (data){
  console.log(data.toString());
})

process.stderr.on('data', function (data){
  console.error(data.toString());
}) 