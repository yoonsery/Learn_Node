## Node

<details>
<summary>1. Node</summary>

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

를 실행할 수 있다 자세한 건 [여기로 👀](https://github.com/yoonsery/study_node/blob/main/1-node/10-file/app2.js)

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

[여기서 👀](https://github.com/yoonsery/study_node/blob/main/1-node/11-buffer/app.js)

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

</details>

<details>
<summary>2. npm</summary>

## NPM | Node Package Manager

- numerous libraries
- reuaable templates
  노드에서 외부 라이브러리를 사용할 때, 프로젝트를 관리할 수 있는 npm에 대해 배우기

소스코드와 package.json만 공유하면 나중에 npm install을 이용해서 별도의 라이브러리 파일을 받아 올 수 있다  
node module을 포함하지 않아도 된다

- `npm` : 특정한 라이브러리를 다운로드 받아서 설치하는 개념
- `npx` : 라이브러리를 pc에 저장하지 않고 바로 실행할 수 있게 함, executing packages
- `yarn` : Package Manager, built on top of npm to resolve some of npm's shortcomings

[NPM 명령어](https://docs.npmjs.com/cli/v7/commands)

- 터미널에서 `npm` 입력하면 사용할 수 있는 명령어와 옵션에 대해 알려줌
- `npm init --yes` : 기본적인 정보가 다 기입된 상태로 json이 만들어진다
- `npm init` : 순차적으로 정보를 입력할 수 있다
  - `entry point` : 어떤 파일이 이 라이브러리(프로젝트)의 시작점인지
  - `keywords` : npm에 라이브러리 형태로 제공하고 싶을 때 어떤 키워드로 검색하면 되는지 (배포하지 않을거면 크게 신경 X)
  - 나중에 `package.json`에서 수정할 수 있다

pakage.json에서 `script`에 명령어를 지정할 수 있다  
`"start": "node app"` 저장하고 터미널에서 `npm start` 하면 자동으로 app.js가 실행된다  
`"sery": :node app"` 이처럼 "sery"라고 임의의 명령어를 만들 수 있다  
대신 터미널에서 `npm run sery`라고 실행해야 한다

## 버전관리

- 1.0.0 : Major | Minor | Patch 로 구분
  - `patch` : 버그, 사소한 오류 업데이트
  - `minor` : 중간에 작은 기능 추가
  - `major` : 다른 기능이 대거 수정 ・ 추가 | 무턱대고 업뎃했다가 컴파일 에러가 날 수도 있으므로 유의

[About semantic versioning](https://docs.npmjs.com/about-semantic-versioning)  
[semver calculator](https://semver.npmjs.com/)

## 글로벌로 설치하고 목록확인

- `npm i -h` : 설치시 사용 가능한 옵션을 보여줌,
- `npm i -g 라이브러리` : 글로벌 옵션으로 컴퓨터 전체에 설치할 수 있다
- `npm list` : list 의 alias 인 `ll`도 사용 가능, `npm ll -g` 는 글로벌적으로 설치된 리스트 확인 가능
- `npm ll -g --dept=0` : 다른 라이브러리가 설치한 라이브러리는 보지 않기

npm 설치시 권한 이슈 나오면

```shell
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

[참고링크](https://stackoverflow.com/questions/47252451/permission-denied-when-installing-npm-modules-in-osx/47252840)

## 프로젝트 라이브러리 확인, 설치 및 삭제

#### 설치

`npm i 라이브러리명` 설치하면 node_modules 폴더가 생성되고 그 안에 해당 라이브러리 폴더가 생김 (i 또는 install로 설치)  
`package-lock.json` 정확하게 어떤 버전을 이용해서 프로젝트를 했는지 기억하기 위해, 정확히 어떤 버전을 사용했는지 명시되어 있음  
`package-lock.json` 은 직접 수정할 일이 절대 없다~

#### 제거

`npm un 라이브러리명` : `un` 또는 `uninstall`로 제거

#### 업데이트

`npm view 라이브러리명` 로 버전 확인 할 수 있지만 dependencies가 많아 일일이 확인하기 힘들다면?  
`npm outdated`  
`npm update (라이브러리명)` : 뒤에 특정 라이브러리를 명시하면 그것만 업데이트

## 개발에 유용한 툴 | 개발모드로 설치하기

개발시 유용한 nodemon은 배포할 제품에 포함하면 안되는 모듈이므로 `npm i nodemon --save-dev`로 설치  
package.json을 보면 `devDependecies`에 설치된 거 확인 가능

</details>

<details>
<summary>3. debug</summary>

## [Debugging](https://github.com/yoonsery/self-taught/blob/main/%EB%93%9C%EC%BD%94_%EC%9C%A0%ED%8A%AD%EC%98%81%EC%83%81/debugging.md)

디버깅에서 중요한 것은? 🧐 defining the problem

- 예상하는 | 원하는 문제나 목표를 정확하게 정의
- 지금 실제로 일어나고 있는 일은 무엇인지 & 현재 어떤 순서로 | 어떻게 이슈(버그)가 발생하고 있는지

이 둘의 차이(gap)를 메꿔나가는 과정이 디버깅

버그 뿐만 아니라 `UX / UI`, `logic / flow`, `performance`, `costs` - 서버, 네트워크, 메모리 비용 포함

gap을 줄이기 위해 디버깅 뿐만 아니라

- unit testing
- integration testing
- control flow analysis
- log file analysis / print logs
- interactive debugging 👈🏻
- memory dumps (메모리 사용량 확인)
- profiling (CPU나 여러가지 성능을 프로파일링)

vscode 에서 run & debug탭에서 디버깅을 할 수 있다

화면의 왼쪽 variables에는 local, global 변수 확인 가능  
watch에서는 + 아이콘 이용해서 관심있는 단어나 문장을 검색해서 확인가능  
콜스택에서 함수실행 순서 확인

debugger는 variables에서 실시간으로 값을 변경하면서 확인해볼 수 있다  
예) for loop에서 i에 특정값을 바꿔볼 수 있다 - watch에서 확인

브레이크 포인트 오른쪽 마우스 ⟶ `edit Breakpoint` 클릭  
특정한 조건을 만족할 때만 브레이크 포인트가 동작할 수 있도록 설정 가능

- 예) `Expression`을 선택하고 `i === 5`, 이렇게 조건문을 작성하면 이 조건에 해당될 때만 브레이크 포인트에 걸린다
  - `Hit Count`를 선택하면 몇번 호출되었을 때 멈출 것인지 선택
  - `Log message`: 어떤 로그메시지를 이용할 건지 선택

</details>

<details>
<summary>4. How to create a script for sorting files</summary>

## 파일정리 스크립트 만들기

### 계획

1.  사용자가 원하는 폴더의 이름을 받아온다
2.  그 폴더 안에 video, captured, duplicated 폴더를 만든다
3.  폴더안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, IMG_1234 (IMG_E1234) 2의 폴더로 옮긴다

#### [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv)

The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched.

#### `path.join`

```js
path.join('/Users', 'sery', 'home/sweet', 'room');
// return: '/Users/sery/home/sweet/room'
```

#### `fs.existsSync(path)`

Returns true if the path exists, false otherwise

#### `String.prototype.startWith('word')`

The startsWith() method determines whether a string begins with the characters of a specified string, returning true or false as appropriate.

#### `fs.promises.rename(oldPath, newPath)`

The fs.rename() method is used to asynchronously rename a file at the given old path to a given new path. It will overwrite the destination file if it already exists.

</details>

<details>
<summary>5. HTTP</summary>

## HTTP

- ~~Hypertext~~ Hypermedia Transfer Protocol
- request ⇄ response protocol

  - 브라우저 클라이언트가 특정한 url에 접속하면, 서버는 해당하는 url에 맞는 html 문서를 보내준다
  - 클라이언트가 특정한 url을 이용해 json을 요구하면, 서버는 그에 맞는 json이라는 데이터 타입을 클라이언트에게 보내준다

### HTTPS

Hypermedia Transfer Protocol **Secure**

- TLS \_Transport Layer Security
- SSL \_Secure Sockets Layer

암호화된 안전한 방식으로 데이터를 주고 받는다  
`서로 보안 관계가 형성된` 클라이언트와 서버끼리 데이터를 안전하게 주고 받으면서 데이터를 해독해서 볼 수 있다  
보안 관계가 형성되지 않은 제 3자는 볼 수 없다

## HTTP의 역사와 V2, V3

- HTTP v1 (HTTP | HTTPS) : text-based, uncompressed headers, one file at a time, `inefficient`
- HTTP v2 (HTTPS) : binary based protocol, header compression, multiplexing, stream prioritization, `efficient` / `secure`
- HTTP v3 (HTTPS) : 기존의 `TCP` (Transmission Control Protocol) 에서 `UDP` (User Datagram Protocol)로

## HTTPS 통신 과정

- client - server 통신을 할 때 HTTP를 사용하면,
- TCP connection이 생긴다 서로 커넥션을 연결한 다음에
- 클라이언트가 서버에게 `request`를 요청한다
  - 어떤 행동을 하길 원하는지 - `request method`
  - 서버에서 어떤 문서에, 어떤 경로에 있는 데이터를 받기를 원하는지 - `URL`
  - header를 포함해서 다양한 정보들을 요청
- 서버는 클라이언트에서 받은 요청에 해당하는 내용을 `response`로 클라이언트에게 보내준다
  - 성공 | 실패 여부를 나타내는 status 코드를 함께 묶어서 보낸다
  - HTTP v2에서는 HTML뿐만아니라 관련된 여러가지 파일들(css, js...)을 동시에 보낼 수 있다
- 서버에서 응답을 보내고 더이상 보낼 데이터가 없다면, TCP connection이 닫혀서 종료가 된다

### [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

처리된 결과의 정보를 내포하고 있다

- **`1xx` : informational**
  - `100` : continue
  - `102` : processing
- **`2xx` : successful**
  - `200` : OK
  - `201` : created
  - `204` : no content
- **`3xx` : redirection**
  - `301` : moved permanently
  - `302` : found
  - `303` : see other (get 요청에서만 응답)
  - `307` : temporary redirect (same methods)
  - `308` : permanent redirect (same methods)
- **`4xx` : client error**
  - `400` : bad request
  - `401` : unauthorized
  - `403` : forbidden (admin)
  - `404` : not found
  - `405` : method not allowed
  - `409` : conflict
- **`5xx` : server error**
  - `500` : internal server error
  - `502` : bad gateway
  - `503` : service unavailable

## Request Method

#### URL : Uniform Resource Locator

서버에 요청할 때 어떤 리소스를 원하는지, URL을 사용해서 특정한 리소스의 경로에 대해서 나타내야 한다  
리소스가 어디에 있는지 고유한 값을 나타내는 주소 같은 것  
URL은 다양한 프로토콜에서 사용할 수 있다

- `https` : protocol (어떤 프로토콜인지)
- `www.server.com` : hostname (어떤 서버에 접속하는지 명시)
- `:443 port` : 주로 생략, 그 서버에 있는 어떤 어플리케이션에, 어떤 포트에 접속 할건지
- `/index.html` : path 어떤 경로에 접속할 건지

예) `https://www.server.com/courses/backend/search?q=coding` 이라면,  
protocol + hostname + pathname + query (`?q=coding`이 해당)

`URL`은 클라이언트가 서버 특정한 위치에 있는 리소스에 접근하기 위해서, `서버에 있는 무엇을 원하는지`를 나타낸다  
이 때 함께 사용하는 `Request Methods`는 그 리소스를 이용해서, `어떤 액션을 원하는지` 명시한다

#### [Request Methods의 종류](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

- **GET** : get
- **POST** : create
- **PUT** : replace (idempotent: yes)
- **DELETE** : delete
- **PATCH** : replace partially (idempotent: no)
- **HEAD** : get without body
- **OPTIONS** : all supported methods for URL
- **TRACE** : echoes the received request

`POST` : 201 (created), 401,3,4,9 로 응답할 수 있다 항상 200일 필요 없다, 상황에 맞게 적절한 status code를 보내면 된다  
`PUT | DELETE | PATCH` : 200, 204(no content), 403,4,5  
`HEAD | OPTIONS | TRACE` : 200, 401,3,4,5

- 서버에 있는 리소스를 읽기만 하는 요청 (서버에 있는 데이터를 변경하지 않음) : **GET | HEAD | OPTIONS | TRACE**
- 서버에 있는 데이터를 변경하는 요청 : **POST | PUT | DELETE | PATCH**

각 메소드마다 `safe`, `idempotent`, `cacheable` 을 눈여겨 보기  
`Idempotent` : 동일한 요청을 여러번 했을 때 (몇 번 했냐에 상관없이) 항상 서버를 동일한 상태로 유지할 수 있는지를 나타냄  
멱등성\_ 동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때 해당 HTTP가 멱등성을 가졌다고 한다

## HTTP Headers

#### HTTP의 특징

- **Stateless Protocol** : 각각의 요청은 서로 연관이 없다
- **Sessions & Cookies** : 쿠키-브라우저에서 보관하고 있는 저장소
  - 서버에서 보내주는 header에 auth token이 포함된 쿠키가 들어 있으면, 브라우저가 자동으로 쿠키에 저장한다 (로그인을 위해 클라이언트가 따로 해야할 일은 없음)
  - 다음 리퀘스트를 요청할 때 header에 똑같은 쿠키를 넣어서 서버에게 보냄
  - 이 외에도 서버에서 클라이언트에 정보를 줄 때, header에 cache-control을 명시할 수도 있다 - 브라우저가 데이트를 저장소에 저장해둠
  - 클라이언트가 동일한 요청을 하면 서버에 또다시 요청하지 않고 저장된 데이터를 재활용한다
  - `UA`\_User-Agent: 요청하는 클라이언트가 누구인지 알고 싶을 때 사용 (browser, os에 대한 정보가 들어있다)

#### [Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

- `Standard` : 표준화가 된 `Authorization` 사용
- `Custom` : `domain-key`, `domain.key`형태로 사용

### Standard Headers

정해진 표준안에 따라서 브라우저가 구현되었기 때문에, 브라우저가 우리가 원하는 대로 동작하길 원한다면 표준안을 따라야한다

#### Request Context

`User-Agent`: Mozilla/5.0 (\<system-information\>) \<platform\> (\<platform-details\>) \<extensions\>

#### Authorization

#### Message body information

- `Content-Length` : 컨텐츠의 사이즈 정보 bytes
- `Content-Type` : text/html | application/json
  - `Content-Language` : en

#### Caching

`Cache-Control` : 얼마나 오랫동안 이 데이터를 캐시(저장)해야하는지 명시

---

개발자 툴 - network - `⌘ + shift + r` 해서 강제 리프레시 - Header 탭에서 확인

</details>

<details>
<summary>6. Node Server</summary>

## HTTP

### http 모듈을 이용해서 node로 server만들기

http2는 https와 함께 적용된다 그래서 개발하는 단계에서 복잡할 수 있으므로  
배울 땐 http로 하고 나중에 배포할 땐 http2로 변경할거야

```js
const http = require('http');
const http2 = require('http2');

console.log(http.STATUS_CODES);
console.log(http.METHODS);
```

#### 서버 만들기

```js
const server = http.createServer((req, res) => {
  console.log('incoming...');
  console.log(req.headers); //     request 정보들을 로그로 찍어봄
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  // 서버에서 특정한 시간이 지나도록 계속 반응을 해주지 않으면 타임아웃 에러가 발생한다
  // 그걸 방지하기 위해 두번째 인자 response로 반응을 해주면 된다
  res.write('Hello!');
  res.end();
});

server.listen(8080); // localhost:8080, 어떤 포트를 통해 들을 건지 설정
```

#### text 주고받기

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.write('Hello!');
  } else if (url === '/course') {
    res.write('course');
  } else {
    res.write('not found');
  }
  res.end();
});
```

#### html 주고 받기

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>HOME SWEET HOME</title></head>');
    res.write('<body><h1>Welcome!</h1></body>');
    res.write('</html>');
    // 이렇게 일일히 작성하기 번거로우니까 fs.createReadStream을 이용하자!
    // 1st 인자로 오는👇 경로는 현재 터미널에서 명령어를 실행하는 경로를 기준으로 작성해야 한다
  } else if (url === '/course') {
    res.setHeader('Content-Type', 'text/html'); // <- 중복되는 코드라서 if문 밖으로 빼놓으면 된다
    fs.createReadStream('./6-node-server/html/course.html').pipe(res);
  } else {
    fs.createReadStream('./6-node-server/html/not-found.html').pipe(res);
  }
  // pipe는 비동기적인 함수라서 piping이 되고 있는 중간에 다음코드로 넘어가 res.end를 호출하게 되면서 파이핑이 멈춰버린다
  // 그러므로 pipe를 쓸때는 자동으로 end()처리가 되므로 따로 호출하지 않아도 된다
});
```

## 템플릿 엔진 EJS 사용해보기 (server side rendering)

정적인 HTML을 이용하면 클라이언트가 언제 요청을 해도 서버가 항상 고정된 문서를 보내줄 수 있다

`Templating Engines`을 이용하면 레이아웃의 뼈대, template만 구성해놓고 클라이언트가 요청했을 때  
서버가 가지고 있는 data에 맞게 페이지를 동적으로 만들어서 클라이언트에게 보내줄 수 있다  
(템플릿 엔진에는 ejs, pug 등등 많은 엔진이 존재함)

#### EJS

`<%= data %>` - 데이터의 값을 바로 받아올 때는 `=`를 넣어주고  
`<% JavaScript %>` - 자바스크립트 문법일 경우에는 `=` 없이 사용

⚠️ 문제점  
html 파일만 제공하는 서버로, 브라우저 클라이언트 외에 다른 클라이언트는 사용할 수 없다

## JSON 보내주기

```js
const server = http.createServer((req, res) => {
  const url = req.url; //  what?
  const method = req.method; //  how?, action?
  if (url === '/kitchen') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(foods));
    } else if (method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      req.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const food = JSON.parse(bodyStr);
        foods.push(food);
        console.log(food);
        res.writeHead(201);
        res.end();
      });
    }
  }
});
```

POST확인은 포스트맨에서 새로운 요청을 만들어서  
`POST` 동작선택 후, `URL 주소`를 넣어주고 (http://localhost:8080/kitchen)  
`Body` 탭에 `raw`선택 후 type을 `JSON`으로 선택한다  
본문에 `{ "naem": "tea" }` 로(쌍따옴표를 사용해야한다) 작성하고 `send`클릭  
그럼 아랫부분에 status code로 201을 받았다고 뜨는 걸 확인할 수 있다  
메모리에 추가가 되었기 때문에 브라우저 새로고침으로 확인하거나 포스트맨에서 `GET` 동작 선택 후 send키로 확인 가능하다

### 순수 node.js 로 만든 HTTP 서버

- 작성해야하는 코드의 양이 너무 많다
- 작성한 데이터는 메모리에 보관이 되므로 서버가 중지 ∙ 재시작 하면 사용자의 정보가 다 날아간다
- 어떤 URL을 제공해야 하는지?

- 코드를 간편 ∙ 깔끔하게 작성하기 위해서 프레임워크 **express**를 사용한다
- **database**를 이용해 사용자의 데이터를 영구적으로 보관할 수 있도록 한다
- **Rest APIs**를 통해 API를 어떻게 디자인하면 좋은지 알아보자

</details>

<details>
<summary>7. RESTful API</summary>

# RESTful API

## REST란 ?

**API** - application programming interface으로  
어플리케이션만을 지칭하는 것 뿐만 아니라, 사용자들이 쉽게 쓸 수 있는 interface(+ 함수들)을 뜻함  
서버 입장에서의 API란, 클라이언트가 사용할 수 있는 URL

**REST** - Representational State Transfer  
Software Architectural Style  
Web Service Guidelines

Architectural Styles and Design of `Network-based` Software Architectures

### 6 Guiding constrains of RESTful System

#### 1. Client-server architecture

서버는 브라우저나 모바일 외에도 다양한 어플리케이션 형태의 클라이언트에게 데이터를 제공할 수 있는 아키텍처를 유지해야 한다

#### 2. Statelessness

state가 없는 상태를 유지해야 한다. 하나의 요청이 다른 요청과 연결되지 않는 상태로 서버가 디자인되어야 한다 - HTTP 프로토콜에서 적용

#### 3. Cacheability

캐시가 가능하다면 캐시를 할 수 있게 디자인해야한다 - HTTP 프로토콜에서 적용

#### 4. Layered System

서버의 갯수나 게이트서버의 여부와 상관없이 (= 서버의 구조와 상관없이), 서버에서 제공된 공통된 API 하나로 클라이언트가 사용할 수 있어야 함

#### 5. code on demand

optional guide line, 클라이언트가 원한다면 클라이언트에서 수행해야되는 코드를 서버에서 클라이언트에게 보내줄 수 있다

#### 6. Uniform interface

⭐️ fundamental to the design of any RESTful system

- Resource Identification in requests
  - 클라이언트 요청에서 서버에 있는 어떤 리소스(or 도메인 데이터)를 원하는지 식별할 수 있어야 한다
  - 서버에서 어떤 형태로 데이터가 저장되어 있든지간에 클라이언트가 이해할 수 있는 포맷(html | json)으로 데이터를 보내줘야 한다
- Resource manipulation through representations
  - 서버로부터 받은 state | data를 통해서 해당 리소스에 대해서 앞으로 어떻게 처리할 수 있는지에 대한 모든 정보를 알 수 있어야 한다  
    (수정이나 삭제를 원한다면 어떤식으로 요청을 해야하는지 알 수 있어야 한다)  
    ↑ 단순히 URL을 어떻게 디자인하는지를 넘어 외적인 부분을 더 포함하고 있는 걸 알 수 있다
- Self-descriptive messages
  - 서버에서 보내는 응답데이터 안에는 클라이언트가 이 데이터를 어떻게 처리해야하는지 반드시 설명이 있어야 한다 (예\_ html header에 content-type을 지정해주는 것)
- Hypermedia as the engine of application state - HATEOAS
  - hypermedia를 어플리케이션 엔진처럼 제공해야한다
  - 서버에서 url이 있다면, 클라이언트가 서버에 어떤 url이 있는지 알아야 하고, 적절한 url로 요청해야한다 잘못된 url로 요청하면 404 Not found를 받게된다
  - 클라이언트가 서버에게 특정 url에 관련된 걸 하고 싶다고 요청을 하면
  - 서버에서 해당 url로 할 수 있는 모든 액션들에 대해서 - 어떤 url을 이용해 서버에 요청할 수 있는지, 링크된 url을 응답으로 보내준다
  - 클라이언트는 서버로부터 받은 리스트를 이용해서 어떻게 서버를 이용하면 되는지 정보를 얻는다
  - hypermedia를 제공하는 서버는 사실 많지 않다

## Designing APIs

Web APIs를 디자인 할 때 서버에 있는 특정한 데이터를 클라이언트가 읽거나, 새로 만들거나, 업데이트, 삭제하는 기본적인 동작을 지원해주면 된다  
파일 시스템의 데이터를 조작하는 기본적인 행동을 `CRUD`라고 한다 - Create | Read | Update | Delete

4가지 동작을 HTTP 메소드와 비유하자면  
Create - POST | Read - GET | Update - PUT | Delete - DELETE  
어떤 동작을 할 건지, 서버에 있는 `어떤` 데이터 | 아이템 | 도메인에 액션을 할지 정의할 수 있다

- `GET` /posts/~~get~~Posts ❌, GET 메소드가 이미 어떤 행동을 할지 알려줌 url에는 get말고 what-무엇을 할건지 나타내야 한다 ⟶ `GET` /posts ⭕️
- `GET` /posts/~~create~~Post ❌, ⟶ `POST` /posts ⭕️
- `GET` /posts/1/tags : what이 명확하지 않다, tag를 가지고 오고 싶다면 ⟶ `GET` /tags/?postId=1
- API는 `무엇`을 원하는지 제일 관심있는 도메인을 먼저 적은 다음에 http request method를 이용해서 어떤 액션을 하고 싶은지 나타낼 수 있다

## Rest APIs 사례

- YouTube API, - 일반적인 API형태
  - (서버에서 연관된 데이터들을 그룹짓는) 도메인 별로 정리되어 있다 - [👀](https://developers.google.com/youtube/v3/docs/videos/list)
- Github - 진정한 Rest API의 사례
  - 역시 도메인별로 나눠져 있다, 요청한 도메인에 관련된 모든 정보들의 링크를 response에 포함해서 보내줌 - [👀](https://developer.github.com/v3/)

</details>

<details>
<summary>8. express</summary>

## Express

**WHY**  
사용자가 많아 검증된 프레임워크, 가볍고 심플하고 유연함

### Express의 특징

#### 사용법

```js
// Express.js

const express = require('express')
const app = express()

app.get('/posts', function (req, res, next) {
  res.send(...)
})

app.post('/posts', function (req, res, next) {
  res.send(...)
})

app.put('/posts/:id', function (req, res, next) {
  res.send(...)
})

app.delete('/posts/:id', function (req, res, next) {
  res.send(...)
})

app.listen(8080)
```

```js
app.get('/posts', function (req, res next) {
  // get 자리에  post, put, delete, all, use 상황에 맞는 함수를 사용하면 된다
  // 첫번째 인자자리에는 URL/Path 정의, 어떤 인자를 처리할 건지 정의
  // 두번째 인자에 callback함수 등록, req, res, next 3개의 인자를 받음
  // 이 콜백함수를 middleware라고 한다
  res.send(...)
})
```

▶️ Express는 middleware의(콜백함수) 연속이다

① `app.use` : `use`는 get, post등 모든 리퀘스트를 처리하는 함수 `* json`로 모든 path를 처리하는 미들웨어 하나 만들고  
② `app.use` : `* headers`, 모든 경로에 대해서 header에 대해서 처리하는 미들웨어 만들고  
③ `app.get` : `/`, root경로에 해당하는 것을 처리하는 미들웨어 만들고  
④ `app.get` : `/posts`라는 미들웨어 만듦  
⑤ `app.use` : `(error)` 라는 미들웨어를 만들어서 각각의 미들웨어들을 체이닝해서 연결해주는 것이 express

- 사용자가 GET 메소드를 이용해서 root 경로에 request가 접수가 되면
  - ①에서는 json을 parsing한 다음 next()를 호출해서 다음 미들웨어로 넘어감
  - ② header에 대한 적절한 처리를 하고 next()로 다음 미들웨어 호출
  - ③ 에서는 리퀘스트가 들어온 GET 메소드와 경로가 동일하기 때문에 여기서 해당하는 리소스를 준비해서 사용자에게 response해준다 `res.send()`
  - ✨ 이렇게 response에 한번 반응을 하면, 그 뒤에있는 미들웨어에게는 넘어가지 않는다
  - 앞에 있던 모든 미들웨어에 해당이 안되면 제일 마지막에 등록된 미들웨어가 호출되고 마지막 미들웨어에서 에러를 던지거나 response를 응답한다

## 서버 만들기

`npm init --yes`, `npm i express`  
`package.json`에서 `"start": "nodemon app"`, `"type": "module"` 추가  
`npm i nodemon --save-dev`로 개발자 모드에서 노드몬이 필요하다는 걸 명시해준다 - 다른 개발자와 프로젝트를 공유했을 때 nodemon이 없을 경우를 대비해서

IP - 서버가 네트워크상에 어디있는지 알 수 있다  
Port - 그 서버의 어떤 어플리케이션에 접속하길 원하는지 나타냄

[공식사이트](https://expressjs.com/en/4x/api.html)

```js
app.all(); //  모든 메소드 처리

app.disable(); // 어플에서 설정을 끄고, 켤 때 사용
app.enable();

// Request
req.baseUrl;
req.body;
req.cookies;
req.ip;
req.method;
req.params;
req.query;

// Response
res.append(); // header에 data 추가
res.cookie(); // 쿠키설정
res.json(); // json데이터를 사용자에게 보낼 수 있다
res.redirect();
res.send();
```

```js
app.get('/', (req, res, next) => {
  console.log('get');
  res.send('hi'); // 항상 클라이언트에게 데이터를 보내줘야 함 otherwise 로딩스피너 계속 돌아가~
});
```

## Request

```js
app.get('/sky/:id', (req, res, next) => {
  // console.log(req.path);
  // console.log(req.headers);

  //  localhost:8080/sky/ona/ 에서 리프레시하면
  console.log(req.params); //      { id: 'ona' }
  console.log(req.params.id); //    ona

  // localhost:8080/sky/ona/?keyword=handball 에 가서 리프레시 하면
  console.log(req.query); //         { keyword: 'handball' }
  console.log(req.query.keyword); //   handball

  res.send('hi');
});
```

## Response [👀](https://github.com/yoonsery/study_node/blob/main/8-express/1-start/app.js)

```js
app.get('/sky/:id', (req, res, next) => {
  res.setHeader('key', 'value'); // header에 특정한 것을 설정해야 할 때 사용, key-value 형태로 전달

  res.json({ name: 'bolbol' }); // object도 전달이 된다
  res.sendStatus(400); // data 없이 status code만 보낼 수 있다 >> Bad Request 가 뜸
  res.status(201).send('created'); // 개별적으로 status code를 보내고 메시지를 보내줄 수도 있다
});
```

## feature of middleware [👀](https://github.com/yoonsery/study_node/blob/main/8-express/2-middlewares/app.js)

실행하면 콘솔에 first만 찍힌다 why? - 첫번째 콜백에서 res를 하거나 next를 호출해서 다음으로 연결해줘야 한다

```js
// 여러가지 인자를 전달하면 array 형태로 처리가 된다
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});
```

첫번째 콜백에서 `next()`를 실행해주면 두번째 등록한 미들웨어까지 호출이 된다 - console에 first, first2만 찍힘

```js
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    next();
  },
  (req, res, next) => {
    console.log('first2');
    // next();  를 실행해주면 first, first2, second 가 찍힌다
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});
```

현재 경로에 함께 등록된 배열을 무시하고 다음 미들웨어로 넘어가게 할 수 있다

```js
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    next('route'); // first, second 가 찍힘 first2는 넘어가버린다~
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});
```

error도 던질 수 있는데 별도의 처리를 하지 않으면 error가 사용자에게 그대로 전달되어버린다  
그래서 항상 어플리케이션 마지막에 `app.use((error, req, res, next))`를 사용해서 에러처리를 해줘야 한다

```js
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    next(new Error('error'));
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
});

// 처리할 수 없는 경로에 대한 응답
// 아무것도 처리되지 않고 여기까지 왔다는 건 그 누구도 이 요청에 대한 응답을 하지 않았다는 뜻
app.use((req, res, next) => {
  res.status(404).send('Not available! 😔');
});

// 에러메시지 처리
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry, try later!');
});

app.listen(8080);
```

#### `app.all()`과 `app.use()` 차이점

```js
app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});
// GET, POST...어떤 http method로 보내든 항상 콜백이 수행이 된다
// 하지만 localhost:8080/api/doc 처럼 api 안에있는 다른 경로에 접속하면 콜백이 실행되지 않음
// 해당 경로에 한해서만, http의 모든 리퀘스트가 수행이 된다

app.use('/sky', (req, res, next) => {
  console.log('use');
  next();
});
// 해당경로를 포함하면 뒤에 어떤 경로를 추가 하더라도 콜백이 실행된다
// 만약 all에서도 사용하고 싶다면 app.all('/api/*', ...)로 명확하게 명시를 해주면 된다
```

#### `if문`을 사용할 때 주의할 점

```js
app.get('/', (req, res, next) => {
  console.log('first');
  if (true) {
    // res.send('Hello');  //  error: Cannot set headers after they are sent to the client
    return res.send('Hello'); // return을 붙여서 함수가 끝나도록 처리해야한다
  }
  res.send('Bye');
});
```

## Post

포스트맨에 POST, body, raw, json 선택하고 내용을 넣고 send 하면 콘솔에 undefined가 뜬다  
`app.use(express.json())` 사용하면 콘솔에 undefined가 아닌 포스트맨으로 POST한 내용이 뜬다

```js
import express from 'express';
const app = express();

app.use(express.json()); // 요청이 들어오는 body 부분을 자동으로 parsing해서 보여준다
app.post('/', (req, res, next) => {
  console.log(req.body);
});
app.listen(8080);
```

## Error handling [👀](https://github.com/yoonsery/study_node/blob/main/8-express/4-error-handling/app.js)

- 클라이언트가 요청한 request를 제대로 처리하지 못했다면, 클라이언트에게 적절한 에러메시지를 보내서 에러에 대한 충분한 내용을 전달해야함
- 시스템 내부적으로 큰 문제가 발생하더라도 서버가 죽지 않도록, 문제상황에서 빠르게 복귀될 수 있도록 예외처리를 잘 할 것

각각의 미들웨어에서 처리할 수 있는 에러는 가능한 한 많이 잘 해둬야한다 그래야 상황에 맞는 적절한 에러메시지를 클라이언트에게 보낼 수 있다

#### 1. 동기적인 함수에서 에러가 발생할 때

```js
app.get('/file1', (req, res) => {
  const data = fs.readFileSync('/file1.txt'); // ① file1.txt가 없기때문에 에러발생 & readFileSync는 동기처리되므로 바로 에러던짐
});

// code ..
// code ..

// ①에서 던져진 에러는 에러처리하는 미들웨어인 이곳으로 와서 처리됨, ①의 상황에 맞는 구체적인 에러메시지가 아닌 일반적인 에러메시지를 보냄
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});
```

그래서 `동기적인 함수`를 호출하는 경우에는 `try, catch`로 감싸준다

```js
app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
  } catch (error) {
    res.status(404).send('File not found');
  }
});
```

#### 2. 비동기적인 함수에서 에러가 발생한 경우는?

```js
app.get('/file1', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {}); // readFile은 비동기적
});
// 로딩스피너가 계속 돌고, 마지막 일반적 에러처리를 해주는 미들웨어에 도달하지 못함
```

`fs.readFile` 함수호출 자체만으로는 에러가 발생하지 않았고 `콜백함수의 첫번째 인자`로 `에러가 전달`되었기 때문에  
비동기적인 함수는 마지막 안전망인 에러처리 미들웨어에 잡히지 않는다 ❗️ ( 내부로 에러가 전달되었기 때문에 외부에서 포착되지 않음)  
express의 모든 미들웨어의 체인은 동기적으로 연결되어있다 그래서 비동기적인 에러는 잡을 수 없다

그래서 `비동기함수`에서는 아래와 같이 `콜백함수 내에서 에러를 처리`해줘야 한다

```js
app.get('/file1', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});
```

#### error handling in Promise

```js
// 비동기적인 Promise일 경우에는 catch로 에러를 처리하면 된다 (promise - then().catch())
app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch((error) => {
      res.sendStatus(404);
    });
});

// 또는 next로 에러전달 ⟶ 다음 미들웨어로 에러를 던졌기 때문에 마지막 안전망인 에러처리 미들웨어에서 에러를 잡음
app.get('/file2', (req, res, next) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch(next);
  // .catch((error) => next(error)); ⬆️ 전달받은 인자 = 호출하는 인자 : 생략가능
});
```

#### error handling in Async

```js
// async 미들웨어는 프로미스를 호출하므로 에러발생시, 마지막 안전망인 에러처리 미들웨어에는 포착되지 않음
// 하지만  await 코드 자체는 동기적이므로, try 와 catch 로 에러를 처리해줘야 한다

app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt');
  } catch {
    res.sendStatus(404);
  }
});
```

## 비동기 에러 처리하는 방법 - express5 최신버전 [👀](https://github.com/yoonsery/study_node/blob/main/8-express/5-express5/app.js)

catch를 하지않아도 비동기적 코드가 마지막 안전망 에러 미들웨어에 잡힐 수 있는 방법

#### Express5 이전버전

`npm i express-async-errors` 라이브러리를 설치하면 promise도 마지막 안전망인 에러처리 미들웨어에서 잡을 수 있다  
`import {} from 'express-async-errors';`로 import 한다  
단, 미들웨어에서 프로미스를 리턴하는 경우에만! `return fsAsync.readFile('/file.txt')` 이렇게 리턴을 해줘야 한다  
async middleware는 자동으로 프로미스를 리턴한다

#### Express5 이후 버전

따로 라이브러리 설치없이 프로미스에서 리턴해주거나, async를 사용하면 마지막 에러처리 미들웨어에서 에러를 잡아준다  
[github express issue comment](https://github.com/expressjs/express/issues/2259#issuecomment-433586394)  
[Async Middleware](https://github.com/blakeembrey/async-middleware)

## Router

반복되는 코드를 어떻게 해야할까?

```js
// app.js

import express from 'express';

const app = express();

app.use(express.json());

app.get('/posts', (req, res) => {
  res.status(201).send('GET: /posts');
});

app.post('/posts', (req, res) => {
  res.status(201).send('POST: /posts');
});

app.put('/posts/:id', (req, res) => {
  res.status(201).send('PUT: /posts');
});

app.delete('/posts/:id', (req, res) => {
  res.status(201).send('DELETE: /posts');
});

app.listen(8080);
```

경로가 같으면 이렇게 route로 체이닝을 해줄 수 있다

```js
// app.js

app
  .route('/posts')
  .get((req, res, next) => {
    res.status(201).send('GET: /posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

app
  .route('posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });
```

하지만! 복잡한 서버일 경우, 여러가지 경로가 존재하므로 이렇게 `app.js`에서 전부 나열하는 것은

- 가독성이 떨어진다
- module성이 떨어진다
- 유지보수가 어렵다

`app.js`에 아래처럼 코드 작성하고

```js
// app.js

app.use('/posts', postRouter);
app.use('/users', userRouter);

// app.use()에서 경로를 지정해뒀기 때문에
// post.js, user.js에서 경로 일일이 작성하지 않고 '/' 현재경로를 사용하면 된다
```

router 폴더에 `post.js`, `user.js`를 만든다

```js
// post.js

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).send('GET: /posts');
});

router.post('/', (req, res) => {
  res.status(201).send('POST: /posts');
});

router.put('/:id', (req, res) => {
  res.status(201).send('PUT: /posts/:id');
});

router.delete('/:id', (req, res) => {
  res.status(201).send('DELETE: /posts/:id');
});

export default router;

/* ------------------------------------------------- */

// user.js

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).send('GET: /posts');
});

export default router;
```

이렇게 만들어 두고 `app.js`에 import를 해온다. `app.js`에서는 큰 그림을 볼 수 있고  
`router` 안에서 필요한 것들을 처리해줘서 깔끔✨

```js
// app.js

import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(8080);
```

## useful internal middlewares

```js
// 1.
app.use(express.json()); // REST API ⟶ Parse body

// 2.
app.use(express.urlencoded({ extended: false })); // HTML Form ⟶ Body

// 3. 서버에 있는 static한 리소스를 받을 때 사용, 해당경로의 폴더에 있는 리소스를 사용자가 읽어갈 수 있게 한다

// 브라우저에서 localhost:8080/image.jpg, localhost:8080/index.html 로 접속하여
// public폴더 안의 모든 리소스에 접근할 수 있다

// 3-1. public 폴더가 동일한 경로에 있을 때
app.use(express.static('public'));
app.use(express.static('public', options)); //  option이 있는 경우

// 3-2. 보통 node 앱을 실행할 때는 프로젝트 상위 루트 경로에서 실행하므로 아래와 같이 설정해서 쓴다
app.use(express.static('.', options));

// * 만약 public 폴더가 app.js보다 하위에 있는 폴더라면?
const __dirname = new URL('.', import.meta.url).pathname; // ES module에서 __dirname을 사용하기 위한 코드
app.use(express.static(__dirname + 'public')); // 경로지정을 이렇게 해줘야 한다

// 3-3. option을 줘서 header에 추가적인 데이터를 전달할 수 있다
const options = {
  dotfiles: 'ignore', // 숨겨진 파일은 안보이게
  etag: false,
  index: false,
  maxAge: '1d', // 얼마나 오랫동안 캐시가 가능한지
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()); // header에 데이터 추가
  },
};

app.use(express.static(__dirname + 'public', options));
```

## CORS [👀](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

`app.js`에서 express로 8080포트로 연결하고 `index.html`에서는 라이브서버로 실행한다 (5500포트로 연결됨)

```html
<!-- index.html -->
<script>
  fetch('http://localhost:8080/', { method: 'GET' })
    .then(console.log)
    .catch(console.error);
</script>
```

라이브서버 콘솔에서 Access to fetch has been blocked by CORS policy:  
No 'Access-Control-Allow-Origin' header is present on the requested resource.  
If an opaque response serves your needs, set the request's mode to 'no-cors'  
to fetch the resource with CORS disabled.  
라고 경고알림이 뜬다

### CORS policy

`CORS`, Cross-origin Resource Sharing

클라이언트와 서버가 동일한 IP주소 (= 동일한 서버)에서 동작하고 있다면 별다른 제약없이 리소스를 주고 받으며 공유할 수 있다  
만약 클라이언트가 서버와 다른 IP에 있다면 원칙적으로는 그 어떤 데이터도 주고 받을 수 없다  
=> 데이터를 주고 받으려면?

서버에서 클라이언트에게 반응을 보낼 때 `Access-Control-Allow-Origin`을 header에 추가해주면 클라이언트에서 데이터를 볼 수 있다  
`setHeader`를 통해 `Access-Control-Allow-Origin`를 header에 전달하고 어떤 메소드들을 보여줄 수 있는지 설정할 수 있다

```js
// app.js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  next();
});
```

그런데 이렇게 일일히 작성하지 않아도 되는 미들웨어가 있다! `npm i cors`설치  
import하고 `app.use`로 등록만 하면된다

```js
import cors from 'cors';

app.use(cors());
// Access-Control-Allow-Origin: *
// 어떤 도메인에서 요청이 와도 서버의 응답을 다 표기할 수 있다는 뜻이므로
// 우리가 배포한 클라이언트에서만 데이터를 보여줄 수 있도록 설정하는 게 좋다

app.use(
  cors({
    origin: ['http://127.0.0.1:5500'], //   여기서만 cors policy 허용
  })
);

// 그 외에 다른 옵션들도 추가할 수 있다
app.use(
  cors({
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus: 200, // 200으로 자동으로 응답
    credentials: true, // header에 토큰이나 사용자의 정보 추가하기를 허용
    // Access-Control-Allow-Credentials: true, 와 동일한 코드
  })
);
```

## useful external middlewares

`npm i cookie-parser morgan helmet` 설치

`body`를 보려면 `app.use(express.json())`을 등록해야한다

```js
app.use(express.json()); // 이렇게 express.json을 미들웨어에 등록해야 req.body의 내용을 볼 수 있다

app.get('/', (req, res) => {
  console.log(req.body); // express.json()을 하지 않으면 undefined
  res.send('Welcome!!');
});
```

#### cookie-parser [👀](http://expressjs.com/en/resources/middleware/cookie-parser.html)

마찬가지로 cookieParser를 미들웨어에 등록하지않고 `req.cookies`을 콘솔에 출력하면 undefined가 나온다

```js
import cookieParser from 'cookie-parser';

app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies); // it will be undefined without cookie-parser
  //                           콘솔: { yummy_cookie: 'choco', tasty_cookie: 'banana' }
  console.log(req.cookies.yummy_cookie); // choco 가 뜬다
  res.send('Welcome!');
});
```

포스트맨에서 `Headers` 탭에 가서 `KEY`에 Cookie, `VALUE`에 yummy_cookie=choco; tasty_cookie=banana라고 적고  
send를 클릭하면 콘솔에 VALUE로 지정한 값이 출력된다

#### [morgan](https://github.com/expressjs/morgan) [👀](http://expressjs.com/en/resources/middleware/morgan.html)

사용자에게 요청을 받을 때마다 어떤 요청을 받았는지, 얼마나 걸렸는지 등의 정보를 로그로 남겨준다

```js
import morgan from 'morgan';
app.use(morgan('combined')); // 어떤 포맷으로 로그를 남길 건지 설정 _ 디폴트는 combined, 이 외에 common, tiny...사이트에서 옵션 확인해봐~
```

#### helmet [👀](https://github.com/helmetjs/helmet)

공통적으로 보안에 필요한 header를 추가해준다

```js
import helmet from 'helmet';

app.use(helmet());
```

</details>

<details>
<summary>9. MVC</summary>

## MVC 패턴이란?

`Model`, `View`, `Controller`로 프로젝트의 아키텍처를 만드는 것

APP을 기능별로 수직적으로 나누면, 코드가 뒤엉킨다 => 가독성 떨어져서 이해가 힘듦, 유지보수가 어렵고 확장성이 떨어진다

- **Model**
  - app에서 필요한 `data`를 담고 있다
- **Controller**
  - view와 model을 연결하는 비즈니스 `logic`이 들어있다
- **View**
  - 사용자에게 보여지는 UI `display`

View | display => `validates` => Controller | logic => `update` => Model | data  
View | display <= `display` <= Controller | logic <= `read` <= Model | data

MVC 패턴은 server에서도 사용할 수 있다 ( view 가 아니라 route )

</details>

<details>
<summary>10. validation</summary>

## Validation

클라이언트가 서버에게 보내는 특정한 요청이 || 리소스를 만들기 위해서 바디로 보내는 데이터들이  
유효한지 확인하는 과정

서버에서 유효성 검사를 할 때 sooner is better  
클라이언트에서 유효성 검사는 optional

```js
import express from 'express';

const app = express();
app.use(express.json());

app.post('/users', (req, res, next) => {
  console.log(req.body);

  /* vaildate 하려면 아래처럼 일일이 작성해야한다
  if(req.body.email..) {  // 정규표현식 사용...
    res.status(400).send({message: 'email'})
  } else if () {
    // code..
  }
  */
  res.sendStatus(201);
});
app.listen(8080);
```

#### 유효성 검사히기

`npm i express-validator` 를 설치하면 좀 더 깔끔하게 유효성 검사를 할 수 있다  
app.post() 의 handlers는 배열형태로 여러가지를 등록할 수 있다

포스트맨에서 name 값을 2개 이하, 10이상으로 주면 에러메시지를 받게 설정, withMessage()를 사용하면 좀 더 구체적인 에러메시지를 전달할 수 있고, 체이닝이 가능하다

```js
app.post(
  '/users',
  body('name')
    .notEmpty()
    .withMessage('Enter the name, please')
    .isLength({ min: 2, max: 10 })
    .withMessage('more than 2 for name'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    console.log(req.body);
    res.sendStatus(201);
  }
);
```

배열로 묶어줄 수 있다

```js
app.post(
  '/users',
  [  // 배열로 묶기
    body('name').isLength({ min: 2}).withMessage('more than 2 for name'),
    body('age').isInt().withMessage('please enter a number'),
    body('email').isEmail().withMessage('enter an email'),
    body('job.name').notEmpty(),  // object안에 있는 건 .으로 접근하면 된다
  ],
  (req, res, next) => {
```

param에 관련해서 유효성검사를 하고 싶다면

```js
app.get(
  '/:email',
  param('email').isEmail().withMessage('email plz'),
  // param 자리에 check를 쓰면 요청온 모든 영역에 대해 해당하는게 있다면 확인해주지만
  // param이나 body, cookie처럼 검사하고 싶은 걸 좀 더 구체적으로 명시해 주는 게 좋다
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    res.send('💌');
  }
);
```

#### 중복되는 코드 리팩토링

```js
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // 에러가 없다면 다음 미들웨어로 넘어가기
  }
  return res.status(400).json({ message: errors.array() });
  // return res.status(400).json({ message: errors.array()[0].msg }); // 첫번째 에러메시지만 받고 싶다면 이렇게 수정가능
  // 로직을 수정해야할 때 여기에서만 한번 수정하면 되므로 간편!
};

app.post(
  '/users',
  [
    // .. code
    body('job.name').notEmpty(),
    validate, // validate 함수연결
  ],
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  [param('email').isEmail().withMessage('이메일 입력해요'), validate], // validate 함수연결
  (req, res, next) => {
    res.send('💌');
  }
);
```

## Sanitization

공백, 대소문자로 인해 에러가 날 수 있다  
공백은 `trim()`으로 normalization을 해주고, email은 `normalizeEmail()`로 처리, 그 외에도 여러가지 있으니 사이트에서 확인~

```js
app.post(
  '/users',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('more than 2 for name'),
    body('email').isEmail().withMessage('enter an email').normalizeEmail(),
    validate,
  ],
  (req, res, next) => {
```

- server에서 유효성검사를 하는 이유는,

  - 데이터 베이스에서 읽고 쓰기 전에 데이터가 유효한지 검사해서 시간과 비용을 절약할 수 있다
  - (데이터 베이스가 다른 서버나 클라우드에 있다면 네트워크 비용이 발생하므로)
  - sanitization, normalization을 하면서 데이터를 일관성 있게 보관하기 위해서

좀 더 공부하고 싶다면 - Contract Testing: Client ⇌ Server, Proto-base...

</details>

<details>
<summary>11. authentication</summary>

## Authentication

### 인증이란?

- you are who you say you are
- password, pin-code로 인증 `You know` → client
- mobile phone, hardware token `You have`
- fingerprints, signature `You are` → server

http는 stateless protocol 인데 어떻게 AUTH happen?

- 사용자는 id, password를 통해 서버에 가입
- 서버에 사용자에 대한 정보를 저장 (id, pw) 해두면 나중에 사용자의 id, pw로 로그인을 할 수 있다
- 로그인이 성공적으로 되었다면, 다음의 사용자가 다른 리퀘스트를 할 때,  
  서버가 어떻게 이 추가적인 요청을 하는 클라이언트가 로그인된 사용자인지 아닌지 구분하는가? ⟶ 2가지 방법이 있다

### Session & Cookies

#### User Sessions

사용자의 session을 서버에서 보관  
클라이언트가 서버에 로그인 => 서버는 사용자의 DB에 있는 id, pw가 일치하는지 확인  
=> 존재하는, 유효한 사용자라면 세션을 만든다 - 세션에는 userId, sessionId, expiration(세션이 얼마동안 유효한지)이  
=> 이 세션의 정보를 별도의 session이라는 Database에 저장한다 (DB | FileSystem | memory 일 수 있다)  
=> 클라이언트에게 세션과 관련된 정보를 (대체로) 쿠키에 넣어서 보내준다 `HTTP only`라는 옵션을 주면  
=> 해당 쿠키는 브라우저에 의해서만 읽을 수 있다 (JS나 프로그램내에서는 볼 수 없으므로 안전)  
=> 클라이언트가 서버에 다른 요청을 할 때 이 쿠키의 정보(세션 id)를 브라우저가 자동으로 포함해 준다  
=> 클라이언트에서 보내준 session id를 통해서 세션 DB에 존재하는 session id 인지, 만료된 건 아닌지 검토한 다음  
=> 유효하다면 session id를 통해서 사용자가 누구인지 파악해서, 관련된 데이터를 클라이언트에게 보내줄 수 있다

- User Sessions 장점

  - session DB에 세션에 대한 정보를 보관하고 있으므로 신뢰할 수 있다, TRUSTED
  - 쿠키사용으로 서버에서 보내기도 쉽고 클라이언트가 별도 처리할 일 없이 브라우저에서 알아서 해결해서 간단하고 심플함, MAKE IT EASY
  - HTTP Only 옵션을 사용할 경우 안전하고 보안성이 높다
  - 사용자에 대한 정보가 아니라 session Id에 대해서 보내므로 안전성이 높다

- User Sessions 단점
  - Stateful : 서버에서 사용자에 대한 정보를 session에 보관 => 서버에 state가 있다
  - 한 서버에 세션을 보관하고 있으므로 많은 서버들이 세션의 정보를 확인하기 위해서 하나의 서버에 접속해서 네트워크 요청을 해야한다  
    => 클라이언트의 요청을 처리하기 위해서 내부적으로 여러가지 네트워크요청을 해야하므로써 시간이 걸릴 수 있다

### JWT

#### Using JWT

JWT - JSON Web Token, JSON을 이용해 웹 토큰을 주고 받는 것  
JSON이라는 오브젝트 베이스 안에 `Header`, `Payload`, `signature` 3가지로 나눠져있다

- **Header** : 사용하는 알고리즘과 타입에 대해 명시
- **Payload** : 전송하고 주고받고 싶은 다양한 데이터들이 포함 - 인코딩되어서 보안처리됨
- **signature** : 인코딩한 header, payload 뿐만 아니라 이것을 인코딩하기 위해서 사용하는 서버의 비밀키 (= secret)이라는 것을 이용해서  
  함께 인코딩을 해놓음 => 서버에서만 알고있고 서버에서만 사용하는 시크릿과 함께 인코딩한다
  - 사용자가 악의적으로 payload의 정보를 바꾼다면, signature에 있는 정보를 통해서 해당내용의 변경여부를 알 수 있다

secret을 통해서 인코딩을 하므로 정보의 유효성을 확인할 수 있고 안전하다

사용자가 로그인하고 유효한 사용자라면, 사용자의 id와 원하는 정보를 함께 묶어서 JWT를 만든다 (Create JWT) - userId, claims, expiration  
=> JWT를 사용자에게 보내준다 => 추후에 일어나는 요청은 header에 JWT를 포함해서 요청함  
=> 서버에서는 클라이언트에서 받은 JWT를 유효한지, 수정되었는지, 만료되었는지.. 유효성 검사를 하고 (Verify JWT)  
=> 해당하는 데이터를 클라이언트에게 보내준다

- JWT의 장점

  - No State
  - state가 없으므로 서버간의 네트워크 요청을 통한 사용자검증이 필요없다 - secret key 만 가지고 있으면 된다

- JWT의 단점
  - { JWT } : JWT 자체가 단점이 될 수 있다
  - 만약 만료기간이 없는 JWT를 주고 받는다면 - 해커가 JWT를 가져가서 악용할 수 있다

## JWT 사용하기 [👀](https://jwt.io/)

`npm i jsonwebtoken` 설치

```js
const token = jwt.sign(
  //1. payload에는 필수적인 내용들만 담는다
  {
    id: 'userId',
    isAdmin: true, // isAdmin_사용자의 역할에 대해 전달
  },
  // 2. secret key 는 대개 32 character (32byte), pw generator로 임의로 생성..
  '3H5anIHK]%0}3ixU7)s1n$(05jJk)GT5'
);

console.log(token); // 이 값을 복사한 후 공식사이트에_👀 가면 token해독이 가능함
```

decoded 된 내용을 볼 수는 있지만 만약 값을 변경하면 토큰이 변경되고 서버에서 사용자가 토큰을 수정했는지 알 수 있다

```js
// 사이트에서 decoded 된 값을 수정하면 encoded 되었던 토큰이 변경됨 -> 그 값을 edited에 변수로 지정
const edited =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9uYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzA5MDgwNzF9.cTntKlgSCegyI_z9guTjg2R3FnYy7HFf-l7pog81r1o';

jwt.verify(edited, secret, (error, decoded) => {
  console.log(error, decoded);
}); // JsonWebTokenError : invalid signature 라고 에러뜬다

// 변경되지 않은 원래 토큰을 verify하고 decoded를 콘솔로그하면 payload 값을 출력함
const originalKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9uYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzA5MDgwNzF9.9i7SE2uxmsOQLnm35QNJgVJL5JEpFu5d6u3J6LhsbpU';

jwt.verify(originalKey, secret, (error, decoded) => {
  console.log(decoded);
});
```

#### 만료기능 추가

```js
const token = jwt.sign(
  {
    id: 'ona',
    isAdmin: false,
  },
  secret,
  { expiresIn: 2 } // 2초안에 만료
);

// setTimeout으로 3초 뒤에 검증하면 이미 유효기간이 만료되었으므로 에러가 발생함
// TokenExpiredError: jwt expired
setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
  });
}, 3000);
```

## bcrypt

password-hashing function 패스워드 암호화 알고리즘

어떤 알고리즘을 썼는지 알고리즘에 대한 정보 `Alg` - 얼마나 많은 복잡도로 암호화 했는지 암호화에 대한 비용 `Cost` -  
더 랜덤한 것들을 이용해 원하는 길이만큼 암호를 복잡하게 하는 `Salt` - 암호화된 정보 `Hash` 로 구성되어 있다

암호를 hashing만 할 수 있고, hashing 된 결과를 다시 패스워드로 만들 수는 없다 (예\_계란 -> 오믈렛)  
암호화할 때 랜덤한 문자열을 이용해서 (Salt) 암호화를 좀 더 복잡하게 만들 수 있다

`npm view bcrypt` 치면 [깃헙링크](https://github.com/kelektiv/node.bcrypt.js#readme) 볼 수 있다
`npm i bcrypt`로 설치

```js
// 예시는 동기적인 방식인 Sync를 사용하지만 서버에서 구현할 때는 비동기적인 방식으로 하자!
const bcrypt = require('bcrypt');

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10); // 길이가 10개인 salt 설정
console.log(`password: ${password}, hashed: ${hashed}`);

const result = bcrypt.compareSync('abcd1234', hashed);
console.log(result); // true
```

salt의 복잡도가 높아질수록 해시하는데 걸리는 시간이 기하급수적으로 늘어난다  
암호계산은 CPU를 사용하는 것이므로 salt를 지나치게 길게 할 필요없다, 대부분 8, 10 ~ 12로 한다  
[- salt 길이별 성능 측정](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)

---

클론코딩 프로젝트에서는 JWT를 사용해보자

- RESTful API Service as a backend
- Usable by other services (micro-services)
- Easy to scale horizontally (multiple instancess)

</details>

<details>
<summary>12. configuration</summary>

## Configuration

jwt를 검증할 수 있고 사용자의 정보를 해독할 수 있는 secret key는 버전관리툴에 올리지 않고 로컬에 보관한다  
expiration, salt round, port와 관련된 설정값들의 변경이 필요할 때 코드를 수정하고 다시 빌드 후 배포하는 것은 설정성이 떨어진다  
So, 코드를 변경하지 않고도 설정값을 쉽게 변경할 수 있도록 만들어야 한다

[`process.eve`](https://github.com/yoonsery/study_node/blob/main/1-node/7-process/app.js)  
터미널에서 `node` 입력 후, `process.env`를 입력하면 서버가 동작하는 컴퓨터에서 설정된 환경변수에 대한 모든 것을 읽어온다  
`export SERVER_SETTING=hello` 라고 입력하고 다시 node에서 `process.env`해보면 서버세팅 키에 앞에서 작성한 키와 값이 들어가 있다
서버에서 필요한 설정은 컴퓨터에 환경변수 형태로 저장하는 게 좋다 -> 👍 안전 | ☠️ 터미널을 재시작하면 설정해놓은 변수값이 사라짐

#### .env를 사용하자

`npm i dotenv`로 설치하고 접근할 때는 `process.env.변수명` 으로 접근 (변수명은 항상 대문자)

```js
// 사용하기 위해 import후 cofig() 호출해줘야 한다
import dotenv from 'dotenv';
deotenv.config();
```

`process.env.변수명`으로 호출이 가능하지만 서버가 실시간으로 시작을 해야 `env`에 어떤 것이 있는지 접근이 가능하므로

- 1. 코드작성 시 자동완성 힌트를 받을 수 없고 오타를 낼 가능성이 있다
- 2. 꼭 필요한 값인데 env에 정의되어있지 않은 경우, 정의가 되어있는지 여부를 확인할 수 없으며 실시간으로 에러가 날 수 있다

To fix these issue,  
`config.js`를 만들어서 관리한다

```js
// config.js
import dotenv from 'dotenv';
dotenv.config();

// issue 2 해결 | 존재하지 않는 값에 대해 에러처리
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue; // key가 정의되어 있지 않고 디폴트 값도 없다면 value = undefined
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

// issue 1 해결 | 숫자를 사용하는 곳은 parseInt를 써서 숫자로 변환!
export const config = {
  jwt: {
    secretkey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
};

// app.js
import { config } from './config.js';
/* ..code..*/
app.listen(config.host.port);
```

</details>

<details>
<summary>13. socket</summary>

## Socket

기존의 HTTP는 요청-응답으로 이뤄진 프로토콜  
만약 서버에 공지사항이 생겼더라도 클라이언트가 따로 요청하지 않으면, 서버는 클라이언트에게 보낼 수 있는 방법이 없다

#### Web Socket

클라이언트와 서버의 관계가 connection이 형성만 되면  
공지사항이 생기면 서버가 먼저 클라이언트에게 데이터를 보낼 수 있고, 필요할 때마다 데이터를 보낼 수 있다  
클라이언트도 서버에게 데이터를 실시간으로 주고 받을 수 있다

node의 express 라이브러를 사용한 것 처럼 socket도 `socket.io` 라이브러리 사용해보자~
서버 -> `npm i socket.io`  
클라이언트 => `npm i socket.io-client` 설치

server `app.js`에서

```js
import { Server } from 'socket.io';

const server = app.listen(config.host.port); // app.listen을 변수에 할당하고
const socketIO = new Server(server, {
  // socket.id에서 제공하는 Server에 전달한다
  cors: {
    // cors policy 오류때문에 일단 * 모든것을 허용하는 옵션을 전달한다
    origin: '*',
  },
});

socketIO.on('connection', (socket) => {
  console.log('Client is here!');
  socketIO.emit('dwitter', 'Hello 👋🏻');
  // 해당하는 주제, 메시지 전달 | 채팅방 별로 그룹지을 경우 채팅방의 이름 or 해당하는 토픽이 될 수 있다
  // ✍🏻 서버에서 dwitter 라고 설정하고 클라이언트에서 dwitter
});
```

client `index.js`에서

```js
import socket from 'socket.io-client';

const socketIO = socket(baseURL);
socketIO.on('connect_error', (error) => {
  console.log('socket error', error);
});
socketIO.on('dwitter', (message) => console.log(message));
// ✍🏻 서버에서 'dwitter'라고 설정한 값을 클라이언트에서 들을 수 있다
```

`setInterval`을 이용해 1초마다 들을 수도 있다

```js
// server
import { Server } from 'socket.io';

const server = app.listen(config.host.port);
const socketIO = new Server(server, {
  cors: {
    origin: '*',
  },
});

socketIO.on('connection', (socket) => {
  console.log('Client is here!');
});

setInterval(() => {
  socketIO.emit('dwitter', 'Hello 👋🏻');
}, 1000);
```

#### dwitter에서 적용하기

[server] connection 폴더 만들고 Socket class를 만든다 [👀](https://github.com/yoonsery/twitter-clone-coding-server/blob/main/connection/socket.js), [👀](https://github.com/yoonsery/twitter-clone-coding-server/commit/b49349c4179ad124c76f3631c6255ccf3a1c1846)  
[client] network에 `socket.js`파일을 만들고, TweetService class에 socket 추가 [👀](https://github.com/yoonsery/twitter-clone-coding-client/commit/e5f52fc2c5315062f8cb224d35ad9ac8f443e3ce)

간혹 socket 사용시 token을 `auth`가 아니라 `query`를 사용하는 사람이 있는데 (참고: client/network/socket.js)  
query를 사용하면 브라우저에서 token이 보이고 로그에도 남을 수 있다  
-> 강화된 보안을 위해 클라이언트에서 - `auth`, 서버에서 - `socket.handshake.auth.token`을 사용해야한다

</details>

<details>
<summary>14. database</summary>

## Database

- List
  - [Database의 개념과 종류들](#database-의-개념과-종류)
  - [SQL | 관계형 데이터베이스와 쿼리언어](#sql--관계형-데이터베이스와-쿼리언어)
  - [NoSQL | NoSQL 개념과 종류들, 탄생배경](#nosql)
  - [ORM, ODM 은 무엇이고 왜 필요할까, 장단점](#orm--odm)
  - [SQL vs NoSQL | 데이터베이스 개념과 종류들](#sql-vs-nosql)

## Database 의 개념과 종류

컴퓨터 파일시스템에서 관련있는 데이터들끼리 모아놓는 것  
❝ A database is an `organized collection of data`, generally stored and  
accessed electronically from a computer system. ❞

**Flat-File Database** | plain file with rows of records, 일반문서나 엑셀파일도 데이터베이스라 할 수 있다

#### Database Management System (DBMS)

software package to define, create, maintain and control access to the database  
데이터베이스 관리엔진이라고도 불림, 예) ORACLE, MySQL, mongoDB...

- Flat-File Database

  - ✅ Simple data
  - 🚫 Inflexible, Inefficient, Poor performance

- DBMS
  - database 엔진 자체가 데이터를 저장, 검색, 업데이트에 최적화되어있고 복잡한 일을 엔진이 처리
  - ✅ optimised for data storage & retrieval
  - ✅ handle complex data
  - ✅ concurrent access
  - ✅ data security
  - 🚫 complex itself

#### SQL | Structured Query Language

Designed for managing data in relational databases  
RDBMS\_ Relational DBMS, `관계형` 데이터베이스 매니지먼트 시스템

#### NoSQL | SQL이 아닌 모든 데이터베이스 관리시스템

- NoSQL에는 여러종류의 데이터베이스가 있다
  - Key - Value 로 관리하는 데이터베이스
  - Document
  - Wide-column
  - Graph

## SQL | 관계형 데이터베이스와 쿼리언어

SQL Database is an organized collection of one or more `Tables` of `rows` and `columns`  
각 행마다 특정한 데이터 타입을 지정해야 한다 ( id는 number타입, title은 text타입..)  
데이터 타입뿐만 아니라 여러가지 속성을 지정할 수 도 있다, 예) id는 Not null & auto increment 하게

- `record`: each row makes up a single database
- `Data integrity`: Data integrity is the maintenance of, and the assurance of,  
   data accuracy and consistency over its entire life-cycle

`Schema`를 통해 `Data integrity`를 보장할 수 있다

DB에 중요한 역할을 하는 key 2가지가 있다

- `primary Key`: 고유한 식별자(또는 id)를 가질 수 있는 키
  - primary key 로 데이터베이스가 검색의 최적화를 해준다
- `Foreign Key`: tables can relate to each other via Foreign keys
  - 두가지의 다른 테이블의 관계를 정해준다

### Basic stricture of an SQL Query

- `SELECT` : lists a record attributes to be copied | 어떤 행을 선택할 건지
- `FROM` : lists tables (relations) to be used | 어떤 테이블에서 가지고 올 건지
- `WHERE` : corresponds to selection predicate | 조건

## NoSQL

### Why?

1. Mid 1990s: raise of Object Databased to solve "impedance mismatch" problem  
   오브젝트를 기반으로 한 프로그래밍에서 어떻게 하면 오브젝트 자체를 데이터베이스에 저장할 수 있을까 -> 오브젝트형 데이터베이스가 나옴
2. Mid 2000s: raise of the internet and Big data sparked growth of NoSQL DB adoption

#### NoSQL의 특징

1. Don't have rigid, strict schema\_`schema-less`
2. Non-relational, hence cluster-friendly
3. Address specific problems or use cases

- mongoDB | the most commonly used NoSQL DB in Web Dev, `Document DB`
  - Primary unit of data is a `document`
  - Documents organised in `collections`
  - Document structure is not enforced by DB
  - Each document is `self-contained`
  - `Data duplication` instead of relation

NoSQL 에는 schema라는 개념이 없기 때문에 데이터베이스는 어떤 정보가 정확한지 알 수 없다 (오류가 있는지 알지 못함)  
그래서 개발자가 스스로 컬렉션을 잘 관리해야한다

#### Most Popular NoSQL DB

- Wide Column: cassandra, Cloud Bigtable
- Graph: neo4j
- Key-value: Redis, DynamoDB
- Document: mongoDB

## ORM / ODM

### ORM \_ Object Relational Mapping

코드에서 작성한 오브젝트를 자동으로 DB에 schema를 만들고, 저장하고, 읽어와서 코드로 변환해준다

1. Run the code
2. Creates DB Table
3. Creates the record

- ✅ 장점
  - Business Logic에 집중해서 개발할 수 있게 도와줌
  - No Boilerplate code | 반복되는 코드사용을 줄여준다
  - Database Abstraction | 데이터베이스의 추상화로 다른 DB를 사용해도 편하게 사용가능
  - schema migration | 스키마나 코드가 변경되어도 자동으로 처리
- 🚫 단점
  - Suboptimal queries | ORM에서 제공해주는 API만으로는 상세한 쿼리를 할 수 없다
  - SQL Knowledge | SQL은 비슷해서 다른 프로그램에서 쉽게 사용이 가능한데  
    ORM은 ORM마다 서로 다른 API를 제공해서 각각 배워야한다
  - Complex Queries | ORM만으로는 복잡한 쿼리를 할 수 없다
  - ORM API의 특성상 모든 행에 있는 데이터를 다 읽어와서 코드에서 필터링을 해야하므로  
    빠른 성능, 메모리의 최적화가 조금 떨어진다

코드의 편리함을 추구한다면 ORM 사용 🙆🏻‍♀️  
프로젝트의 DB가 무겁고 성능이 중요하다면 🙅🏻‍♀️ (DB와 SQL사용을 추천)

#### Some of the Great ORMs of the JavaScript world

- TYPEORM, Sequelize, Prisma

#### ODM | Object Document Mapper

`mongoose`: elegant mongoDB object modeling for node.js

## SQL vs NoSQL

SQL vs NoSQL comparison table

|                            | SQL           | NoSQL                |
| -------------------------- | ------------- | -------------------- |
| **Getting Started**        | Medium        | Easy                 |
| **Data Structure**         | Rigid / Fixed | Undefined / Flexible |
| **Data lookup**            | Easy          | Easy                 |
| **Aggregate Queries**      | Easy          | Difficult            |
| **Slicing & Dicing Data**  | Easy          | Difficult            |
| **Scaling for High Input** | Difficult     | Easy                 |
| **Running cost**           | costly        | cheap                |

#### Scaling 확장성

- Vertical ( Up / Down ) `SQL`

  - RAM, CPU, Disk 를 확장해야 함 (서로 다른 테이블이 연관되어 있으므로)

- Horizontal ( Out / In ) `NoSQL`
  - Add more servers (데이터들이 연관이 없으므로 )

#### How to choose?

1. The type of data in question | 어떤 데이터 타입을 저장할건지
2. The amount of data | 얼마나 많은 사용자를 예상하는지, 각 사용자마다 얼마나 많은 데이터를 저장할 수 있는지
3. How data will be queried | 각각의 데이터들이 관계가 있는지, 관계가 있다면 쿼리를 할 확률이 얼마나 있는지

- **SQL**

  - Accounting Software
  - E-commerce Platforms
  - Customer Relationship Software (CRM)

- **NoSQL**

  - Social Networks | Graph
  - Distributed cache | key-value
  - Content Management Systems | Document
  - Real-time analytics, Big Data | wide-column

대표적인 예시일 뿐 항상 이렇게 둘중 하나만 선택하는건 아니다

- **Hybrid approach** | `Polyglot Persistence`
  - choose a database appropriate for particular problem \_ 같은 프로젝트라도 필요에 따라 부분적으로 다른 DB 사용가능
  - 예: User Service - MongoDB / Billing Servide - MySQL / Transcoding Service - DynamoDB

</details>

<details>
<summary>15. MySQL</summary>

## MySQL [👀](https://dev.mysql.com/doc/refman/8.0/en/)

Community Downloads > MySQL Community Server, MySQL Workbench 다운로드

### schema 정의하기

왼쪽 schemas탭에서 오른쪽 클릭 create schema -> schema name은 프로젝트의 이름으로 설정 -> apply클릭  
왼쪽에 프로젝트명을 따온 스키마 ▶️ 클릭하면 Tables, Views...등 메뉴가 나온다 -> tables에서 우클릭

Column | Datatype 에서

- `PK` : primary key | DB에서 주요키인지
- `NN` : not null | 옵셔널이 아니라 항상 값이 있어야 하는지
- `UQ` : unique | 모든 레코드에서 고유한 값인지
- `BIN` : binary type 인지
- `UN` : unsigned | 마이너스가 아닌 정수인지
- `ZF` : zero fill | 0으로 채울건지
- `AI` : auto increment | 자동으로 증가할 건지
- `G` : generated | 자동으로 만들것인지

#### 첫번째 테이블 만들기 | users

화면 윗부분에 Name: users 라고 작성하고  
Column - `id` , Datatype - INT, pk, nn, uq, al을 만들고  
Column - `username` , Datatype - varchar(45), nn, uq 만들고  
Column - `password` , Datatype - varchar(128), nn 만들고  
Column - `name` , Datatype - varchar(128), nn 만들고  
Column - `email` , Datatype - varchar(128), nn 만들고  
Column - `url` , Datatype - TEXT 만든다

📌 varchar: 글자수

다 지정했으면 apply클릭 하면 아래 화면처럼 창이 뜬다

```
CREATE TABLE `dwitter`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `url` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

```

#### 두번째 테이블 tweets

Name: tweets  
Column - `id` , Datatype - INT, pk, nn, uq, ai  
Column - `text` , Datatype - TEXT, nn  
Column - `createdAt` , Datatype - DATETIME, nn  
Column - `userId` , Datatype - INT, nn (왜 uq가 아니냐면 유저가 여러개의 트윗을 작성했을 수도 있으므로 & 왜 INT냐면 첫번째 테이블에서 id가 INT였으므로)

#### 테이블 연결하기

tweets 테이블에서 아래쪽에 Foreign Keys 탭이 있다  
왼쪽창에서 Foreign Key - `id`, Referenced Table - `dwitter.users` 를 선택하고  
오른쪽 창 Foreign key details 'id' 에서 Column `userId`를 체크 (연결할 값을 체크) 하고 apply
그럼 아래처럼 연결되었다고 뜬다

```
ALTER TABLE `dwitter`.`tweets`
ADD INDEX `id_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `dwitter`.`tweets`
ADD CONSTRAINT `id`
  FOREIGN KEY (`userId`)
  REFERENCES `dwitter`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```

3번째 창에서 Foreign Key가 가리키고 있는 userId(사용자)가 삭제된다면 관련된 트윗을 어떻게 할건지 선택할 수 있다  
드위터에선 RESTRICT로 아무것도 하지 않는 걸로 선택할거얌

맨 왼쪽 schemas에서 table의 ▶️ 을 선택하면 tweets, users가 만들어진 것을 확인할 수 있다  
🔧 모양을 클릭하면 데이터타입을 변경할 수 있다 (apply 잊지마~)  
테이블 모양을 클릭하면 실제 데이터를 볼 수 있고 `SELECT * FROM dwitter.tweets;`이 적힌 창에서 SQL을 써서 직접 query도 연습해볼 수 있다

### node 서버에서 연결하기

`npm i mysql2` 설치 후 db라는 폴더를 만든 후 > `database.js` 만든다

```js
// database.js

import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

export const db = pool.promise();
```

`config.js`와, `.env`에서 관련된 값을 작성하고

```js
// config.js

export const config = {
  db: {
    host: required('DB_HOST'), //          localhost
    user: required('DB_USER'), //          root
    database: required('DB_DATABASE'), //  dwitter
    password: required('DB_PASSWORD'), //  🙊
  },
};
```

`app.js`에서 db를 불러와서 `getConnection()`으로 불러온다

```js
// app.js

import { db } from './db/database.js';
db.getConnection().then(console.log); // PromisePoolConnection 의 관련된 내용들이 콘솔에 나온다
```

### 서버 data > `auth.js` 에서 MySQL 사용하기

1. createUser에 MySQL 적용하기

```js
import { db } from '../db/database.js';

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      // 앞에 명시한 params의 갯수만큼 ?를 입력한다
      // database에서 자동으로 증가하는 id를 만드므로 따로 id 명시 안함
      [username, password, name, email, url]
    )
    .then((result) => {
      console.log(result);
      return result;
    });
}
```

npm start 후 포스트맨에서 signup을 해보면 console.log(result); 의 결과가 아래와 같이 출력된다

```shell
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 6,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
```

.then()에 콘솔로그 대신 아래처럼 코드를 넣어준다

```js
.then((result) => result[0].insertId);
```

MySQL Workbench에 가서 users 테이블을 확인하면 user가 추가되어 있는 것을 볼 수 있다

2. findByUsername 에 MySQL 적용하기

```js
export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username])
    .then((result) => result[0][0]); // 로그로 result값을 확인해보면 이중배열의 첫번째 값을 가져와야함
}
```

3. findById 에 MySQL 적용하기

```js
export async function findById(id) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id])
    .then((result) => result[0][0]);
}
```

데이터베이스를 이용하도록 수정하는데 data > auth.js 파일 하나만 수정하면 되었다!

### 서버 data > `tweet.js` 에서 MySQL 사용하기 | join query

```js
export async function getAll() {
  return db
    .execute(
      'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id ORDER BY tw.createdAt DESC'
    )
    .then((result) => result[0]);

  // 'SELECT / FROM - JOIN / ON / ORDER BY DESC'
  // =>  createdAt을 기준으로 역순으로 정렬

  // MySQL사용 전 코드 ↓
  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.findById(
  //       tweet.userId
  //     );
  //     return { ...tweet, username, name, url };
  //   })
  // );
}
```

반복해서 사용되는 값을 변수로 할당해서 쓰면 간편!

```js
import { db } from '../db/database.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id ';

const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}
```

테이블을 묶을 때 `FROM - JOIN` 사용, `ON`을 이용해 어떤 것이 똑같을 때 묶을건지 정해줬다  
function getById(id)에서 `WHERE tw.id=?`과 function getAllByUsername(username)에서 `WHERE username=?`처럼  
테이블 이름을 명시하는 것은 생략이 가능하고, 두개의 테이블에 동일한 이름이 있을때 충돌을 피하기 위해 테이블명을 명시해준다

오타같은 실수가 있으면 컴파일 때 문제가 발생하는게 아니라 실시간으로 문제가 발생한다 -> 이것을 피할 수 있게 도와주는게 ORM

</details>

<details>
<summary>16. sequelize</summary>

## Sequelize [👀](https://sequelize.org/master/)

Sequelize is a promise-based Node.js ORM for Postgres, MySQL...  
It features solid transaction support, relations, eager and lazy loading, read replication and more

`npm i sequelize` 로 설치

ORM은 작성한 class 모델을 베이스로 해서 자동으로 database에 필요한 테이블을 생성해준다  
SQL query language에 대해서 몰라도 되기때문에 더욱 간편하다

워크벤치에서 MySQL 때 작성한 tweets, users 테이블을 우클릭, drop table을 선택해서 지워준다

```js
// db > database.js에서

import mysql from 'mysql2';
import { config } from '../config.js';
import SQ from 'sequelize';

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});
```

```js
// app.js에서
import { sequelize } from './db/database.js';

sequelize.sync().then((client) => {
  console.log(client);
  const server = app.listen(config.host.port);
  initSocket(server);
});
```

### Sequelize auth.js에 적용하기

```js
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);
```

실행하면 아래의 값이 콘솔에 출력된다

```shell
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(45) NOT NULL, `password` VARCHAR(128) NOT NULL, `name` VARCHAR(128) NOT NULL, `email` VARCHAR(128) NOT NULL, `url` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `users`
```

워크벤치에서 테이블 우클릭 refresh all을 클릭하면 users 테이블이 만들어진 걸 확인할 수 있다  
내가 설정하지 않은 createdAt, updatedAt도 만들어져있는데 이러한 time stamp가 필요없다면  
2번째 인자로 옵션 `{ timestamps: false }`을 주면 된다  
workbench에서 테이블을 drop후 다시 refresh해서 확인해보면 timestamps 는 테이블에 포함되지 않은걸 확인할 수 있다

sequelize.define()으로 User를 받아온 코드로 작성을 해보면 ↓

```js
// auth.js

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
  // return User.create(user).then((data) => {
  //   console.log(data);  // 데이터를 출력해보면 필요한 값인 id 가 data.dataValues.id 인 것 알 수 있다
  //   return data;
  // });
}
```

### Sequelize tweet.js에 적용하기

auth.js에서 User를 export 해주고

```js
// tweet.js

import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User);
```

workbench 에서 refresh하면 tweets 테이블이 만들어진 거 확인할 수 있다  
createdAt, Foreign keys가 만들어진 것도 확인할 수 있다

getAll(), create() 함수는 아래처럼 받아오고 data로 어떤 값이 출력되는지 확인해본다  
create가 먼저 구현되어 있어야 getAll을 할 수 있으므로..

```js
export async function getAll() {
  return Tweet.findAll().then((data) => {
    console.log(data);
    return data;
  });
}

export async function create(text, userId) {
  return Tweet.create(text, userId).then((data) => {
    console.log(data);
    return data;
  });
}
```

포스트맨에서 로그인 후 받은 토큰값으로 create, getAll을 해보고 어떤 값을 받아오는지 확인
=> 트윗만 가져오고 사용자와 연결해서 찾으려면 다른 옵션을 줘야한다

```js
const Sequelize = SQ.Sequelize;

export async function getAll() {
  return Tweet.findAll({
    attributes: [
      'id',
      'text',
      'createdAt',
      'userId',
      [Sequelize.col('user.name'), 'name'], // 💡 User의 중첩된 값을 플랫하게 가져옴
      [Sequelize.col('user.username'), 'username'],
      [Sequelize.col('user.url'), 'url'],
    ],
    include: {
      model: User,
      attributes: [],
    },
    order: [['createdAt', 'DESC']], // 최근에 만들어진 순서대로
  }).then((data) => {
    console.log(data);
    return data;
  });
}
```

getAllByUsername()에서도 옵션을 줘야하므로 반복되는 옵션값을 변수에 따로 저장해둔다

```js
const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = { order: [['createdAt', 'DESC']] };
```

전체적으로 코드를 수정한 내용은?

```js
// tweet.js

import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = { order: [['createdAt', 'DESC']] };

export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
}

export async function getById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
}

