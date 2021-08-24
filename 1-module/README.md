## 노드란 무엇이고 어떻게 공부?

95년 JS도입. 브라우저에 자바스크립트 엔진을 도입

Node.js is an open-source, cross-platform, back-end JS runtime  
environment that runs on the V8 engine and executes JavaScript code  
outside a web browser.

Backend & Server | Front-end | Scripting & Automation

## 노드를 배우면 좋은 점 | Why node?

1. JS everywhere | Easy entry into backend developement  
   백엔드, 프론트엔드의 통일된 언어로 생산성 향상

2. 50% of the developers use Node.js

3. Big corporates use Node.js

   - big community
   - proven production quality
   - tooling

4. Easy, Simple yet Powerful and flexible

   - Easy learning curve
   - Great productivity
   - Good performance

5. Strong community
   - numerous libraries via npm
   - reusable templates

## Node characteristics | 노드의 중요 4가지 특징

1. JavaScript Runtime
2. Single Thread
3. Non-Blocking I/O
4. Event-Driven

### - JavaScript Runtime

- 자바스크립트 엔진은 c++로 작성됨
- 오픈소스
- high performance

### - Single Thread

- 운영체제에서 프로그램을 동시에 실행하면 각각 프로그램마다 프로세스가 할당 된다 ( 프로세스 ≑ 프로그램)
- 컴퓨터가 빠르가 각 프로세스마다 시간을 할당하여 병렬적으로 처리하는 것처럼 보임

  - 각각의 프로세스 안은 `code | stack | heap | data`
  - `code`: 프로그램에 대한 코드
  - `stack`: 프로그램안에서 함수의 실행 순서를 기억
  - `heap`: 동적으로 생긴 데이터를 보관
  - `data`: 전역변수 등을 보관

- 프로그램 안에서 필요한 자원들 = resource
- 프로세스 안에는 여러가지 Thread가 존재함 (기능마다 개별적 쓰레드가 있다)  
  ⟶ 프로세스를 여러개 동시에 실행하는 것처럼, 한 프로세스 안에서도 여러가지 쓰레드를 동시다발적으로 실행할 수 있다
- Thread를 일꾼이라고 생각하면 된다, 쓰레드가 많을수록 좋을까? NOPE!
  - 메모리 사용량 증가할 수 있다 (쓰레드가 동작하기위해 필요한 정보들을 개별적으로 만들어야 함)
  - 여러가지 쓰레드를 스케줄링하고 순차적으로 기회를 줘야하는 비용발생
- `Multithreading` : 한 프로그램 안에서 여러가지 쓰레드를 쓰는 것 ( JAVA \_ cuncurrency API)

JavaScript는 동기적인 프로그래밍 언어, single thread 인데 어떻게 high performance?  
⟶ Non-Blocking I/O, Event-Driven 이 두가지 특징때문에!

### - Non-Blocking I/O

`I/O` : input / output  
컴퓨터 내에서 하드웨어(`files | database | network`)적으로 읽고 쓰는 행동들을 I/O라고 함

**I/O vs CPU**  
CPU: Central Processing Unit (두뇌), 계산하고 연산  
I/O: 직접 쓰고 읽기

`Blocking` : synchronous, 동기적인  
`Non-Blocking` : asynchronous, 비동기적인  
콜백을 던져주고 기다리지 않고 다음으로 넘어간다

### - Event-Driven

콜백을 던져주고 나서 파일이 다 읽혀지는 이벤트가 발생하면 콜백호출 (이벤트를 통해 콜백 호출)

## 노드의 동작방식 | 내부 구조 살펴보기

node.js 소스코드를 동작하게 하면

- node.js Application 형태로 동작
- 어플리케이션 내부에는 `heap`, `call stack` 이 있다
- 스택에서 setTimeout이 호출되었다면 non-blocking이므로 정해진 시간에 콜백을 수행해달라고 하고 스택에 있는 다음 함수로 넘어감
- 정해진 시간이 되면 `task queue`라는 대기줄에 콜백함수를 넣어준다
- `event loop`가 콜스택이 비어있을때까지 기다렸다가 콜스택이 비어있으면 task queue의 콜백함수를 콜스택으로 가져옴

Node APIs (node.js runtime 환경은) multi Thread 이므로 알아서 병렬적으로 처리

Node.js는 Main Single Thread에서 동작한다  
우리의 어플리케이션과 전달하는 콜백함수의 코드는 가벼운 일들만 처리해야한다

Don't block the event loop, keep it running and avoid anything  
that could block the thread-like synchronous network calls or infinite loops

