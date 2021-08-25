const fs = require('fs');

/**
 *  모든 API는 3가지 형태로 제공된다
 * 1. rename(...., callback(err, data))  : 비동기로 실행
 * 2. renameSync(....)  Blocking, callback 함수 전달 X, 동기적으로 수행되므로 되도록 사용하지마
 *    따로 err를 전달하지 않으므로 항상 try, catch로 감싸줘야 한다
 *    try { renameSync(...) } catch(e) { }
 * 3. promises.rename().then().catch(0)
 */

// 만약 존재하지 않는 파일의 이름을 변경하려고 하면 에러 발생함 -> try, catch로 감싸줘야함

try {
  fs.renameSync('./text.txt', './text-new.txt'); // 파일경로가 './'이므로 node/10-file 폴더에 들어와서 node실행해야 에러가 나지않음
} catch (error) {
  console.error(error);
}

fs.rename('./text-new.txt', './text.txt', (error) => {
  console.log(error); // 비동기라서 아래 콘솔로그가 먼저 찍히고 에러가 없었으므로 null 출력
});

// 👆🏻 콜백함수 전달하는게 지저분해서 싫다면?
fs.promises
  .rename('./text.txt', './text-new.txt') //
  .then(() => console.log('Done'))
  .catch(console.error);

console.log('Can you see this message?');
