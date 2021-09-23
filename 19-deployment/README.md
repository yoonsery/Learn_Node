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
