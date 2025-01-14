## Express

**WHY**  
사용자가 많아 검증된 프레임워크, 가볍고 심플하고 유연함

### Express의 특징

#### 사용법

```js
// Express.js

const express = require('express')
const app = express()

app.get('/posts', function (req, res, next) {
  res.send(...)
})

app.post('/posts', function (req, res, next) {
  res.send(...)
})

app.put('/posts/:id', function (req, res, next) {
  res.send(...)
})

app.delete('/posts/:id', function (req, res, next) {
  res.send(...)
})

app.listen(8080)
```

```js
app.get('/posts', function (req, res next) {
  // get 자리에  post, put, delete, all, use 상황에 맞는 함수를 사용하면 된다
  // 첫번째 인자자리에는 URL/Path 정의, 어떤 인자를 처리할 건지 정의
  // 두번째 인자에 callback함수 등록, req, res, next 3개의 인자를 받음
  // 이 콜백함수를 middleware라고 한다
  res.send(...)
})
```

▶️ Express는 middleware의(콜백함수) 연속이다

① `app.use` : `use`는 get, post등 모든 리퀘스트를 처리하는 함수 `* json`로 모든 path를 처리하는 미들웨어 하나 만들고  
② `app.use` : `* headers`, 모든 경로에 대해서 header에 대해서 처리하는 미들웨어 만들고  
③ `app.get` : `/`, root경로에 해당하는 것을 처리하는 미들웨어 만들고  
④ `app.get` : `/posts`라는 미들웨어 만듦  
⑤ `app.use` : `(error)` 라는 미들웨어를 만들어서 각각의 미들웨어들을 체이닝해서 연결해주는 것이 express

- 사용자가 GET 메소드를 이용해서 root 경로에 request가 접수가 되면
  - ①에서는 json을 parsing한 다음 next()를 호출해서 다음 미들웨어로 넘어감
  - ② header에 대한 적절한 처리를 하고 next()로 다음 미들웨어 호출
  - ③ 에서는 리퀘스트가 들어온 GET 메소드와 경로가 동일하기 때문에 여기서 해당하는 리소스를 준비해서 사용자에게 response해준다 `res.send()`
  - ✨ 이렇게 response에 한번 반응을 하면, 그 뒤에있는 미들웨어에게는 넘어가지 않는다
  - 앞에 있던 모든 미들웨어에 해당이 안되면 제일 마지막에 등록된 미들웨어가 호출되고 마지막 미들웨어에서 에러를 던지거나 response를 응답한다

## 서버 만들기

`npm init --yes`, `npm i express`  
`package.json`에서 `"start": "nodemon app"`, `"type": "module"` 추가  
`npm i nodemon --save-dev`로 개발자 모드에서 노드몬이 필요하다는 걸 명시해준다 - 다른 개발자와 프로젝트를 공유했을 때 nodemon이 없을 경우를 대비해서

IP - 서버가 네트워크상에 어디있는지 알 수 있다  
Port - 그 서버의 어떤 어플리케이션에 접속하길 원하는지 나타냄

