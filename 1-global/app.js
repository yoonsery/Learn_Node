const fs = require('fs');
// vscode에게 브라우저용인 아닌 node module인 걸 알려주기 위해 node모듈중 하나를 import 해옴

console.log(global); // global을 ⌘키와 함께 클릭하면 정의된 곳으로 뿅~

// 정의된 곳에서 Global 한번 더 ⌘ + 클릭하면 또 정의된 곳으로 간다
// 노란색 큰 글씨는 클래스 | 파란글씨는 함수 | 하얀색은 정의된 멤버변수(속성)

global.hello = () => {
  console.log('hello'); // 사실 global.console.log('hello'); 동일
};

global.hello();
hello(); // global은 생략 가능