- node.js는 I/O 관련된 일에는 👍 (because of non-blocking & event-driven)
- But CPU에서는 node.js는 적합하지 않다 이미지나, 비디오 처리는 무거움  
  (But! 12 이후 버전부터 `worker threads`라는 스레드를 만들 수 있는 API를 활용할 수 있다)

## 노드 서버의 특징

Traditional Server

- cloud나 하나의 서버 또는 여러개의 서버를 두고 데이터를 공유하기도 함
- 멀티스레드 환경이기 때문에 thread pool이 있다 - 한 서버에서 만들 수 있는 스레드의 갯수는 제한적
- 요청마다 각각의 스레드를 할당함
  - 한번에 처리할 수 있는 갯수 이상의 요청이 들어오면, 처리할 수 있는 스레드가 생길 때까지 기다렸다가 쓰레드 풀에서 대기하고 있는 스레드가 있으면 처리

Node.js Server

- 요청이 들어오면 하나의 스레드가 받은 다음 해야하는 일을 뒤에 있는 아이들에게 던짐
- 하나의 스레드가 요청을 받아서 요청이 완료될 때까지 기다리는 게 아니라 필요한 일을 처리할 수 있는 데이터베이스나 네트워크에게 위임하면서 여러가지 요청을 빠르게 처리

## REPL

Read Eval Print Loop  
정보를 받아서 연산하고 프린트하고 이것을 반복

터미널에서 `node` 입력하면 노트 실행된다  
console.log, function, 변수 입력 등등 실행할 수 있음  
나오려면 `Ctrl + c`

## 노드파일로 실행해보기

폴더 1-node/main.js 생성  
`cd 1-node` 로 해당 폴더에 들어가서 node main.js 또는 node main 실행

## 노드 모듈 챕터 소개

