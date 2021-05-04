const express = require('express');
const path = require('path')
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const app = express();
app.set('port', process.env.PORT || 3000); 

app.use(morgan('dev')); // 요청/응답을 기록하는 패키지이다.
// app.use(morgan('combined')); // 배포용
app.use(cookieParser('hohopassword')); // 암호화
// body-parser의 기능이 express 안에 내장되어 있다. 그래서 아래와 같은 것들이 주로 사용된다.
app.use(express.json());
app.use(express.urlencoded({extended: true})); // 클라이언트에서 form 요청을 할때 form을 파싱한다. true면 qs false는 querystring?
// form에서 이미지를 보낼때 멀터??를이용함
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
    console.log('hi');
    next();
  } catch (error) {
    next(error); 
  }
});


 
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
  if (true) { 
     next('route');
  } else {
    next(); 
  }
}, (req, res) => {
  console.log('실행여부?');
}); 

app.post('/', (req, res) => { 
  req.body
  req.cookies // 쿠키가 쉽게 파싱된다.
  req.signedCookies; // 다른 사람이 읽지 못하게 한다.
  res.cookie('name', encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: '/',
  })
  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  })
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

