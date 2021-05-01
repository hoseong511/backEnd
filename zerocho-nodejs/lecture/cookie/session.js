// 브라우저에서는 중요한 내용을 기억하지 못하게 하는 것이 세션 방법이라 한다.
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k,v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc
    }, {}); // { xxx : ooo} 이런식으로 만들어지는 코드

const session = {}; 

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const uniqueInt = Date.now(); // 세션키를 제공해서 원하는 정보를 브라우저가 아닌 서버단에 저장하기
    session[uniqueInt] = { // 유일한 정보를 키로 설정한다.
      name,
      expires, 
    }
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqueInt}; name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });    // name을 적어서 보내면 에러가 난다. session 처리를 하면 쿠키에 name프로퍼티를 쓸 수 없는 것 같다. -> 다시 확인 해보니 잘된다. 이건 아닌듯,.. 
    res.end(); // 실무에서는 이런식으로 절대 세션 처리하지 않는다. 실무에서는 express-session 이용
  } else if (cookies.session && session[cookies.session] && session[cookies.session].expires > new Date()) { // 서버가 재시작 되었을 때 발생하는 문제였구나 -> session ={} 안에 값이 있는지를 검사하는 코드 추가
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${session[cookies.session].name}님 안녕하세요`)
  } else {
    try { 
      const data =await fs.readFile('./index.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
      res.end(data);
    } catch (err) {
      res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(err.message);
    }
  }
})
  .listen(8085, () => {
    console.log('8085 port is running');
  })