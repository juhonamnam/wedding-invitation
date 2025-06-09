# 웨딩 청첩장 템플릿 | Wedding Invitation Template

## 원본 버전 | Original Version

남주호 ❤️ 정지원 청첩장입니다.

https://juhonamnam.github.io/wedding-invitation

실제 저희 결혼식을 위해 직접 디자인한 청첩장이며, 결혼식이 끝난 현재 전화번호, 계좌번호 등의 개인정보를 제외한 상태입니다. 사진 또한 현재 AI 생성 사진으로 대체되었으나, 당시에는 저희의 실제 웨딩 사진이 사용되었습니다.

## 개요

React로 제작된 모던한 웨딩 청첩장 웹사이트 템플릿입니다. 깔끔한 디자인을 특징으로 하며, 손쉽게 커스터마이징하여 자신만의 청첩장으로 만들 수 있습니다.

## 주요 기능

- 📱 반응형 디자인 - 모바일과 데스크톱 모두 지원
- 🎨 깔끔하고 모던한 UI
- 📅 웨딩 정보 커스터마이징 가능
- 🖼️ 이미지 갤러리 지원
- 🌐 GitHub Pages 간편 배포

## 사전 요구사항

- Node.js (버전은 `.nvmrc` 파일에 명시)
- Yarn 패키지 매니저 (버전 4.1.0 이상)

## 시작하기

1. 저장소 복제:

```bash
git clone https://github.com/juhonamnam/wedding-invitation.git
cd wedding-invitation
```

2. 의존성 설치:

```bash
yarn install
```

3. 개발 서버 실행:

```bash
yarn start
```

웹사이트는 `http://localhost:3000`에서 확인할 수 있습니다.

## 환경변수

환겨변수는 `.env.example` 파일에 저장되어 있습니다. 이 파일을 복사하여 `.env` 파일을 생성하고 각 환경변수를 수정합니다.

```bash
cp .env.example .env
```

- `REACT_APP_NAVER_MAP_CLIENT_ID`: 웨딩홀 위치를 표시하기 위한 네이버 지도 API 키 (Naver Cloud Platform에서 발급)
- `REACT_APP_KAKAO_SDK_JS_KEY`: 카카오톡 공유하기 기능을 위한 KAKAO SDK 키 (Kakao Developers에서 발급)
- `REACT_APP_SERVER_URL`: 방명록 서버 URL

## 커스터마이징

1. `src/const.ts` 파일에서 웨딩 정보 수정:

   - 신랑 신부 이름
   - 결혼식 날짜
   - 예식장 위치
   - 연락처 정보

2. 이미지 교체:

   - `src/image` 디렉토리에 이미지 파일 추가
   - 컴포넌트의 이미지 import 경로 수정

3. 스타일 수정:
   - SASS를 사용한 스타일링
   - 각 컴포넌트 디렉토리에서 관련 스타일 파일 확인 가능

## 배포하기

### GitHub Pages 배포 방법

1. 이 저장소를 본인의 GitHub 계정으로 Fork

2. `package.json`의 `homepage` 필드를 본인의 GitHub Pages URL로 수정

3. Fork된 저장소에서 GitHub Pages 배포 관련 설정

   - Settings > Actions > General에서 "Workflow permissions"를 "Read and write permissions"로 설정
   - Settings > Pages에서 "Build and deployment" 소스를 "GitHub Actions"로 설정

4. Fork된 저장소의 Settings > Secrets and variables > Actions에서 환경변수 추가

   - `REACT_APP_NAVER_MAP_CLIENT_ID`
   - `REACT_APP_KAKAO_SDK_JS_KEY`
   - `REACT_APP_SERVER_URL`

### 다른 호스팅 플랫폼

이 프로젝트는 정적 웹사이트이므로 정적 파일을 제공하는 모든 플랫폼에서 호스팅할 수 있습니다.

1. 프로젝트 빌드:

```bash
yarn build
```

2. `build` 디렉토리의 내용을 호스팅 플랫폼에 배포
