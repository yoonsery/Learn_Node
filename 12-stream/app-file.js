const fs = require('fs');

// 💩 사용하고 있는 메모리의 상태를 저장 - 파일을 다 읽고 그 데이터를 새로운 파일 2에 저장 - 실제로 메모리사용에 얼마나 큰 변화가 있는지, 차이를 MB로 출력

const beforeMem = process.memoryUsage().rss;
fs.readFile('./file.txt', (_, data) => {
  fs.writeFile('./file2.txt', data, () => {});
  // calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
});

// 만약 file의 크기가 내 메모리 용량보다 크다면 -> 불가능
// So, 위의 방식은 비효율적이다 -> stream을 사용하면 buffer별로 조금씩 데이터를 처리한다
