console.log('code1');
console.time('timeout 0');
setTimeout(() => {
  console.timeEnd('timeout 0'); // 출력해보면 setTimeout을 0초로 설정해도 0초가 걸리는건 아니다 because 콜스택이 텅텅 빌 때까지 기다려야 하므로~
  console.log('setTimeout 0');
}, 0);

// console.log('code2');
// setImmediate(() => {
//   console.log('setImmediate');
// });

// console.log('code3');
// process.nextTick(() => {
//   console.log('process.nextTick');
// });

/**
주석 처리한 거 살려서 실행하면
code1
code2
code3
process.nextTick
setTimeout 0
setImmediate
의 순서로 출력된다
 */