export async function create(text, userId) {
  return Tweet.create({ text, userId }) //
    .then((data) => {
      getById(data.dataValues.id);
    });
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER) //
    .then((tweet) => {
      tweet.text = text;
      return tweet.save();
    });
}

export async function remove(id) {
  return Tweet.findByPk(id) //
    .then((tweet) => {
      tweet.destroy();
    });
}
```

database.js에서도 mysql사용하지 않고 코드를 정리해준다 ( sequelize가 알아서 import해온다 )

```js
// database.js
import { config } from '../config.js';
import SQ from 'sequelize';

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: false, // database 실행에 대한 로그가 콘솔에 남지 않게 하는 옵션, 배포시에 이렇게 끌 수 있다
});
```

</details>

<details>
<summary>17. mongoDB</summary>

## mongoDB

The most commonly used NoSQL DB in Web Dav

- primary unit of data is a `document`
- Documents organised in `collections`
- Document structure is not enforced by DB
- Each document is `self-contained`
- `Data duplication` instead of relation

### mongoDB atlas 사용하기

무료 사용으로 aws, 지역 선택 후 Create Cluster 클릭  
Get Started 클릭하며 단계별로 안내해준다 `Database Access` 설정 => password 설정  
Privileges는 read & write만 가능하도록 설정 후 Add User  
Add IP Address => Network Access 클릭 후 Add IP Add. => Add Current IP 클릭 후 컨펌  
Connect to your cluster 클릭 => `connect` 클릭 => application으로 연결하기 선택 => 버전선택 후 code 복사해놓는다

mySQL, Sequelize 설치전 단계로 가서 `config.js`에서 `export const config` 에 아래코드 추가해주고

```js
  db: {
    host: required('DB_HOST'),
  },
