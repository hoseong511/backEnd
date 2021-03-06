const express = require("express");
const axios = require("axios");
const { token } = require("morgan");

const router = express.Router();
// 토큰 재발급 받기 위한 조건
const URL = "http://localhost:8002/v2";
axios.defaults.headers.origin = "http://localhost:4002"; // 서버 -> 서버 는 origin이 붙지 않는다. 브라우저는 origin을 붙여준다.

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
      console.log(api);
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    console.error(error.response);
    if (error.response.status === 419) {
      delete req.session.jwt;
      return request(req, api);
    }
    return error.response;
  }
};

router.get("/mypost", async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/search/:hashtag", async (req, res) => {
  try {
    const hashtag = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    );
    res.json(hashtag.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', (req, res) => {
  res.render('main', {key: process.env.CLIENT_SECRET}) // 원래는 프론트와 서버용을 분리해야한다.
})
module.exports = router;
