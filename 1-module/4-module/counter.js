let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

module.exports.getCount = getCount;
module.exports.increase = increase;
// exports.increase = increase;  // 로 해도 똑같은거 아니야?  - Nope
// 처음엔 exports가 module을 가리키고 있기 때문에 같을 수 있음
console.log(module.exports === exports); // true

// 그러나 exports는 module.exports를 참고하는 (참조값을 가지는) 아이다
exports = {}; // 만약 이렇게 exports에 다른 값을 할당해버리면
console.log(module.exports === exports); // false  module.exports와 exports는 전혀 다른 것이 된다
console.log(module);
