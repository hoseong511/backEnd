const http = require('http');

http.createServer( (request, res) => {
  res.writeHead(200, {"Content-Type" : "text/plain"});
  res.write("hello Server");
  res.end();
}).listen(3000);

console.log("server running...");