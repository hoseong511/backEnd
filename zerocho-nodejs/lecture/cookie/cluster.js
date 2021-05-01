const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // cpu 개수 구하기

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`); // 마스터 프로세스는 서버가 아니다.
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork(); // 프로세스들을 만드는 과정
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork(); //  실무에서는 서버가 꺼지면 다시 살리는 작업이 필요하다.
  });
} else { //워커프로세스인경우
 http.createServer((req, res) => {
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
   res.write('<h1>Hello Node!</h1>');
   res.end('<p>Hello Cluster</p>');
   setTimeout(() => {
     process.exit(1);
   }, 1000);
 }).listen(8086); // 하나의 포트에 서버들을 운영할 수 있다. -> 라운드 로빈 방식으로 

 console.log(`${process.pid}번 워커 실행`);
}
// 8개 워커 서버에 분배