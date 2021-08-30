import express from 'express';

const __dirname = new URL('.', import.meta.url).pathname;

const app = express();

// express.json() -> REST API, body parse
// app.use(express.urlencoded({ extended: false }));  -> HTML form
// express.static

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/posts', (req, res) => {
  console.log(req.body);
  res.status(201).send('Thanks, Created');
});

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
app.listen(8080);
