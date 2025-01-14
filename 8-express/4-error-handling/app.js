import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

app.get('/file1', (req, res) => {
  // 1. 비동기함수에서 에러는 해당하는 콜백내에서 처리
  // fs.readFile('/file1.txt', (err, data) => {
  //   if (err) {
  //     res.status(404).send('File not found!!');
  //   }
  // });

  // 2. 동기적인 함수에서는 try, catch로 에러처리 || 마지막 에러처리 미들웨어에서 포착
  try {
    const data = fs.readFileSync('/file1.txt');
  } catch (error) {
    res.status(404).send('File not found');
  }
});

// Promise에서 에러처리  - 1. catch로 처리, 2. next로 처리 (이 경우는 에러처리 미들웨어이서 받음)

// 1. catch
app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch((error) => {
      res.sendStatus(404);
    });
});
// 2. next
app.get('/file2', (req, res, next) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch(next);
  // .catch((error) => next(error)); ⬆️ 전달받은 인자 = 호출하는 인자 : 생략가능
});

// Async에서 에러 발생시 - try, catch로 잡는다 (await이 동기적으로 발생하게 하므로)

app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt'); // await 이 코드 자체는 동기적이나, 에러를 안전망 에러처리 미들웨어에 포착되지 않음
  } catch {
    res.status(404).send('Please find the file');
  }
});

// 버전 5 이하에서는: require('express-async-errors');

// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
