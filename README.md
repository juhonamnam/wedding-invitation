# 모바일 청첩장 템플릿 | Wedding Invitation Template

## 원본 버전 | Original Version

이욱 ❤️ 이채은 청첩장입니다.

https://juhonamnam.github.io/wedding-invitation

실제 저희 결혼식을 위해 직접 디자인한 청첩장이며, 결혼식이 끝난 현재 전화번호, 계좌번호 등의 개인정보를 제외한 상태입니다. 사진 또한 현재 AI 생성 사진으로 대체되었으나, 당시에는 저희의 실제 웨딩 사진이 사용되었습니다.

## 개요

React로 제작된 모던한 모바일 청첩장 웹사이트 템플릿입니다. 깔끔한 디자인을 특징으로 하며, 손쉽게 커스터마이징하여 자신만의 청첩장으로 만들 수 있습니다.

## 주요 기능

- 📱 반응형 디자인 - 모바일과 데스크톱 모두 지원
- ✨ 깔끔하고 모던한 UI
- 🚀 GitHub Pages 간편 배포
- 다양한 기능 지원
  - 🎞️ 이미지 갤러리
  - 🗺️ 웨딩홀 위치 지도 표시
  - 💌 방명록
  - 💬 카카오톡 공유
  - 🎯 참석 의사 전달

## 사전 요구사항

- Node.js (버전은 `.nvmrc` 파일에 명시)

## 시작하기

1. 저장소 복제:

```bash
git clone https://github.com/juhonamnam/wedding-invitation.git
cd wedding-invitation
```

2. 의존성 설치:

```bash
npm install
```

3. 환경변수 설정:

환경변수 샘플은 `.env.example` 파일에 저장되어 있습니다. 이 파일을 복사하여 `.env` 파일을 생성하고 각 환경변수를 수정합니다.

```bash
cp .env.example .env
```

- `VITE_NAVER_MAP_CLIENT_ID`
  - 웨딩홀 위치를 표시하기 위한 네이버 지도 API 키
  - Naver Cloud Platform에서 발급 가능 (Dynamic Map API)
- `VITE_KAKAO_SDK_JS_KEY`
  - 카카오톡 공유하기 기능을 위한 KAKAO SDK 키
  - Kakao Developers에서 발급 가능 (JavaScript Key)
- `VITE_SERVER_URL`
  - 방명록과 참석 의사 전달 등을 위한 서버의 URL
  - 서버 소스코드: https://github.com/juhonamnam/wedding-invitation-server
  - 설정하지 않을 경우 소스코드상에 고정된 방명록만 보여줍니다.
    - 결혼식 끝난 이후 archive 용으로 사용 가능합니다. 지금까지 올라왔던 모든 방명록을 `offlineGuestBook.json`에 소스코드로 저장하여 read only로 보관해보세요.
- `VITE_STATIC_ONLY`
  - 방명록과 참석 의사 전달 기능은 별도의 서버를 호스팅해야 합니다.
  - 이 기능을 사용하지 않고 정적 웹사이트로만 운영하려면 이 환경변수를 `true`로 설정합니다.

4. 개발 서버 실행:

```bash
npm run dev
```

## 커스터마이징

1. `src/const.ts` 파일에서 웨딩 정보 수정:
   - 신랑 신부 이름
   - 결혼식 날짜
   - 예식장 위치
   - 연락처 및 축의금 계좌 정보

2. 이미지 교체
   - `src/images`: 표지 이미지 및 갤러리 이미지
   - `public/preview_image.png`: SNS 공유용 미리보기 이미지

3. 글귀 수정
   - `src/component/location`: 예식장 위치 관련 글귀 수정
   - `src/component/information`: 식사 안내 글귀 수정
   - 그 외 컴포넌트 디렉토리에서 관련 글귀 수정 가능

4. 스타일 수정:
   - SASS를 사용한 스타일링
   - Root의 `font-size`가 window size에 따라 변경되므로, rem 단위를 사용하여 반응형 디자인 구현. 가능하면 px와 같은 절대 단위 사용 지양.

## 배포하기

### GitHub Pages 배포 방법

1. 이 저장소를 본인의 GitHub 계정으로 Fork

2. `package.json`의 `homepage` 필드를 본인의 GitHub Pages URL로 수정

3. Fork된 저장소에서 GitHub Pages 배포 관련 설정
   - Settings > Actions > General에서 "Workflow permissions"를 "Read and write permissions"로 설정
   - Settings > Pages에서 "Build and deployment" 소스를 "GitHub Actions"로 설정

4. Fork된 저장소의 Settings > Secrets and variables > Actions에서 환경변수 추가 (각 환경변수에 대한 설명은 위 환경변수 설정 참고)
   - Secrets:
     - `VITE_NAVER_MAP_CLIENT_ID`
     - `VITE_KAKAO_SDK_JS_KEY`
   - Variables:
     - `VITE_SERVER_URL`
     - `VITE_STATIC_ONLY`

### 다른 호스팅 플랫폼

이 프로젝트는 정적 웹사이트이므로 정적 파일을 제공하는 모든 플랫폼에서 호스팅할 수 있습니다.

1. `package.json`의 `homepage` 필드를 본인의 호스팅 플랫폼 URL로 수정

2. 환경변수 설정:
   - 환경변수 설정 방법은 위 환경변수 설정 참고

3. 프로젝트 빌드:

```bash
npm run build
```

4. `build` 디렉토리의 내용을 호스팅 플랫폼에 배포

## 📋 업데이트 내역

### 2025.09.11 - v0.1.0

- CRA에서 Vite로 마이그레이션
- `yarn` 대신 `npm` 사용
- `src/const.ts`의 상수가 적용되지 않던 부분 (ex. `index.html`, `manifest.json`) 개선
- `STATIC_ONLY` 환경변수 설정을 통해 별도의 서버를 필요로 하는 기능을 비활성화 가능
- [Hotfix] Github의 환경변수명에 `VITE_` 접두사가 붙지 않아 혼란이 있었던 문제 수정
- [Hotfix] Naver Map API의 최신 업데이트 반영

### 2025.10.07 - v0.1.1

- TypeScript의 타입 에러 수정
- 웨딩 날짜 포맷 수정 (분 단위가 존재하는 경우 분 단위도 표시하도록 수정)
- `src/const.ts`에 사용법 주석 추가
- [Hotfix] 일부 의존성 패키지의 버전 상향
  - 본 프로젝트는 React Server Component를 사용하지 않아 React2Shell 취약점의 영향을 받지 않습니다. 다만, 커스터마이징 과정에서 해당 기능이 사용될 가능성을 사전에 차단하기 위해 관련 패키지를 업데이트합니다.
