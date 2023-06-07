# ChapGPT (짭GPT)
ChatGPT의 클론 프로젝트인 ChapGPT(짭GPT) 프론트엔드 레포입니다.
## 목차
- [소개](#소개)
- [설치](#설치)

## 소개
연습용 ChatGPT 클론 프로젝트의 프론트엔드 코드입니다. 이 프로젝트는 OpenAI API의 gpt-3.5-turbo 모델만을 사용하여 ChatGPT 서비스와 (거의)유사한 서비스를 제공할 수 있습니다.

### 기술 스택
- 런타임: <code>Node.js</code>
- 프레임워크: <code>express</code>
- ORM: <code>Sequelize</code>
- 데이터베이스: <code>MySQL</code>
- 버전 관리 시스템: <code>Git</code>
- 외부 API: <code>OpenAI API</code>

### 문제해결

* Back End
    - 회원 가입 및 로그인에 주로 사용되는 Users 테이블의 목적과 달리 Credit 조회는 채팅 생성과 대화 시 빈번하게 조회가 이뤄지는 차이 발생 
        - Users Table에서 credit 컬럼을 Credits 테이블로 분리하고, UserId를 FK로 1:1 관계 정의
    - API endpoint마다 일관되지 않은 response 형태로 클라이언트에서 API 명세서를 면밀히 살펴야 하는 불편 발생
        - response 클래스를 만들어 API 요청에 따른 응답을 <code> {HTTP 코드, 메시지, 데이터}</code> 형태로 전달 
    - OpenAI API 응답 지연에 따른 문제
        - OpenAI API 응답 시간이 OpenAI 서버 상황과 메시지 난이도에 따라 달라져 <code>POST</code> 메서드 응답 지연 시 504 gateway timeout 발생
        - 서버에서 우선 빈 스트링(<code>""</code>)을 데이터베이스에 저장하고, 바로 응답을 보낸 후 openAI API 응답을 기다린 후 데이터베이스에 저장하는 방식으로 수정, 응답 받은 클라이언트는 응답 후 전체 채팅을 조회하는 요청과 함께 응답이 올때까지 주기적인 <code>GET</code> /api/chat/:chatId 요청으로 대화 내용을 갱신하는 것으로 해결
    - 크레딧 사용에 따른 OpenAI API 성공/실패 여부와 credit 일관성 유지
        - OpenAI API에서 답변 생성 성공시에만 credit 차감하도록 sequelize trasaction을 이용해서 답변 실패 시 credit 차감을 rollbac하도록 구현
***

* Front End
    - OpenAI API 응답 지연(HTTP 504 Error)에 따른 문제
        - Client 측 : useQuery 옵션 중 refetchquery time 조건부 설정으로 해결
            + false : 조건 1(가형님 추가 설명 필요)
            + 2000 : 조건 2(가형님 추가 설명 필요)
    - 첫 접속 시 LocalStorage에 값이 없는 경우 Email을 띄워주지 못해 빈 화면 표시되는 문제
        - 로컬 스토리지에 이메일이 없을 경우, 임시 이메일(example.naver.com) 설정 후 useEffect로 임시 이메일일 경우 로그인 페이지로 이동하도록 설정
    - 백에서 로그인 시 Set-Cookie 헤더로 JWT토큰 전달 시, SOP(same origin policy)로 인해 쿠키가 설정되지 않는 현상 발생
        - 시도 : google browser의 경우 samsite : lax 설정으로 변경되어 안되는 상황 -> 백에서 해당 설정해 놓았지만 여전히 저장되지 않음
        - 해결책 : JWT를 header를 통해 주고받기로 결정
    - 자동로그인 및 자동완성 기능 추가를 위한 보안상 문제 및 저장소 결정  
        - 유저정보 : 로그인 시 유저 정보를 향후 이메일 표시 및 자동완성 기능에 사용 -> 재 접속 시에도 유지되어야 함 : 로컬스토리지에 저장하도록 설정 & 암호화를 통한 보안상 취약점 보완
        - JWT token : 메인페이지 접속 시 chat get하는 부분에서 header에 포함되어 백으로 전달(인증절차 수행) -> 재 접속 시에도 유지되어야 함 & token의 유효기간과 동일하게 설정 : cookie에 저장
        - 로그인/로그아웃 정보 : 로그인/로그아웃을 통해 접근할 수 있는 페이지 제한 필요 -> 접속 시에만 필요한 내용 : 세션스토리지 사용 & chat get 성공시 세션스토리지에 Login 저장
## 설치
1. 레포 클론:
   ```bash
   git clone https://github.com/Team2clone/team2CloneFE.git
   ```
2. 의존성 설치:
    ```bash
    yarn install
    ```
3. 환경변수 설정: 루트 디렉토리에 .env 파일을 생성하고 다음 환경변수를 정의해야 합니다.
    ```
    REACT_APP_SERVER_URL = "연결할 서버 URL"
    REACT_APP_CRYPTO_KEY = "암호화시 사용할 Key 값"
    ```
4. 클라이언트를 실행합니다.:
    ```bash
    yarn start
    ```
클라이언트가 http://localhost:3000 에서 실행됩니다.

