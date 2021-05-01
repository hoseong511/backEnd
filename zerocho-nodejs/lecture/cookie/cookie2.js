// cookie의 만료시간을 적어주지 않으면 세션쿠키가 된다.
// session cookie : 브라우저를 닫을 때 초기화!
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


http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    }); // httponly 로그인 전용은 js로 접근하지 못하도록 설정한다. 악성스크립트 유입 차단, path아래의 주소에서는 쿠키가 유효하다.
    // 쿠키는 브라우저에서 제공하는 안전장치
  
    res.end();
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${cookies.name}님 안녕하세요`)
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
  .listen(8084, () => {
    console.log('8084 port is running');
  })