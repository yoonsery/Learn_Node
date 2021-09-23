## Mongoose 사용하기

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
