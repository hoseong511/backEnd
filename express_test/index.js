const express = require("express");
const admin = require("./routes/admin");
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');


const app = express();
const port = 80;
// autoescape는 true가 default 값이다.
nunjucks.configure('template', {
  autoescape : true,
  express : app
});

//미들웨어 셋팅
app.use( logger('dev'));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended : false }));
app.use( '/uploads', express.static('uploads'));
app.use( (req,res,next) => {
  console.log("alemf");
  console.log(res.statusCode);
  app.locals.isLogin = true;
  app.locals.req_path = req.path;
  next();
})


app.get('/', (req, res) => {
  res.send("hello express22222222");
});

app.get('/s', (req, res) => {
  res.send("hello exp");
});

app.use('/admin', admin);



app.use( (req, res, _ ) => {
  console.log(res.statusCode);
  res.status(400).render('common/404.html');  
  
});
app.use( (req, res, _ ) => {
  
  res.status(500).render('common/500.html');  
  
});


app.listen(port, () => {
  console.log("express listening on port", port);
})
