const EventEmitter = require('events');
const emitter = new EventEmitter();
const callback1 = (args) => {
  console.log('first callback - ', args);
};

emitter.on('sery', callback1);
// sery라는 이벤트가 발생하면 어떤 일을 할 건지 정의, 지금은 callback1을 실행함

emitter.on('sery', (args) => {
  // emitter에 원하는 갯수만큼 콜백함수 등록할 수 있다
  console.log('second callback - ', args);
});

// 이벤트를 발생시킴, 전달하고자하는 데이터를 연결해줄 수 있다
emitter.emit('sery', { message: 1 });
emitter.emit('sery', { message: 2 });
emitter.removeListener('sery', callback1);
emitter.removeAllListeners(); // 모든 이벤트에 등록된 콜백함수 제거
emitter.emit('sery', { message: 3 });

/**
 * EventEmitter 는 node.js 자체적으로도 사용할 수 있고
 * if you want you, EventEmitter를 만들어서 이벤트에 관심있는 콜백함수를
 * 등록해놓고 특정한 이벤트를 시킬 수도 있다
 *
 * 등록한 콜백함수를 중지할 수도 있다 -> 변수로 따로 빼줘서 처리 (이름을 알아야 중지하니까~)
 */
