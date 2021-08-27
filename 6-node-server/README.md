## HTTP

### http 모듈을 이용해서 node로 server만들기

http2는 https와 함께 적용된다 그래서 개발하는 단계에서 복잡할 수 있으므로  
배울 땐 http로 하고 나중에 배포할 땐 http2로 변경할거야

```js
const http = require('http');
const http2 = require('http2');

console.log(http.STATUS_CODES);
console.log(http.METHODS);
```

#### 서버 만들기

```js
const server = http.createServer((req, res) => {
  console.log('incoming...');
  console.log(req.headers); //     request 정보들을 로그로 찍어봄
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  // 서버에서 특정한 시간이 지나도록 계속 반응을 해주지 않으면 타임아웃 에러가 발생한다
  // 그걸 방지하기 위해 두번째 인자 response로 반응을 해주면 된다
  res.write('Hello!');
  res.end();
});

server.listen(8080); // localhost:8080, 어떤 포트를 통해 들을 건지 설정
```

#### text 주고받기

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.write('Hello!');
  } else if (url === '/course') {
    res.write('course');
  } else {
    res.write('not found');
  }
  res.end();
});
```

#### html 주고 받기

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>HOME SWEET HOME</title></head>');
    res.write('<body><h1>Welcome!</h1></body>');
    res.write('</html>');
    // 이렇게 일일히 작성하기 번거로우니까 fs.createReadStream을 이용하자!
    // 1st 인자로 오는👇 경로는 현재 터미널에서 명령어를 실행하는 경로를 기준으로 작성해야 한다
  } else if (url === '/course') {
    res.setHeader('Content-Type', 'text/html'); // <- 중복되는 코드라서 if문 밖으로 빼놓으면 된다
    fs.createReadStream('./6-node-server/html/course.html').pipe(res);
  } else {
    fs.createReadStream('./6-node-server/html/not-found.html').pipe(res);
  }
  // pipe는 비동기적인 함수라서 piping이 되고 있는 중간에 다음코드로 넘어가 res.end를 호출하게 되면서 파이핑이 멈춰버린다
  // 그러므로 pipe를 쓸때는 자동으로 end()처리가 되므로 따로 호출하지 않아도 된다
});
```

```js

```

```js

```
