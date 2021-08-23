const fs = require('fs').promises;

// reading a file
fs.readFile('./text-new.txt', 'utf8')
  .then((data) => console.log(data))
  .catch(console.error);

// 2번째 인자로 'utf8'을 쓰지 않으면 파일에 들어 있던 `Hello! 🦁` 를 Buffer 형태로 출력함

// writing a file

// 1. 기존 파일에 덮어쓰기
fs.writeFile('./text-new.txt', 'ROARRRR 😮 ') //
  .catch(console.error); // void 타입이라서 리턴값이 없으므로 then은 사용하지 않아도 되지만 에러캐치는 해주기

// 2. 기존 파일에 내용 추가하기 & Copy
fs.appendFile('./text-new.txt', 'Hello! 🦁') //
  .then(() => {
    fs.copyFile('./text-new.txt', './file.txt') //
      .catch(console.error);
    // 비동기적으로 처리되므로 순서가 보장되지 않는다 그래서 지금 이 파일의 코드 흐름에서 아래처럼 따로 처리하면 빈파일이 생성됨. 기존파일에 내용이 추가되기 전에 카피 되어버려서..)
  })
  .catch(console.error);

// copy
fs.copyFile('./text-new.txt', './file.txt') //
  .catch(console.error);

// folder
fs.mkdir('sub-folder') //  폴더를 만듦
  .catch(console.error);

fs.readdir('./') // 현재 경로에 있는 모든 파일, 폴더들의 이름을 읽어옴
  .then(console.log)
  .catch(console.error);
