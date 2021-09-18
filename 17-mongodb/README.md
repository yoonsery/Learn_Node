## mongoDB (3.6.6 version)

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

`.env`에 가서 `DB_HOST=복사해온 코드`를 입력해준다