```

`.env`에 가서 `DB_HOST=복사해온 코드`를 입력해준다 (`<password>`란에 내 패스워드 입력해준다)

database와 app에 mongodb를 연결한다

```js
// database.js

import MongoDb from 'mongodb';
import { config } from '../config.js';

export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => client.db());
}
```

```js
// app.js

import { connectDB } from './database/database.js';

connectDB()
  .then((db) => {
    console.log('init', db);
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.error);
```

#### Auth 에서 MongoDB 사용하기

```js
// database.js

import MongoDb from 'mongodb';
import { config } from '../config.js';

let db; // 여기서만 사용할 수 있는 변수 db를 만듦

export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => {
      db = client.db();
    });
}

export function getUsers() {
  return db.collection('users');
}

export function getTweets() {
  return db.collection('tweets');
}
```

포스트맨에서 signup을 해서 auth에서 유저를 만들었을 때 어떠한 값이 리턴되는지 확인해본다

```js
// auth.js

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => {
      console.log(data);
      return data; // 오브젝트 안에 insertedId 가 리턴된다,  (obj는 => toString으로 변환해서 사용한다)
    });
}
```

mongoDB Atlas에서 확인해 보면 `_id`값이 있는것을 확인할 수 있다

```js
// auth.js

import { getUsers } from '../database/database.js';
import MongoDb from 'mongodb';

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username }) //
    .then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new MongoDb.ObjectId(id) })
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user; // Atlas에서 _id 사용하므로 _id와 기존의 어플리케이션에서 필요한 id를 추가해준다
}
```

NoSQL의 포인트 정리

- 사용자에 대한 프로필을 저장하고 싶다면 프로필을 담당하고 있는 DB를 따로 만든다
- 사용자가 문서를 만든다면 사용자의 문서를 저장하는 DB를 만든다
- 각각의 DB는 서로 독립/고립되어 있다 -> 수평적 확장이 쉬움 ( 서버1, 서버2, ...)
- `NoSQL` : mongoDB는 관계형 조인쿼리를 할 수 있으나 성능이 좋지 않다  
  `SQL` : 관계형을 사용 -> 조인쿼리의 성능이 좋기때문에
- 특정한 컬렉션에 한해서 관계가 불가피하게 필요하다면 `정보의 중복성`을 선호함  
  (정보를 중복으로 가지고 있는게 관계를 가지는 것보다 성능, 확장성이 더 낫기때문)

#### tweet 에서 MongoDB 사용하기

```js
//  tweet.js

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => {
      console.log(data);
      // return data;      // insertedId 가 출력되는 걸 확인할 수 있다
      // return { ...tweet, _id: data.insertedId };
      return mapOptionalTweet({ ...tweet, _id: data.insertedId }); // id가 자동으로 추가될 수 있게 함수를 만들어 전달한다
    });
}
```

전체적으로 수정된 코드는 아래와 같다

```js
import MongoDb from 'mongodb';
import { getTweets } from '../database/database.js';
import * as userRepository from './auth.js';

