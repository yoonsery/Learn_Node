const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    fs.createReadStream('./6-node-server/html/index.html').pipe(res);
  } else if (url === '/kitchen') {
    fs.createReadStream('./6-node-server/html/kitchen.html').pipe(res);
  } else {
    fs.createReadStream('./6-node-server/html/not-found.html').pipe(res);
  }
});

server.listen(8080);
