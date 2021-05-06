// 라우터 분리하기
const express = require('express');
const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = router;