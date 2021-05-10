const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { nextTick } = require('process');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => { // 이미지 파일 업로드 라우터와 게시물 라우터를 따로 두는 이유는 
  console.log(req.file);                                              // 게시물 작성하는 동안 이미지 파일을 업로드 하려고
  res.json({ url: `/img/${req.file.filename}`});
}); 

router.post('/', isLoggedIn, upload.none(), async (req, res, next)=> {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;