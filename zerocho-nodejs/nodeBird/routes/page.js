const express = require('express');
const { Post, User } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  // res.locals.user = req.user; // (장착되는) res.locals를 사용하면 모든 라우터에 저장되는 특성을 이용하자
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', {title: '내 정보 | NodeBird'})
});

router.get('/join', (req, res) => {
  res.render('join', {title: '회원가입 | NodeBird'})
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
  // const twits = [];   --> 여기가 문제 였음
  // res.render('main', {
  //   title: 'NodeBird',
  //   twits,
  // });
});

module.exports = router;