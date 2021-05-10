const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // { id: 3, 'connect.sid': s%3124124124 } -> 세션에 세션 쿠키

  passport.deserializeUser((id, done) => {
    User.findOne({ where: {id} })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};