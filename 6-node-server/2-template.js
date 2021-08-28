const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const name = 'Sery';
const foods = [
  { name: 'kimbab' },
  { name: 'cake' },
  { name: 'sushi' },
  { name: 'pasta' },
  { name: 'peach' },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    ejs
      .renderFile('./template/index.ejs', { name })
      .then((data) => res.end(data));
  } else if (url === '/kitchen') {
    ejs
      .renderFile('./template/kitchen.ejs', { foods })
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile('./template/not-found.ejs', { name })
      .then((data) => res.end(data));
  }
});

server.listen(8080);
