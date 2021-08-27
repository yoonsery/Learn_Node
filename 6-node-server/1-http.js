const http = require('http');
// const http2 = require('http2');  // will change when i deploy..
const fs = require('fs');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const server = http.createServer((req, res) => {
  // 서버 만들기
  console.log('incoming...');
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  const url = req.url;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    // res.write('<html>');
    // res.write('<head><title>HOME SWEET HOME</title></head>');
    // res.write('<body><h1>Welcome!</h1></body>');
    // res.write('</html>');

    // 이렇게 일일히 작성하기 번거로우니까 fs.createReadStream을 이용하자!
    // 👇 경로는 현재 터미널에서 명령어를 실행하는 경로를 기준으로 작성해야 한다
    fs.createReadStream('./6-node-server/html/index.html').pipe(res);
  } else if (url === '/kitchen') {
    fs.createReadStream('./6-node-server/html/kitchen.html').pipe(res);
  } else {
    fs.createReadStream('./6-node-server/html/not-found.html').pipe(res);
  }
  // res.end(); pipe를 쓸때는 자동으로 end()처리가 되므로 따로 호출하지 않아도 된다
  // pipe는 비동기적인 함수라서 piping이 되고 있는 중간에 다음코드로 넘어가 res.end를 호출하게 되면서 파이핑이 멈춰버린다
});

server.listen(8080); // 어떤 포트를 통해 들을 건지 설정, http://localhost:8080/
