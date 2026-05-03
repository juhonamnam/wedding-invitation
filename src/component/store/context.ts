/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "react"

/**
 * 네이버 및 카카오 SDK 객체를 전역적으로 공유하기 위한 Context입니다.
 */
export const StoreContext = createContext({
  /** 네이버 지도 SDK 객체 */
  naver: null as any,
  /** 네이버 지도 SDK 객체 설정 함수 */
  setNaver: (() => {}) as (naver: any) => void,
  /** 카카오 SDK 객체 */
  kakao: null as any,
  /** 카카오 SDK 객체 설정 함수 */
  setKakao: (() => {}) as (kakao: any) => void,
})
