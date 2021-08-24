const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./file.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./file4.zip');
const piping = readStream
  .pipe(zlibStream) //    파일을 읽어와서 압축하고 파일을 생성
  .pipe(writeStream);
piping.on('finish', () => {
  console.log('done!');
});

const http = require('http');
const server = http.createServer((req, res) => {
  /**
   * 💩
    fs.readFile('file.txt', (err, data) => {
    res.end(data);
    });
   */
  const stream = fs.createReadStream('./file.txt');
  stream.pipe(res); //     stream 자체를 pipe로 연결해준다
});
server.listen(3000); //    localhost:3000 서버 실행된다
