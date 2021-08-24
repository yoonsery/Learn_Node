const fs = require('fs');

const data = []; //    1️⃣ data라는 빈 배열 만들고 highWaterMark, encoding은 주석처리하고 실시하자~)
// on API는 this, 자기자신을 리턴하므로 chaining이 가능하다
fs.createReadStream('./file.txt', {
  highWaterMark: 8, //   default: 64 kbytes
  // stream이 한번에 처리할 수 있는 buffer size를 결정,
  encoding: 'utf-8',
})
  .once('data', (chunk) => {
    // once는 딱 한번만 처리해준다
    // console.log(chunk);
    console.count('data');
    data.push(chunk); //  2️⃣ 빈 data 배열에 받아온 데이터chunk를 넣어주고
  })
  .on('end', () => {
    console.log(data.join('')); //  3️⃣ 배열을 join으로 묶어준다
  })
  .on('error', (error) => {
    console.log(error);
  });
