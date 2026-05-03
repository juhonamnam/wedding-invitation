import { createContext } from "react"

/**
 * 모달의 전역 상태를 관리하기 위한 Context입니다.
 * 모달이 렌더링될 대상 DOM(wrapperRef)을 공유합니다.
 */
export const ModalContext = createContext({
  wrapperRef: {} as React.RefObject<HTMLElement>,
})