[공식사이트](https://expressjs.com/en/4x/api.html)

```js
app.all(); //  모든 메소드 처리

app.disable(); // 어플에서 설정을 끄고, 켤 때 사용
app.enable();

// Request
req.baseUrl;
req.body;
req.cookies;
req.ip;
req.method;
req.params;
req.query;

// Response
res.append(); // header에 data 추가
res.cookie(); // 쿠키설정
res.json(); // json데이터를 사용자에게 보낼 수 있다
res.redirect();
res.send();
```

```js
app.get('/', (req, res, next) => {
  console.log('get');
  res.send('hi'); // 항상 클라이언트에게 데이터를 보내줘야 함 otherwise 로딩스피너 계속 돌아가~
});
```

## Request

```js
app.get('/sky/:id', (req, res, next) => {
  // console.log(req.path);
  // console.log(req.headers);

  //  localhost:8080/sky/ona/ 에서 리프레시하면
  console.log(req.params); //      { id: 'ona' }
  console.log(req.params.id); //    ona

  // localhost:8080/sky/ona/?keyword=handball 에 가서 리프레시 하면
  console.log(req.query); //         { keyword: 'handball' }
  console.log(req.query.keyword); //   handball

  res.send('hi');
});
```

## Response [👀](https://github.com/yoonsery/study_node/blob/main/8-express/1-start/app.js)

```js
app.get('/sky/:id', (req, res, next) => {
  res.setHeader('key', 'value'); // header에 특정한 것을 설정해야 할 때 사용, key-value 형태로 전달

  res.json({ name: 'bolbol' }); // object도 전달이 된다
  res.sendStatus(400); // data 없이 status code만 보낼 수 있다 >> Bad Request 가 뜸
  res.status(201).send('created'); // 개별적으로 status code를 보내고 메시지를 보내줄 수도 있다
});
```

## feature of middleware [👀](https://github.com/yoonsery/study_node/blob/main/8-express/2-middlewares/app.js)

실행하면 콘솔에 first만 찍힌다 why? - 첫번째 콜백에서 res를 하거나 next를 호출해서 다음으로 연결해줘야 한다

```js
// 여러가지 인자를 전달하면 array 형태로 처리가 된다
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});
```

첫번째 콜백에서 `next()`를 실행해주면 두번째 등록한 미들웨어까지 호출이 된다 - console에 first, first2만 찍힘

```js
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    next();
  },
  (req, res, next) => {
    console.log('first2');
    // next();  를 실행해주면 first, first2, second 가 찍힌다
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});
```

현재 경로에 함께 등록된 배열을 무시하고 다음 미들웨어로 넘어가게 할 수 있다

```js
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    next('route'); // first, second 가 찍힘 first2는 넘어가버린다~
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});
```

error도 던질 수 있는데 별도의 처리를 하지 않으면 error가 사용자에게 그대로 전달되어버린다  
그래서 항상 어플리케이션 마지막에 `app.use((error, req, res, next))`를 사용해서 에러처리를 해줘야 한다

```js
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    next(new Error('error'));
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});

// 처리할 수 없는 경로에 대한 응답
// 아무것도 처리되지 않고 여기까지 왔다는 건 그 누구도 이 요청에 대한 응답을 하지 않았다는 뜻
app.use((req, res, next) => {
  res.status(404).send('Not available! 😔');
});

// 에러메시지 처리
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry, try later!');
});

app.listen(8080);
```

#### `app.all()`과 `app.use()` 차이점

```js
app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});
// GET, POST...어떤 http method로 보내든 항상 콜백이 수행이 된다
// 하지만 localhost:8080/api/doc 처럼 api 안에있는 다른 경로에 접속하면 콜백이 실행되지 않음
// 해당 경로에 한해서만, http의 모든 리퀘스트가 수행이 된다

app.use('/sky', (req, res, next) => {
  console.log('use');
  next();
});
// 해당경로를 포함하면 뒤에 어떤 경로를 추가 하더라도 콜백이 실행된다
// 만약 all에서도 사용하고 싶다면 app.all('/api/*', ...)로 명확하게 명시를 해주면 된다
```

#### `if문`을 사용할 때 주의할 점

```js
app.get('/', (req, res, next) => {
  console.log('first');
  if (true) {
    // res.send('Hello');  //  error: Cannot set headers after they are sent to the client
    return res.send('Hello'); // return을 붙여서 함수가 끝나도록 처리해야한다
  }
  res.send('Bye');
});
```

## Post

포스트맨에 POST, body, raw, json 선택하고 내용을 넣고 send 하면 콘솔에 undefined가 뜬다  
`app.use(express.json())` 사용하면 콘솔에 undefined가 아닌 포스트맨으로 POST한 내용이 뜬다

```js
import express from 'express';
const app = express();

app.use(express.json()); // 요청이 들어오는 body 부분을 자동으로 parsing해서 보여준다
app.post('/', (req, res, next) => {
  console.log(req.body);
});
app.listen(8080);
```

## Error handling [👀](https://github.com/yoonsery/study_node/blob/main/8-express/4-error-handling/app.js)

- 클라이언트가 요청한 request를 제대로 처리하지 못했다면, 클라이언트에게 적절한 에러메시지를 보내서 에러에 대한 충분한 내용을 전달해야함
- 시스템 내부적으로 큰 문제가 발생하더라도 서버가 죽지 않도록, 문제상황에서 빠르게 복귀될 수 있도록 예외처리를 잘 할 것

각각의 미들웨어에서 처리할 수 있는 에러는 가능한 한 많이 잘 해둬야한다 그래야 상황에 맞는 적절한 에러메시지를 클라이언트에게 보낼 수 있다

#### 1. 동기적인 함수에서 에러가 발생할 때

```js
app.get('/file1', (req, res) => {
  const data = fs.readFileSync('/file1.txt'); // ① file1.txt가 없기때문에 에러발생 & readFileSync는 동기처리되므로 바로 에러던짐
});

// code ..
// code ..

// ①에서 던져진 에러는 에러처리하는 미들웨어인 이곳으로 와서 처리됨, ①의 상황에 맞는 구체적인 에러메시지가 아닌 일반적인 에러메시지를 보냄
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});
```

그래서 `동기적인 함수`를 호출하는 경우에는 `try, catch`로 감싸준다

```js
app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
  } catch (error) {
    res.status(404).send('File not found');
  }
});
```

#### 2. 비동기적인 함수에서 에러가 발생한 경우는?

```js
app.get('/file1', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {}); // readFile은 비동기적
});
// 로딩스피너가 계속 돌고, 마지막 일반적 에러처리를 해주는 미들웨어에 도달하지 못함
```

`fs.readFile` 함수호출 자체만으로는 에러가 발생하지 않았고 `콜백함수의 첫번째 인자`로 `에러가 전달`되었기 때문에  
비동기적인 함수는 마지막 안전망인 에러처리 미들웨어에 잡히지 않는다 ❗️ ( 내부로 에러가 전달되었기 때문에 외부에서 포착되지 않음)  
express의 모든 미들웨어의 체인은 동기적으로 연결되어있다 그래서 비동기적인 에러는 잡을 수 없다

그래서 `비동기함수`에서는 아래와 같이 `콜백함수 내에서 에러를 처리`해줘야 한다

```js
app.get('/file1', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});
```

#### error handling in Promise

```js
// 비동기적인 Promise일 경우에는 catch로 에러를 처리하면 된다 (promise - then().catch())
app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch((error) => {
      res.sendStatus(404);
    });
});

// 또는 next로 에러전달 ⟶ 다음 미들웨어로 에러를 던졌기 때문에 마지막 안전망인 에러처리 미들웨어에서 에러를 잡음
app.get('/file2', (req, res, next) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch(next);
  // .catch((error) => next(error)); ⬆️ 전달받은 인자 = 호출하는 인자 : 생략가능
});
```

#### error handling in Async

```js
// async 미들웨어는 프로미스를 호출하므로 에러발생시, 마지막 안전망인 에러처리 미들웨어에는 포착되지 않음
// 하지만  await 코드 자체는 동기적이므로, try 와 catch 로 에러를 처리해줘야 한다

app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt');
  } catch {
    res.sendStatus(404);
  }
});
```

## 비동기 에러 처리하는 방법 - express5 최신버전 [👀](https://github.com/yoonsery/study_node/blob/main/8-express/5-express5/app.js)

catch를 하지않아도 비동기적 코드가 마지막 안전망 에러 미들웨어에 잡힐 수 있는 방법

#### Express5 이전버전

`npm i express-async-errors` 라이브러리를 설치하면 promise도 마지막 안전망인 에러처리 미들웨어에서 잡을 수 있다  
`import {} from 'express-async-errors';`로 import 한다  
단, 미들웨어에서 프로미스를 리턴하는 경우에만! `return fsAsync.readFile('/file.txt')` 이렇게 리턴을 해줘야 한다  
async middleware는 자동으로 프로미스를 리턴한다

#### Express5 이후 버전

따로 라이브러리 설치없이 프로미스에서 리턴해주거나, async를 사용하면 마지막 에러처리 미들웨어에서 에러를 잡아준다  
[github express issue comment](https://github.com/expressjs/express/issues/2259#issuecomment-433586394)  
[Async Middleware](https://github.com/blakeembrey/async-middleware)

## Router

반복되는 코드를 어떻게 해야할까?

```js
// app.js

import express from 'express';

const app = express();

app.use(express.json());

app.get('/posts', (req, res) => {
  res.status(201).send('GET: /posts');
});

app.post('/posts', (req, res) => {
  res.status(201).send('POST: /posts');
});

app.put('/posts/:id', (req, res) => {
  res.status(201).send('PUT: /posts');
});

app.delete('/posts/:id', (req, res) => {
  res.status(201).send('DELETE: /posts');
});

app.listen(8080);
```

경로가 같으면 이렇게 route로 체이닝을 해줄 수 있다

```js
// app.js

app
  .route('/posts')
  .get((req, res, next) => {
    res.status(201).send('GET: /posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

app
  .route('posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });
```

하지만! 복잡한 서버일 경우, 여러가지 경로가 존재하므로 이렇게 `app.js`에서 전부 나열하는 것은

- 가독성이 떨어진다
- module성이 떨어진다
- 유지보수가 어렵다

`app.js`에 아래처럼 코드 작성하고

```js
// app.js

app.use('/posts', postRouter);
app.use('/users', userRouter);

// app.use()에서 경로를 지정해뒀기 때문에
// post.js, user.js에서 경로 일일이 작성하지 않고 '/' 현재경로를 사용하면 된다
```

router 폴더에 `post.js`, `user.js`를 만든다

```js
// post.js

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).send('GET: /posts');
});

router.post('/', (req, res) => {
  res.status(201).send('POST: /posts');
});

router.put('/:id', (req, res) => {
  res.status(201).send('PUT: /posts/:id');
});

router.delete('/:id', (req, res) => {
  res.status(201).send('DELETE: /posts/:id');
});

export default router;

/* ------------------------------------------------- */

// user.js

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).send('GET: /posts');
});

export default router;
```

이렇게 만들어 두고 `app.js`에 import를 해온다. `app.js`에서는 큰 그림을 볼 수 있고  
`router` 안에서 필요한 것들을 처리해줘서 깔끔✨

```js
// app.js

import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(8080);
```

## useful internal middlewares

```js
// 1.
app.use(express.json()); // REST API ⟶ Parse body

// 2.
app.use(express.urlencoded({ extended: false })); // HTML Form ⟶ Body

// 3. 서버에 있는 static한 리소스를 받을 때 사용, 해당경로의 폴더에 있는 리소스를 사용자가 읽어갈 수 있게 한다

// 브라우저에서 localhost:8080/image.jpg, localhost:8080/index.html 로 접속하여
// public폴더 안의 모든 리소스에 접근할 수 있다

// 3-1. public 폴더가 동일한 경로에 있을 때
app.use(express.static('public'));
app.use(express.static('public', options)); //  option이 있는 경우

// 3-2. 보통 node 앱을 실행할 때는 프로젝트 상위 루트 경로에서 실행하므로 아래와 같이 설정해서 쓴다
app.use(express.static('.', options));

// * 만약 public 폴더가 app.js보다 하위에 있는 폴더라면?
const __dirname = new URL('.', import.meta.url).pathname; // ES module에서 __dirname을 사용하기 위한 코드
app.use(express.static(__dirname + 'public')); // 경로지정을 이렇게 해줘야 한다

// 3-3. option을 줘서 header에 추가적인 데이터를 전달할 수 있다
const options = {
  dotfiles: 'ignore', // 숨겨진 파일은 안보이게
  etag: false,
  index: false,
  maxAge: '1d', // 얼마나 오랫동안 캐시가 가능한지
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()); // header에 데이터 추가
  },
};

app.use(express.static(__dirname + 'public', options));
```

## CORS [👀](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

`app.js`에서 express로 8080포트로 연결하고 `index.html`에서는 라이브서버로 실행한다 (5500포트로 연결됨)

```html
<!-- index.html -->
<script>
  fetch('http://localhost:8080/', { method: 'GET' })
    .then(console.log)
    .catch(console.error);
</script>
```

라이브서버 콘솔에서 Access to fetch has been blocked by CORS policy:  
No 'Access-Control-Allow-Origin' header is present on the requested resource.  
If an opaque response serves your needs, set the request's mode to 'no-cors'  
to fetch the resource with CORS disabled.  
라고 경고알림이 뜬다

### CORS policy

`CORS`, Cross-origin Resource Sharing

클라이언트와 서버가 동일한 IP주소 (= 동일한 서버)에서 동작하고 있다면 별다른 제약없이 리소스를 주고 받으며 공유할 수 있다  
만약 클라이언트가 서버와 다른 IP에 있다면 원칙적으로는 그 어떤 데이터도 주고 받을 수 없다  
=> 데이터를 주고 받으려면?

서버에서 클라이언트에게 반응을 보낼 때 `Access-Control-Allow-Origin`을 header에 추가해주면 클라이언트에서 데이터를 볼 수 있다  
`setHeader`를 통해 `Access-Control-Allow-Origin`를 header에 전달하고 어떤 메소드들을 보여줄 수 있는지 설정할 수 있다

```js
// app.js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  next();
});
```

그런데 이렇게 일일히 작성하지 않아도 되는 미들웨어가 있다! `npm i cors`설치  
import하고 `app.use`로 등록만 하면된다

```js
import cors from 'cors';

app.use(cors());
// Access-Control-Allow-Origin: *
// 어떤 도메인에서 요청이 와도 서버의 응답을 다 표기할 수 있다는 뜻이므로
// 우리가 배포한 클라이언트에서만 데이터를 보여줄 수 있도록 설정하는 게 좋다

app.use(
  cors({
    origin: ['http://127.0.0.1:5500'], //   여기서만 cors policy 허용
  })
);

// 그 외에 다른 옵션들도 추가할 수 있다
app.use(
  cors({
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus: 200, // 200으로 자동으로 응답
    credentials: true, // header에 토큰이나 사용자의 정보 추가하기를 허용
    // Access-Control-Allow-Credentials: true, 와 동일한 코드
  })
);
```

## useful external middlewares

`npm i cookie-parser morgan helmet` 설치

`body`를 보려면 `app.use(express.json())`을 등록해야한다

```js
app.use(express.json()); // 이렇게 express.json을 미들웨어에 등록해야 req.body의 내용을 볼 수 있다

app.get('/', (req, res) => {
  console.log(req.body); // express.json()을 하지 않으면 undefined
  res.send('Welcome!!');
});
```

#### cookie-parser [👀](http://expressjs.com/en/resources/middleware/cookie-parser.html)

마찬가지로 cookieParser를 미들웨어에 등록하지않고 `req.cookies`을 콘솔에 출력하면 undefined가 나온다

```js
import cookieParser from 'cookie-parser';

app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies); // it will be undefined without cookie-parser
  //                           콘솔: { yummy_cookie: 'choco', tasty_cookie: 'banana' }
  console.log(req.cookies.yummy_cookie); // choco 가 뜬다
  res.send('Welcome!');
});
```

포스트맨에서 `Headers` 탭에 가서 `KEY`에 Cookie, `VALUE`에 yummy_cookie=choco; tasty_cookie=banana라고 적고  
send를 클릭하면 콘솔에 VALUE로 지정한 값이 출력된다

#### [morgan](https://github.com/expressjs/morgan) [👀](http://expressjs.com/en/resources/middleware/morgan.html)

사용자에게 요청을 받을 때마다 어떤 요청을 받았는지, 얼마나 걸렸는지 등의 정보를 로그로 남겨준다

```js
import morgan from 'morgan';
app.use(morgan('combined')); // 어떤 포맷으로 로그를 남길 건지 설정 _ 디폴트는 combined, 이 외에 common, tiny...사이트에서 옵션 확인해봐~
```

#### helmet [👀](https://github.com/helmetjs/helmet)

공통적으로 보안에 필요한 header를 추가해준다

```js
import helmet from 'helmet';

app.use(helmet());
```
