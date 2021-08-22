2 챕터는 완강 후 다시 들어보기

## 노드란 무엇인고 어떻게 공부?

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

### Non-Blocking I/O

`I/O` : input / output  
컴퓨터 내에서 하드웨어(`files | database | network`)적으로 읽고 쓰는 행동들을 I/O라고 함

**I/O vs CPU**
CPU: Central Processing Unit (두뇌), 계산하고 연산
I/O: 직접 쓰고 읽기

Blocking : synchronous, 동기적인  
`Non-Blocking` : asynchronous, 비동기적인  
콜백을 던져주고 기다리지 않고 다음으로 넘어간다

### Event-Driven

콜백을 던져주고 나서 파일이 다 읽혀지는 이벤트가 발생하면 콜백호출 (이벤트를 통해 콜백 호출)
