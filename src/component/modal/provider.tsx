import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { type ModalInfo, ModalContext } from "./context"

type ModalInfoWithKey = ModalInfo & { key: number }

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalInfoList, setModalInfoList] = useState<ModalInfoWithKey[]>([])

  const modalWrapperRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>
  const modalFocusTrapInitialized = useRef(false)
  const modalKey = useRef(0)

  const openModal = useCallback((modalInfo: ModalInfo) => {
    setModalInfoList((modalInfoList) => {
      if (modalInfoList.length === 0) {
        document.body.classList.add("modal-open")
      }
      return [...modalInfoList, { ...modalInfo, key: modalKey.current++ }]
    })
    modalFocusTrapInitialized.current = false
  }, [])
  const closeModal = useCallback(() => {
    setModalInfoList((modalInfoList) => {
      const result = modalInfoList.slice(0, -1)
      if (result.length === 0) {
        document.body.classList.remove("modal-open")
      }
      return result
    })
  }, [])

  useEffect(() => {
    if (modalInfoList.length === 0) return

    const focusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const lastChild = modalWrapperRef.current.lastElementChild
        if (!lastChild) return

        const FocusableElements = lastChild.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        )

        if (FocusableElements.length === 0) {
          e.preventDefault()
        } else if (!modalFocusTrapInitialized.current) {
          e.preventDefault()
          modalFocusTrapInitialized.current = true
          ;(FocusableElements[0] as HTMLElement).focus()
        } else if (!document.activeElement) {
          e.preventDefault()
          ;(FocusableElements[0] as HTMLElement).focus()
        } else if (
          document.activeElement === FocusableElements[0] &&
          e.shiftKey
        ) {
          e.preventDefault()
          ;(
            FocusableElements[FocusableElements.length - 1] as HTMLElement
          ).focus()
        } else if (
          document.activeElement ===
            FocusableElements[FocusableElements.length - 1] &&
          !e.shiftKey
        ) {
          e.preventDefault()
          ;(FocusableElements[0] as HTMLElement).focus()
        }
      }
    }

    const onFocus = () => {
      modalFocusTrapInitialized.current = true
    }

    window.addEventListener("keydown", focusTrap)
    window.addEventListener("focus", onFocus, true)

    return () => {
      window.removeEventListener("keydown", focusTrap)
      window.removeEventListener("focus", onFocus, true)
    }
  }, [modalInfoList])

  return (
    <ModalContext.Provider value={{ modalInfoList, openModal, closeModal }}>
      {children}
      <div className="modals-wrappeer" ref={modalWrapperRef}>
        {modalInfoList.map((modalInfo, idx) => (
          <div
            key={modalInfo.key}
            className="modal-background"
            style={{ zIndex: 4 + idx }}
            onClick={() => {
              if (modalInfo.closeOnClickBackground) closeModal()
            }}
          >
            <div
              className={`modal${modalInfo.className ? ` ${modalInfo.className}` : ""}`}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div className="header">
                <div className="close-button-wrapper">
                  <button className="close-button" onClick={closeModal} />
                </div>
                {modalInfo.header}
              </div>
              <div className="content">{modalInfo.content}</div>
              <div className="footer">{modalInfo.footer}</div>
            </div>
          </div>
        ))}
      </div>
    </ModalContext.Provider>
  )
}
