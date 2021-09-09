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
