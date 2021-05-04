const express = require('express');
const path = require('path')

const app = express();
app.set('port', process.env.PORT || 3000); //1. set

// app.use를 제외한 함수 부분이 미들웨어이다!
app.use((req, res, next) => { // app.use는 장착하는 의미?? 마찬가지로 app.use('/about', (req,res)) <- 이런식으로 주소를 정해줄 수 있다.
  console.log('모든 요청에 실행하고 싶을 때 미들웨어를!'); // next를 사용하지 않으면 라우터에 해당되는 동작x
  next();                                                 // 공통 미들웨어 부분!
}, (req, res, next) => {
  console.log('2. 미들웨어');
  next();
}, (req, res, next) => {
  console.log('3. 미드르루에어');
  next();
}, (req, res, next) => {
  throw new Error('에러 발생!'); // 에러처리를 해야 서버가 죽지 않고 운영된다.!! 중요!
}) 


 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // sendFile 하면 알아서 fs을 사용함 -> 라우터 요청이 발생할 때마다 새롭게 불러오는 역할
}); // 이런식으로 간단하게 html을 서빙!   서버는 이론이 더 중요하다. -> 기반 지식이 중요하다.

// 범위가 넓은 라우터들은 항상 아래 와야 한다. 

app.post('/', (req, res) => { // 메서드와 주소가 있는 녀석들을 라우터라 한다.
  res.send('hello express');
});
// 한 라우터에서 여러번 res.send(), res.json() 들이 2번 이상 사용되면 에러가 발생한다. 
app.get('/about', (req, res) => { 
  res.send('hello express'); // http의 wirteHead랑 end가 합쳐진 send! --> 그래서 express에서 http의 메소드는 사용하지 말자! setHead(express)
});
app.get('/category/:name', (req, res) => { // /:category 라우트 매개변수
  res.send(`hello wildCard`);  // 라우터들은 위에서 부터 실행되는 순서가 있다. 그래서 와일드 카드는 마지막에 사용해야한다.
});
app.get('/category/javascript', (req, res) => { 
  res.send(`hello js`);  
});
// app.get('*', (req, res) => {
//   res.send('어떠한 주소가 와도 와일드 카드 만 실행된다. 그래서 순서 상 아래에 위치해야 한다.');
// }) -> 404를 확인하려면 와일드카드 라우터를 제외시키자

app.use((req,res,next) => {
  res.status(404).send('404!!'); // -> 에러는 아니다. .. 404를 다룰 때 이런식으로 활용한다.
})

app.use( (err, req, res, next) => { //4. 에러 미들웨어!!(마지막) => 매개변수의 개수에 따라서 함수가 다르게 취급된다.
  console.error(err);
  res.status(200).send('에러를 처리하는 마지막 미들웨어'); // status코드를 조작해서 에러코드 힌트를 주지 말아야 해커로 부터 안전하다.
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});

// npm ls express -> 패키지 확인: 프로젝트내에서 사용하고 있는 패키지를 확인할 수 있다.