export async function getAll() {
  return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new MongoDb.ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new MongoDb.ObjectId(id) },
      { $set: { text } },
      { returnDocument: 'after' } // 수정이 된 이후의 객체를 리턴해준다
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new MongoDb.ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
```

</details>

<details>
<summary>18. Mongoose</summary>

## Mongoose 사용하기

ORM - Object Relational Mapping

#### auth에서 Mongoose사용하기

`npm i mongoose` 설치 `database.js`에서 MongoDb 대신 mongoose를 import한다

```js
// database.js

import { Mongoose } from 'mongoose';

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}
```

기존에 있던 `let db;`도 삭제하고 위의 코드처럼 수정하면 된다 `app.js`에서 로그를 찍어서 연결되었는지 확인해본다  
테스트가 정확하게 동작하는지 확인하기 위해 Atlas cluster에서 모든 데이터베이스를 드롭해서 비운다  
`auth.js`에서도 MongoDb 대신 mongoose를 import한다

```js
// auth.js

import { Mongoose } from 'mongoose';

const userSchema = new Mongoose.Schema({
  username: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  url: { type: String, require: true },
});

// mongoDb 데이터베이스에서 _id로 저장이 되는데 이것을 읽어올 때는 id로 읽어올 수 있게 변환해주려면 아래처럼 코드를 작성해준다
// userSchema에 가상의 'id'를 추가해 줄 거고, 어디서 읽어오냐면(get) userSchema의 _id를 (오브젝트에서 문자로 변환해서)읽어올거야
userSchema.virtual('id').get(function () {
  return this._id.toString();
});

