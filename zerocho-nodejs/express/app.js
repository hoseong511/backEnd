const express = require('express');
const path = require('path')

const app = express();
app.set('port', process.env.PORT || 3000); //1. set


app.use((req, res, next) => { 
  console.log('모든 요청에 실행하고 싶을 때 미들웨어를!'); 
  next();                                                 // 공통 미들웨어 부분!
}, (req, res, next) => {
  console.log('2. 미들웨어');
  next();
}, (req, res, next) => {
  console.log('3. 미드르루에어');
  next();
}, ( req, res, next ) => {
  try {
    console.log(asd);
  } catch (error) {
    next(error); // next의 인수가 있으면 에러 처리 미들웨어로 넘겨준다! <- 그냥 next()는 다음실행
  }
});


 
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html')); // sendFile 하면 알아서 fs을 사용함 -> 라우터 요청이 발생할 때마다 새롭게 불러오는 역할
  if (true) { // 이런식으로 분기 처리를 해서 이용가능하다. .. 중복을 줄일 때 유용하게 사용한다
     next('route');
  } else {
    next(); // console.log('실행여부?'); 여기 코드로 넘어가는 부분
  }
}, (req, res) => {
  console.log('실행여부?');
}); 

app.post('/', (req, res) => { 
  console.log('실행!');
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify({hello: 'hoho'})) 이 두줄을 아래 한줄로 처리!
  res.json({hello: 'hoho'}); // api 서버를 만들면 json을 많이 사용한다.
});

app.get('/about', (req, res) => { 
  res.send('hello express'); // http의 wirteHead랑 end가 합쳐진 send! --> 그래서 express에서 http의 메소드는 사용하지 말자! setHead(express)
});
app.get('/category/:name', (req, res) => { // /:category 라우트 매개변수
  res.send(`hello wildCard`);  // 라우터들은 위에서 부터 실행되는 순서가 있다. 그래서 와일드 카드는 마지막에 사용해야한다.
});
app.get('/category/javascript', (req, res) => { 
  res.send(`hello js`);  
});

app.use((req,res,next) => {
  res.status(404).send('404!!'); // -> 에러는 아니다. .. 404를 다룰 때 이런식으로 활용한다.
})

app.use( (err, req, res, next) => { //4. 에러 미들웨어!!(마지막) => 매개변수의 개수에 따라서 함수가 다르게 취급된다.
  console.error(err);
  res.status(200).send('모든 에러를 처리하는 미들웨어'); // status코드를 조작해서 에러코드 힌트를 주지 말아야 해커로 부터 안전하다.
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});

