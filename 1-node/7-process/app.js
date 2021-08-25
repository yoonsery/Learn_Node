const process = require('process');

console.log(process.execPath);
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.env);
console.log(process.uptime());
console.log(process.cwd());
console.log(process.cpuUsage());

setTimeout(() => {
  console.log('setTimeout');
}, 0);

process.nextTick(() => {
  console.log('nextTick');
});
// nextTick: 지금 말고 현재 수행되고 있는 코드가 다 완료된 다음 이 콜백함수를 task queue에 넣어줘
/*
* nextTick은 task queue에 이미 다른 콜백함수가 들어 있더라도 (여기선 setTimeout)
순서를 무시하고 nextTick의 콜백함수를 태스크큐 제일 앞에 넣어준다   */

for (let i = 0; i < 100; i++) {
  console.log('for loop');
}
