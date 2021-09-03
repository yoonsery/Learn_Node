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
