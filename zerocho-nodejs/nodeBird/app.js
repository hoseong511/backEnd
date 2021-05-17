const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();
const { sequelize } = require("./models");
const pageRouter = require("./routes/page.js");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");

const app = express();
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false }) // force: true이면 db를 삭제 후 다시 생성,,alter: true or 워크벤치에서 직접수정
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
passportConfig();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // req.body 형태로 변환해준다 -> 단, enctype='multipart/form-data'인경우는 변환 x -> multer는 가능
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    // httpOnly: true,	//자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    // secure: ture,	//https 환경에서만 session 정보를 주고받도록 처리
    resave: false, //세션이 요청 중 변경되지 않아도 저장할지 말지를 저장한다
    saveUninitialized: false, //세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    secret: process.env.COOKIE_SECRET,
    cookie: { //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500).render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port sever running..");
});
