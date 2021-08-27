const http = require('http');
// const http2 = require('http2');  // will change when i deploy..

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const server = http.createServer((req, res) => {
  // 서버 만들기
  console.log('incoming...');
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  res.write('Welcome!');
  res.end();
});

server.listen(8080); // 어떤 포트를 통해 들을 건지 설정, http://localhost:8080/
