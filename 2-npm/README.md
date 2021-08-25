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