[노드 공식사이트 API](https://nodejs.org/dist/latest-v14.x/docs/api/)  
[노드 입문자를 위한 심플한 사이트](https://nodejs.dev/learn)

## 글로벌 오브젝트

브라우저에서는 window가 global객체  
node.js에서는 global이 golbal 객체

## 콘솔 로그 활용 방법

```js
console.log('debugging..🐛'); // 개발에만 사용 배포 Nope
console.clear();
console.info('info'); // 정보
console.warn('warn'); // 경보
console.error('error'); // 에러, 사용자 or 시스템 에러

console.assert(2 === 3, 'not same!'); // 첫번째 인자가 false 일때 2번째 인자를 출력
console.table(obj);
console.dir(obj, { depth: 2 }); // 2번째 인자 옵션을 줄 수 있다
console.time('label'); // 성능확인에 유용
console.timeEnd('label');
console.count('label'); // 함수내에 작성해서 해당 함수가 몇번 호출 되었는지
console.countReset('label');
console.trace(); // 함수내에 작성해서 이 함수가 어디서 호출되었는지
```

## this | 브라우저와의 차이점

- 함수내부에서는 global
- 클래스에서는 클래스 자신
- global scope에서는 module.exports

## module ( export, require )

#### node에서 module 사용

node 시스템에서 자체적으로 만든 exports, require 기능  
2015년 JS es6 버전이후부터는 자바스크립트 언어 자체에서 모듈 지원함

#### JavaScript module 사용

터미널에서 해당 폴더에 들어가서 `npm init --yes` 실행 후  
package.json 에서 "main" 다음 라인에 `"type": "module",`를 추가 해 준다  
그리고 counter.js에 돌아와서 내보내고 싶은 함수 앞에 `export` 작성  
사용하는 파일에서는 require를 사용하지 않고 `import { 함수명, 함수명2 } from '경로/파일.확장자'` 작성해준다

만약 모듈에서 함수들을 일일이 import 해오기 싫다면  
`import * as counter from './counter.js';`  
이렇게 counter.js에 있는 모든 함수들을 `counter`라는 이름 아래에 하나의 오브젝트로 묶어서 가져올 수 있다  
`counter.increase();`  
`counter.getCount();`  
이렇게 counter.으로 접근해서 사용 가능함

## os(운영체제) 정보 & process(프로세스) 정보

process.nestTick()

```js
setTimeout(() => {
  console.log('setTimeout');
}, 0);

process.nextTick(() => {
  console.log('nextTick');
});
```

둘다 콜백함수를 task queue에 넣어주는데 nextTick은 우선순위를 무시하고  
task queue의 제일 앞에 콜백함수를 넣어준다 그래서 실행하면 setTimeout의 콜백보다 먼저 실행된다

## timer와 call stack

```js
console.log('code1');
console.time('timeout 0');
setTimeout(() => {
  console.timeEnd('timeout 0');
  console.log('setTimeout 0');
}, 0);
```

출력해보면 setTimeout을 0초로 설정해도 콜스택이 텅텅 빌 때까지 기다려야 하므로 시간이 걸린다

## path

node.js는 컴퓨터 위에서 동작하기 때문에 파일 시스템에 접근하기 편하다

```js
console.log(__dirname);
console.log(__filename);

console.log(path.sep);
console.log(path.delimiter);

path.basename(__filename); //   print file.text
path.basename(__filename, '.js'); //   print extension only (like .txt)

path.dirname(__filename);
path.extname(__filename); //  print extension only
path.parse(__filename); //    전체 경로를 분리해서 obj형태로 출력
path.format(parsed); //  obj를 기존의 string 형태로 출력

path.isAbsolute(__dirname); //    절대경로인지 t/f로 판별
path.isAbsolute('../');
path.normalize('ridiculus///path');
path.join(__dirname, 'image'); // make new 'image' directory
```

## file

API는 3가지 형태로 제공되는데

1. `rename(...., callback(err, data))` : 비동기로 실행되거나
2. `renameSync(...)` : 동기적으로 실행, 콜백함수 전달 안함, 에러나면 끝
3. `promises.rename().then().catch(err)` : 프로미스

동기적으로 실행되는 renameSync는 왠만하면 사용하지마 🚫

`const fs = require('fs').promises;`로 받아와서

- fs.readFile()
- fs.writeFile()
- fs.appendFile()
- fs.copyFile()
- fs.mkdir()
- fs.readdir()

를 실행할 수 있다 자세한 건 [여기로 👀](https://github.com/yoonsery/study_node/blob/main/10-file/app2.js)

## Buffer & Stream

`buffer` : 데이터를 한 위치에서 다른 위치로 이동하는 동안 데이터를 임시로 보관하는 데 사용되는 메모리 영역  
`stream` : 시간이 지남에 따라 사용 가능한 데이터 요소의 시퀀스

만약 동영상을 보는 상황이라면 동영상 전체를 다운 받아야하므로 시간이 걸리고 받는 동안 볼 수 없음

- `streaming`: 서버에서 데이터를 잘게 나눠서 조금씩 보내주는 것 => Progressive Download
- 사용자가 동영상을 보는 속도 < 조금씩 데이터를 다운 받는 속도 => Buffering을 채워놓을 수 있다
- 사용자가 동영상을 보는 속도 > 조금씩 데이터를 다운 받는 속도 => 영상이 끊기고..버퍼링에 걸렸다

`buffer and Stream` are

- Memory efficiency
- Time efficiency

## Buffer

Fixed-size chunk of memory | array of integers, byte of data

[여기서 👀](https://github.com/yoonsery/study_node/blob/main/11-buffer/app.js)

## Stream

**read**  
`fs.createReadStream('경로', { 옵션 })`  
createReadStream은 두번째 인자로 `highWaterMark`, `encoding` 등을 받을 수 있다  
highWaterMark는 stream이 한번에 처리할 수 있는 buffer size를 결정한다  
명시하지 않을 경우 기본적으로 64 kbytes가 설정되어 있다

createReadStream의 API인 `on` 이나 `once`는 this를 리턴하므로  
chaining을 할 수 있다

**write**  
만약 `fs.createWriteStream('경로');`에 on으로 API 추가해서 finish 되었을 때 이벤트를 처리하는 콜백을 사용하려면  
`.end();` 으로 finish 되었다고 명시해줘야 한다  
`.write('text');` 으로 text를 파일에 쓸 수 있다

**pipe**

## Event

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
```

- `emitter.on('이벤트명', callback)` 으로 임의로 이벤트를 만들고 콜백으로 어떤 일을 수행시킬 수 있다
- `emitter.emit('이벤트명', ...args)` 로 이벤트를 발생시키고, 전달하고자하는 데이터를(args, 객체나 배열도 가능) 연결해줄 수 있다
  - emitter에 원하는 갯수만큼 콜백함수 등록할 수 있다
- `emitter.removeListener('이벤트명', callback)` 해당 이벤트와 해당하는 콜백을 중지
- `emitter.removeAllListener()` 모든 이벤트에 등록된 콜백함수를 제거

🚨 `EventEmitter`는 한번 객체를 만들면 그 객체내에서 발생하는 이벤트에 한해서 들을 수 있다  
여러가지 EventEmitter 객체를 만들면 다른 emitter에서 발생하는 이벤트는 다른 emitter에서 들을 수 없다  
그래서 exports할 때 Class로 만들어서 다른곳에서도 사용할 수 있게 만듦
