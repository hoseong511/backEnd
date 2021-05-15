const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { nextTick } = require("process");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  // 이미지 파일 업로드 라우터와 게시물 라우터를 따로 두는 이유는
  console.log(req.file); // 게시물 작성하는 동안 이미지 파일을 업로드 하려고
  res.json({ url: `/img/${req.file.filename}` });
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    /**
     * [#노드, #익스프레스]
     * [노드, 익스프레스]
     * [findOrCreate(노드), findOrCreate(익스프레스)]
     * [[해시태그, false], [해시태그, true]]
     * 정규표현식과, sql의 join, transaction 관계형 데이터베이스를 사용한다면 중요한 개념!
     * findOrCreate, upsert 등등 sequelize공식문서를 확인해보면 여러가지로 많다.
     */
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      console.log(result);
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:id/delete", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.params.id);
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
  } catch (err) {}
});

module.exports = router;