// JSON으로 변환할 때 가상의 요소도 포함이 될 수 있도록 설정, 만약 이렇게 하지 않으면 _id를  id로 접근은 할 수 있지만 JSON에 포함은 되지 않음
userSchema.set('toJSON', { virtuals: true }); // JSON으로 변환할 때 가상의 요소도 포함될 수 있도록 설정

// 콘솔로그로 출력할 때도 보고 싶으므로 아래처럼 설정, 가상의 필드가 추가가 되도록
userSchema.set('toObject', { virtuals: true });
```

`_id`를 `id`로 사용하는건 auth뿐만 아니라 tweet에서도 사용해야 하므로 `database.js`에서 함수로 만들어 준다

```js
// database.js

export function useVirtualId(schema) {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });

  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}
```

`auth.js`에서 코드는 아래와 같이 작성하면 된다 [👀](https://github.com/yoonsery/twitter-clone-coding-server/commit/fdbaec3904b9ea6fa4b84640f638ce0575026b58)

```js
import { useVirtualId } from '../database/database.js';
import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  username: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  url: { type: String, require: true },
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}
```

#### tweet에서 Mongoose사용하기 [👀](https://github.com/yoonsery/twitter-clone-coding-server/commit/e5c09502dd87fd8f0ea92145546f232538fef74b)

```js
import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, require: true },
    userId: { type: String, require: true },
    name: { type: String, require: true },
    username: { type: String, require: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  const { name, username } = await userRepository.findById(userId);

  return new Tweet({
    text,
    userId,
    name,
    username,
  }).save();
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
  // returnOriginal을 false로 해야 업데이트한 값이 리턴이 된다
}

