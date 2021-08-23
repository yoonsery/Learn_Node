//  Fixed-size chunk of memory
//  array of integers, byte of data

const fs = require('fs'); //  ⌘ 클릭으로 정의된 곳으로 이동하기 위해 넣은 코드

const buf = Buffer.from('Hi'); //   48 69 가 나오는데 이건 Hi의 유니코드
console.log(buf);
console.log(buf.length);
console.log(buf[0]); // 72,  배열로 접근하면 ASCII 코드로 출력
console.log(buf[1]); // 105
console.log(buf.toString());
// toString은 parameter에 인코딩을 옵션으로 전달할 수 있다, 디폴트로 utf-8가 전달된다

// create
const buf2 = Buffer.alloc(2);
// size가 2개인 buffer를 만듦, 사용가능한 메모리를 찾아서 공간을 확보하고 초기화한다

const buf3 = Buffer.allocUnsafe(2); // 기존의 다른 데이터가 있으나 사용되지 않는 메모리라면 공간을 확보하지만 초기화하지 않음,  fast

buf2[0] = 72;
buf2[1] = 105;
buf2.copy(buf3);

console.log(buf2);
console.log(buf2.toString());
console.log(buf3.toString());

// concat  | buffer를 모을 수도 있다
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString());
