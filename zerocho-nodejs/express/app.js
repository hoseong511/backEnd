const express = require('express');
const path = require('path')

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // sendFile 하면 알아서 fs을 사용함 -> 라우터 요청이 발생할 때마다 새롭게 불러오는 역할
}); // 이런식으로 간단하게 html을 서빙!   서버는 이론이 더 중요하다. -> 기반 지식이 중요하다.

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/about', (req, res) => {
  res.send('hello express');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});

// npm ls express -> 패키지 확인: 프로젝트내에서 사용하고 있는 패키지를 확인할 수 있다.