export async function remove(id) {
  return Tweet.findOneAndDelete(id);
}
```

mongoDB는 schema 자체가 없기 때문에 어떤 데이터를 저장하든지 상관하지 않으므로 데이터의 일관성이 깨질 수 있다  
mongoose는 코드상에서 schema를 작성하여 데이터의 일관성을 지킬 수 있다

</details>

<details>
<summary>19. Deployment</summary>

## Deployment

List

- Pre-Deployment checklist
- How do I want to `operate` it?
- Deployment: front-end, backend

### 배포 전 체크리스트

- Prepare production configuration  
  보안에 관련된 중요한 키들이 들어있거나 커밋되어 있지 않은지 확인  
  서버에서 설정할 수 있는 환경변수들이 따로 설정이 가능한지 체크
- Logs audit(no sensitive data output)  
  보안에 민감한 사항 또는 불필요한 데이터를 출력하고 있지 않은지 확인
- Sanitise server responses ( Strip off debug info and call-stacks )
- Set API rate limits  
  한 사용자 또는 한 IP에서 주기적으로 반복적인 API 요청을 하지 못하게 제약을 걸어둔다
- SQL같은 schema 베이스의 DB를 사용한다면 schema를 만들 수 있는 파일들을 깃에 커밋을 해두는게 좋다

### 호스팅 고르는 법

#### What are My hosting requirements

- 서버의 종류: web server or static hosting
- database가 필요한지?
- 어떤 데이터베이스를 사용하고 있는지?
- 사용하는 데이터베이스를 지원해주고 있는 호스팅이 있는지?
- CDN이 필요한지?
- 서버의 파일시스템에 접근해서 파일을 읽어와야 하는지? (file storage)
- SSL과 같은 TLS가 필요한지?
- 어디에 있는 / 어떤 위치에 있는 서버가 필요한지?

#### How do I want to operate it?

- DIY (have full control)

  - provision VMS
  - install dependencies
  - setup networking
  - setup scaling
  - etc..
  - in these cases: Google Cloud, amazon web services, Azure...

- Fully managed (have some control)
  - just upload the code
  - configure access
  - configure scaling
  - etc..
  - in these cases: heroku, netlify, platform.sh ...

### dwitter deployment

- Frontend -> netlify

  - HTTP v2, free, redirects
  - client-side rendering

- Backend -> platform.sh
  - node.js, MySQL
  - HTTP v2, free
  - Heroku는 백엔드 배포에 많이 사용되지만 아직 HTTP v1만 지원한다
  - mongoDB는 Atlas에 이미 배포를 한 상태라 배포를 따로 하지 않아도 된다

### 배포 전 최종 코드 점검 (main branch로 돌아와서)

platform 호스팅에서는 port라는 단어를 사용하므로 `configure.js`에서 변경해준다

```js
 host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
