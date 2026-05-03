import { PropsWithChildren, useEffect, useRef } from "react"
import { ModalContext } from "./context"

/**
 * 모달 시스템을 위한 Provider 컴포넌트입니다.
 * 애플리케이션 최상위 수준에서 모달의 렌더링 위치(Portal)와 포커스 트랩을 관리합니다.
 *
 * @param {PropsWithChildren} props - 하위 컴포넌트
 * @returns {JSX.Element} ModalProvider 컴포넌트
 */
export const ModalProvider = ({ children }: PropsWithChildren) => {
  // 모달들이 실제로 렌더링될 DOM 요소의 참조
  const wrapperRef = useRef({} as HTMLDivElement)

  useEffect(() => {
    /**
     * 접근성을 위한 포커스 트랩 (Focus Trap) 기능
     * 모달이 열려 있을 때 Tab 키를 누르면 모달 내부에서만 포커스가 순환하도록 합니다.
     */
    const focusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const lastModalElement = wrapperRef.current.lastChild as HTMLElement

        if (!lastModalElement) return

        // 포커스 가능한 요소들을 찾습니다.
        const FocusableElements = lastModalElement.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ) as NodeListOf<HTMLElement>

        if (FocusableElements.length === 0) {
          e.preventDefault()
          return
        }

        if (!document.activeElement) {
          e.preventDefault()
          FocusableElements[0].focus()
          return
        }

        let idx = -1

        for (let i = 0; i < FocusableElements.length; i++) {
          if (FocusableElements[i] === document.activeElement) {
            idx = i
            break
          }
        }

        if (idx === -1) {
          e.preventDefault()
          FocusableElements[0].focus()
          return
        }

        // Shift + Tab 지원
        if (e.shiftKey) {
          if (idx === 0) {
            e.preventDefault()
            FocusableElements[FocusableElements.length - 1].focus()
          }
        } else {
          if (idx === FocusableElements.length - 1) {
            e.preventDefault()
            FocusableElements[0].focus()
          }
        }
      }
    }

    /**
     * DOM 변화를 감지하여 모달 오픈 여부에 따라 body 클래스를 제어합니다.
     * 모달이 하나라도 열려 있으면 스크롤을 방지하기 위해 'modal-open' 클래스를 추가합니다.
     */
    const mutationObserver = new MutationObserver((mutationList) => {
      let mutated = false
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          mutated = true
          break
        }
      }

      if (!mutated) return

      const hasModals = wrapperRef.current.childElementCount > 0

      if (hasModals) {
        document.body.classList.add("modal-open")
      } else {
        document.body.classList.remove("modal-open")
      }
    })

    mutationObserver.observe(wrapperRef.current, {
      childList: true,
    })

    window.addEventListener("keydown", focusTrap)

    return () => {
      window.removeEventListener("keydown", focusTrap)
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <ModalContext.Provider value={{ wrapperRef }}>
      {children}
      {/* 모든 모달이 실제로 렌더링될 위치 */}
      <div className="modals-wrapper" ref={wrapperRef}></div>
    </ModalContext.Provider>
  )
}
