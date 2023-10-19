# 5SENSE

# 0. Git 전략 규칙

### 기본은 Git Flow 전략을 따라간다.

**main**: 기준이 되는 브랜치로 배포하는 브랜치. (master->main)

**dev**: 이 브랜치를 기준으로 각자 작업한 기능들을 Merge한다. (develop->dev)

**view**: 각 page를 그리는 브랜치로 view 작업이 완료되면 dev 브랜치로 merge 한다.

**feature** : 각 Page를 개발하는 브랜치로 기능 개발이 완료되면 dev 브랜치로 Merge 한다.

- 각 브랜치로 push를 하기전에 error유무 확인 후 push한다.
- dev 브랜치에 merge 한후엔 브랜치를 삭제한다.
- dev 브랜치에 merge 한후에 conflict 가 일어난 경우엔 문제 해결시까지 push 나 pull 금지
- 최종 배포시엔 dev를 main으로 merge하여 배포한다.

### Issue

- **예시) [branchname] 구현 내용**
- <label , assign 적용>
- 🐞Bug : 예기치 않은 문제 또는 의도하지 않은 동작을 나타낸다.
- ⚙️Feature : 기능 개발
- 🛠Fix : 오류 수정
- 🎨Html&css : 마크업 & 스타일링
- 🌎API : 서버 API 통신
- 🏁Test : test관련
- 💡Refactor : 코드 리팩토링

### Commit message

- **예시) commit -m '#issueNum feat : 로그인 기능 구현 완료'**
- feat : 새로운 기능 추가
- fix : 버그 수정
- style : 세미콜론 누락, 코드 변경이 없는 경우, 코드 포맷팅
- refactor: 코드 리펙토링
- chore : 그 외 자잘한 수정에 대한 커밋
- view : html & css 작성
