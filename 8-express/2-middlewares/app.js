import express from 'express';
const app = express();

app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});

app.use('/sky', (req, res, next) => {
  console.log('use');
  next();
});

app.get('/', (req, res, next) => {
  console.log('first');
  if (true) {
    return res.send('Hello');
  }
  res.send('Bye');
});

// 여러가지 인자를 전달하면 array 형태로 처리가 된다
app.get(
  '/',
  (req, res, next) => {
    // 꼭 하나로 끝나야 함
    // next();
    // next('router');
    // next(new Error('error'));
    // res.send('message');
    res.send('<h1>Index</h1>');
  },
  (req, res, next) => {
    return next();
    res.send('<h1>page</h1>');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});

// 알 수 없는 경로 처리
app.use((req, res, next) => {
  res.status(404).send('Not available! 😔');
});

// 에러 처리
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry, try later!');
});

app.listen(8080);
