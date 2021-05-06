const dotenv = require('dotenv');
const express = require('express');
const path = require('path')
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const multer = require('multer');
const { fs } = require('fs');

dotenv.config(); // process.env를 사용하는 패키지 보다는 위에 위치해야한다.
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000); 

app.use('/', (req,res,next) => {
  if (req,session.id){
    express.static(path.join(__dirname, 'public-3248'))(req, res, next)  
  } else {
    next();
  }
}); // 로그인한 사람에게 static을 보여주고 싶을때 -> 미들웨어 확장하는 방법!
app.use(morgan('dev')); // 요청/응답을 기록하는 패키지이다.
app.use(cookieParser(process.env.COOKIE_SECRET)); // 암호화
app.use(express.urlencoded({extended: true})); // 클라이언트에서 form 요청을 할때 form을 파싱한다. true면 qs false는 querystring?
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET, // .env관리만 잘하면된다.
  cookie: {
    httpOnly: true,
  },
  name: 'connect.sid',
})); // 개인의 저장공간을 만들어주는 것이 세션이다. -> 
app.use(express.json());

// 라우터 연결
app.use('/', indexRouter);
app.use('/user', userRouter); // 관련된 라우터끼리 묶어서 관리하자
 
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
  console.log(req.data);
  console.log(req.session.data);
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

