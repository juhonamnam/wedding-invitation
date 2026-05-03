/* eslint-disable @typescript-eslint/no-explicit-any */

import { PropsWithChildren, useState } from "react"
import { StoreContext } from "./context"

/**
 * 네이버 지도 및 카카오 SDK 상태를 관리하는 Provider 컴포넌트입니다.
 *
 * @param {PropsWithChildren} props - 하위 컴포넌트
 * @returns {JSX.Element} StoreProvider 컴포넌트
 */
export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [naver, setNaver] = useState<any>(null)
  const [kakao, setKakao] = useState<any>(null)

  return (
    <StoreContext.Provider value={{ naver, setNaver, kakao, setKakao }}>
      {children}
    </StoreContext.Provider>
  )
}
