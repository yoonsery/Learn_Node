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
