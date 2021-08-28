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

## 템플릿 엔진 EJS 사용해보기 (server side rendering)

정적인 HTML을 이용하면 클라이언트가 언제 요청을 해도 서버가 항상 고정된 문서를 보내줄 수 있다

`Templating Engines`을 이용하면 레이아웃의 뼈대, template만 구성해놓고 클라이언트가 요청했을 때  
서버가 가지고 있는 data에 맞게 페이지를 동적으로 만들어서 클라이언트에게 보내줄 수 있다  
(템플릿 엔진에는 ejs, pug 등등 많은 엔진이 존재함)

#### EJS

`<%= data %>` - 데이터의 값을 바로 받아올 때는 `=`를 넣어주고  
`<% JavaScript %>` - 자바스크립트 문법일 경우에는 `=` 없이 사용

⚠️ 문제점  
html 파일만 제공하는 서버로, 브라우저 클라이언트 외에 다른 클라이언트는 사용할 수 없다

## JSON 보내주기

```js
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
```

POST확인은 포스트맨에서 새로운 요청을 만들어서  
`POST` 동작선택 후, `URL 주소`를 넣어주고 (http://localhost:8080/kitchen)  
`Body` 탭에 `raw`선택 후 type을 `JSON`으로 선택한다  
본문에 `{ "naem": "tea" }` 로(쌍따옴표를 사용해야한다) 작성하고 `send`클릭  
그럼 아랫부분에 status code로 201을 받았다고 뜨는 걸 확인할 수 있다  
메모리에 추가가 되었기 때문에 브라우저 새로고침으로 확인하거나 포스트맨에서 `GET` 동작 선택 후 send키로 확인 가능하다