// 가 아니라 아래처럼 변경! 하고 cors도 추가해준다

port: parseInt(required('PORT', 8080)),
cors: {
  allowedOrigin: required('CORS_ALLOW_ORIGIN'),
},
```

app.js 에서 코드 추가, 수정

```js
// app.js

// 추가
const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

// 수정
app.use(cors(corsOption)); // cors 인자로 corsOption 추가

sequelize.sync().then(() => {
  const server = app.listen(config.port); // port로 수정한 값
  initSocket(server);
});
```

#### 버그수정 & clean up

middleware의 auth.js에서 `req.token = token;`를 전달해줘야 한다  
app.js에서 `console.log('Server is started...🏃🏻‍♀️ ${new Date()}');`를 추가해서 나중에 서버의 로그를 확인할 때 서버가 언제 시작, 재시작되었는지 알 수 있다  
(실제 코드에선 '' 대신 백틱사용~)  
socket.js에서 `origin: '*'` 대신 `origin: config.cors.allowedOrigin,`으로 변경한다

### 백엔드 배포하기 (heroku)

가입 후 `create new app`클릭 ⟶ app name과 region선택 ⟶ heroku Git 배포 선택  
heroku CLI 설치 ⟶ 터미널에서 `heroku login`으로 로그인  
배포용 브랜치를 만든다 ⟶ heroku 리모트를 가리키도록 설정 `heroku git:remote -a <앱네임>-ac`  
heroku는 mysql말고 postgres를 사용하므로 코드를 살짝 수정해준다 (결제카드를 등록하면 사용할 수 있다)  
터미널에서 `heroku addons:create heroku-postgresql:hobby-dev` 입력 ⟶ 데이터베이스가 생성된다  
터미널에서 `heroku config` 입력 ⟶ 자세한 정보가 출력되어 확인할 수 있다  
👉🏻 `postgres://<username>:<password>@<host>:<port>/<database name>` : 환경변수 설정할 때 사용

