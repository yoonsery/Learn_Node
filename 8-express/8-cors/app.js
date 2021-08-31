import express from 'express';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: ['http://127.0.0.1:5500'], //  여기서만 cors policy 허용
    optionsSuccessStatus: 200, // 자동으로 응답
    credentials: true, // header에 토큰이나 사용자의 정보 추가하기를 허용
    // Access-Control-Allow-Credentials: true, 와 동일한 코드
  })
);
// app.use(cors()); // Access-Control-Allow-Origin: *
// 어떤 도메인에서 요청이 와도 서버의 응답을 다 표기할 수 있다는 뜻이므로
// 우리가 배포한 클라이언트에서만 데이터를 보여줄 수 있도록 설정하는 게 좋다

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, DELETE'
//   );
//   next();
// });

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(8080);
