import express from 'express';
const app = express();

// 여러가지 인자를 전달하면 array 형태로 처리가 된다
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    res.send('Hello');
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry, try later!');
});
app.listen(8080);
