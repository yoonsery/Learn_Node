console.log('debugging...'); // ⌘ + 클릭
console.clear(); // 이전의 콘솔창의 로그 다 지워짐

// log level
console.log('log'); // 개발
console.info('info'); // 정보
console.warn('warn'); // 경보
console.error('error'); // 에러, 사용자 에러, 시스템 에러

// 브라우저에서 ⬆️ 출력하면 심각한지에 따라 색깔이 다르게 출력된다
// 레벨별로 콘솔에 출력할 건지 파일에 저장할 건지 컨트롤할 수 있게 개발할 때부터 레벨별로 다르게 콘솔을 이용할 것

// assert
// 첫번째 인자로 전달한 값이 true가 아닐 때만 로그로 출력
console.assert(2 === 3, 'not same!');
console.assert(2 === 2, 'same!');

// print object
const student = { name: 'sery', age: 22, company: { name: '👩🏻‍💻' } };
console.log(student);
console.table(student); // table형태로 보기 편하게 출력
console.dir(student); // 2번째 인자로 옵션을 줄 수 있다
console.dir(student, { showHidden: true, colors: false, depth: 2 });

// measuring time  | 성능확인에 유용
console.time('for loop');
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd('for loop');

// counting  | 함수가 예상한 횟수만큼 호출이 되었는지, 몇 번 호출되었는지 궁금할 때 사용
function foo() {
  console.count('foo function');
}

foo();
foo();
console.countReset('foo function'); // count 초기화
foo();

// trace
function f1() {
  f2();
}
function f2() {
  f3();
}
function f3() {
  console.log('f3');
  console.trace(); // 이 함수가 어떻게 호출이 되었는지? 누가 호출했는지 알고싶을 때 사용
}
f1();
