const express = require("express");
const admin = require("./routes/admin");
const nunjucks = require('nunjucks');
const logger = require('morgan');

const app = express();
const port = 80;
// autoescape는 true가 default 값이다.
nunjucks.configure('template', {
  autoescape : true,
  express : app
});

//미들웨어 셋팅
app.use( logger('dev'));

app.get('/', (req, res) => {
  res.send("hello express22222222");
});

app.get('/s', (req, res) => {
  res.send("hello exp");
});

app.use('/admin', admin);

app.use('/admin/contact', admin);

app.listen(port, () => {
  console.log("express listening on port", port);
})
