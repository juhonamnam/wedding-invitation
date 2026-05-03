/**
 * 네이버 지도 클라이언트 ID
 * .env 파일의 VITE_NAVER_MAP_CLIENT_ID에서 가져옵니다.
 */
export const NAVER_MAP_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID

/**
 * 카카오 SDK 자바스크립트 키
 * .env 파일의 VITE_KAKAO_SDK_JS_KEY에서 가져옵니다.
 */
export const KAKAO_SDK_JS_KEY = import.meta.env.VITE_KAKAO_SDK_JS_KEY

/**
 * 백엔드 서버 URL (방명록 기능 등에 사용)
 * .env 파일의 VITE_SERVER_URL에서 가져옵니다.
 */
export const SERVER_URL = import.meta.env.VITE_SERVER_URL

/**
 * 정적 페이지 모드 여부
 * true일 경우 서버 연동 기능(방명록 등)이 비활성화됩니다.
 */
export const STATIC_ONLY = import.meta.env.VITE_STATIC_ONLY === "true"
