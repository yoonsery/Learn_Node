import { increase, getCount } from './counter.js';
/*
import * as counter from './counter.js';
모듈에서 함수들을 일일이 import 해오기 싫다면 이렇게 counter.js에 있는 모든 함수들을 counter라는 이름 아래에 하나의 오브젝트로 묶어서 가져올 수 있다
counter.increase();
counter.getCount();  이렇게 counter.으로 접근해서 사용 가능함
*/

increase();
increase();
increase();
console.log(getCount());
