const http = require('http');

const foods = [
  { name: 'kimbab' },
  { name: 'cake' },
  { name: 'sushi' },
  { name: 'pasta' },
  { name: 'juice' },
];

const server = http.createServer((req, res) => {
  const url = req.url; //  what?
  const method = req.method; //  how?, action?
  if (url === '/kitchen') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(foods));
    } else if (method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      req.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const food = JSON.parse(bodyStr);
        foods.push(food);
        console.log(food);
        res.writeHead(201);
        res.end();
      });
    }
  }
});

server.listen(8080);
