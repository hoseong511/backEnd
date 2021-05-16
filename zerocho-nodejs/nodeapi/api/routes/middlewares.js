// 로그인/로그아웃 여부를 확인하는 미들웨어
const jwt = require("jsonwebtoken");
const RateLimit = require('express-rate-limit')

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    console.log('verifyToken');
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    console.log(err.name);
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
// dos 공격을 방지하는 미들웨어
exports.apiLimiter = new RateLimit({
  windowMs: 60 * 1000,
  max: 10,
  delayMs: 0, // 
  handler(req, res) {
    res.status(this.statusCode).json({ //429 status코드는 문서화 잘해놓자
      code: this.statusCode,
      message: '1분에 10번만 요청할 수 있습니다.',
    })
  }
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: '새로운 버전이 나왔습니다. 새로운 버전(v2)을 확인해주세요'
  })
}
