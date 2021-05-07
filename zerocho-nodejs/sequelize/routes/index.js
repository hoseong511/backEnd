// 라우터 분리하기
const express = require('express');
const User = require('../models/user');

const router = express.Router();

// GET / 라우터
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('sequelize', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;