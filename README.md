# ChapGPT (짭GPT)
ChatGPT의 클론 프로젝트인 ChapGPT(짭GPT) 프론트엔드 레포입니다.

## 목차
- [소개](#소개)
- [설치](#설치)

## 소개
연습용 ChatGPT 클론 프로젝트의 프론트엔드 코드입니다. 이 프로젝트는 OpenAI API의 gpt-3.5-turbo 모델만을 사용하여 ChatGPT 서비스와 (거의)유사한 서비스를 제공할 수 있습니다.

### FrontEnd에서 사용한 Libraray들 
- SPA설계 : react
- 비동기 데이터 통신 : react-query, axios
- Design : styled-components
- 페이지 분할 : react-router-dom
- cookie 사용 : react-cookie
- 암호화/복호화 : crypto.js

### 폴더 구조
* src 
    - /axios : api 요청을 위한 axios 함수들
    - /components : 자주 사용하는 공용컴포넌트
    - /icons : App에서 사용할 Icon들
    - /pages : react-router-dom 으로 분할한 페이지 컴포넌트들
    - /shared : Router.js 
    - /styles : styled-component들 및 각종 style 관련 파일들
    - /util : 그 외 기능들(쿠키 관련 함수, 암호화/복호화 관련 함수)

### 문제해결
- OpenAI API 응답 지연(HTTP 504 Error)에 따른 문제
    - Client 측 : useQuery 옵션 중 refetchquery time 조건부 설정으로 해결
        + false : 채팅 데이터의 마지막 응답이 gpt이면 get을 다시 요청하지 않음
        + 2000 : 채팅 데이터의 마지막 응답이 유저이면 get을 2000ms마다 요청
- 첫 접속 시 LocalStorage에 값이 없는 경우 Email을 띄워주지 못해 빈 화면 표시되는 문제
    - 로컬 스토리지에 이메일이 없을 경우, 임시 이메일(example.naver.com) 설정 후 useEffect로 임시 이메일일 경우 로그인 페이지로 이동하도록 설정
- 백에서 로그인 시 Set-Cookie 헤더로 JWT토큰 전달 시, SOP(same origin policy)로 인해 쿠키가 설정되지 않는 현상 발생
    - 시도 : google browser의 경우 samsite : lax 설정으로 변경되어 안되는 상황 -> 백에서 해당 설정해 놓았지만 여전히 저장되지 않음
    - 해결책 : JWT를 header를 통해 주고받기로 결정
- 자동로그인 및 자동완성 기능 추가를 위한 보안상 문제 및 저장소 결정  
    - 유저정보 : 로그인 시 유저 정보를 향후 이메일 표시 및 자동완성 기능에 사용 -> 재 접속 시에도 유지되어야 함 : 로컬스토리지에 저장하도록 설정 & 암호화를 통한 보안상 취약점 보완
    - JWT token : 메인페이지 접속 시 chat get하는 부분에서 header에 포함되어 백으로 전달(인증절차 수행) -> 재 접속 시에도 유지되어야 함 & token의 유효기간과 동일하게 설정 : cookie에 저장
    - 로그인/로그아웃 정보 : 로그인/로그아웃을 통해 접근할 수 있는 페이지 제한 필요 -> 접속 시에만 필요한 내용 : 세션스토리지 사용 & chat get 성공시 세션스토리지에 Login 저장
- Nav의 공통 div 컴포넌트 분리
    - 처음에 chatGPT의 외형만 보고 아이콘과 문구가 들어가는 공통 div 엘리먼트를 컴포넌트로 지정
    - 기능을 붙이는 과정에서 해당 컴포넌트만으로는 조건 분기가 너무나 복잡해지는 문제 발생
    - 결국 좌측 Nav 화면에서 채팅방을 표시해주는 컴포넌트는 공통 컴포넌트에서 분리하여 새로운 컴포넌트로 작성
- textarea 파트 스타일링
    - 질문 작성란이 있는 화면의 아랫부분은 위 -> 아래로 가면서 투명 -> 흰색으로 점차 변화하도록 스타일링하여 질문을 스크롤해도 화면에 띄워져있는 textarea가 배경과 자연스럽게 어우러지도록 함
    - textarea는 일정 크기까지 늘어나다가 그 이상 넘어갈 시 스크롤이 되도록 하여 미관을 해치지 않도록 처리

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

