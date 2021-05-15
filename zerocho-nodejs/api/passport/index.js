const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 메모리에 user.id 만 저장하기 위해서
  });
  // { id: 3, 'connect.sid': s%3124124124 } -> 세션에 세션 쿠키

  passport.deserializeUser((id, done) => {
    User.findOne({ 
      where: {id},
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
     })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};