import express from 'express';
import fsAsync from 'fs/promises';
// require('express-async-errors'); Express 5 이전 버전에서는 이렇게, CommonJS module에서 사용
import {} from 'express-async-errors';

const app = express();

app.get('/', (req, res, next) => {
  return fsAsync.readFile('/file2.txt').catch(next); // 프로미스를 '리턴'하는 경우에만 마지막 에러처리 미들웨어에서 감지한다!
  // async 미들웨어는 자동으로 프로미스를 리턴하기 때문에 따로 리턴할 필요 없다
});

// Express 5 이후 버전은 라이브러리 설치없이 👇🏻 이렇게 하면 된다
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
  next();
});

//github.com/expressjs/express/issues/2259#issuecomment-433586394
//github.com/blakeembrey/async-middleware

app.listen(8080);
