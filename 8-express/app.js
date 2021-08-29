import express from 'express';
const app = express();

app.get('/', (req, res, next) => {
  console.log('get');
  res.send('hi'); // 항상 클라이언트에게 데이터를 보내줘야 함 otherwise 로딩스피너 계속 돌아가~
});

app.listen(8080);
