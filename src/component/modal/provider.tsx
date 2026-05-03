import { PropsWithChildren, useEffect, useRef } from "react"
import { ModalContext } from "./context"

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const wrapperRef = useRef({} as HTMLDivElement)

  useEffect(() => {
    const focusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const lastModalElement = wrapperRef.current.lastChild as HTMLElement

        if (!lastModalElement) return

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

    const mutationObserver = new MutationObserver((mutationList, observer) => {
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
      <div className="modals-wrapper" ref={wrapperRef}></div>
    </ModalContext.Provider>
  )
}