heroku 사이트의 대시보드에 가서 만들어놓은 프로젝트 선택 ⟶ settings ⟶ `Config Vars` 선택  
필요한 값들을 추가하면 된다 (DB_HOST,DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DATABASE_URL,  
JWT_SECRET, CORS_ALLOW_ORIGIN)

postgres에 필요한 것들을 설치한다 (pg, pg-hstore) `npm i pg pg-hstore`  
`config.js`에서 `db`에 `port: required('DB_PORT'),`를 추가한다  
아래코드처럼 `database.js`에서도 코드를 수정해준다

```js
//  db > database.js

const { host, port, user, database, password } = config.db; // port 추가
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  port, // port 추가
  dialect: 'postgres', // mysql에서 postgres로 업데이트
  logging: false,
  dialectOptions: {
    // postgres가 필요한 옵션 추가
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
```

`package.json`에 scripts start가 `nodemon app`으로 되어 있는데 heroku가 실행할 수 있도록해줘야 한다  
⟶ `node app`으로 변경해주거나, `Procfile`이란 파일을 만들어서 `web: node app.js`라고 코드를 써준다

모든 변경사항을 확인 후 커밋을 해준다 ⟶ 커밋 후 터미널에 `git push heroku <브랜치명>:master` 를 입력해서 배포한다  
`heroku logs`로 어떻게 동작하고 있는지 터미널에서 확인할 수 있다  
heroku 사이트 settings에서 서버의 도메인 주소를 확인할 수 있다  
config vars에서 CORS_ALLOW_ORIGIN의 value에 프론트엔드 배포한 주소를 넣어준다

### 프론트엔드 배포하기 (netlify)

`.env` 에서 `REACT_APP_BASE_URL=<서버주소>` 로 수정한다 (주소 마지막에 `/`는 제외)  
터미널에서 `npm run build` 실행 -> `netlify deploy` 입력하고 차근차근 진행하면 된다

</details>
