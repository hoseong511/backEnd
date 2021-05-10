const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join',  isNotLoggedIn, async (req, res, next) =>{
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12); // 해쉬의 레벨 낮을 수록 위험
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 안에 미들웨어에는 (req, res, next)-> 미들웨어를 확장하는 패턴!
})

router.get('/logout', isNotLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;

// 카카오로그인 or 아이디/비밀번호(세션) 로그인 로직이 복잡해진다. -> passport를 이용하면 로직인 단순 깔끔(?)해진다.