const express = require("express");
const admin = require("./routes/admin");

const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send("hello express22222222");
});

app.get('/s', (req, res) => {
  res.send("hello exp");
});

app.use('/admin', admin);

app.listen(port, () => {
  console.log("express listening on port", port);
})
