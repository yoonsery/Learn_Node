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
