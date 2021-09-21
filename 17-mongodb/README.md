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
