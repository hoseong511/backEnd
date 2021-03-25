const express = require('express');
const router = express.Router();

function testMiddleware( req, res, next ){
  console.log("첫번째 미들웨어");
  // if (로그인이 안되어있으면?){
  // 이벤트루프를 이용한 로그인 정보 확인장치이다.
  // }else{
    next();
  // }
  
}

function testMiddleware2( req, res, next ){
  console.log("두번째 미들웨어");
  next();
}

router.get('/', testMiddleware, testMiddleware2,(req, res) => {
  res.send("admin 이후 url");
});

router.get('/products', (req, res) => {
  res.render('admin/product.html', {
    result : `<span>hoho</span>`
  })
});

module.exports = router;