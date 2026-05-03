import { type PropsWithChildren, useContext } from "react"
import { createPortal } from "react-dom"
import { ModalContext } from "./context"

const Portal = ({
  targetRef,
  children,
}: PropsWithChildren<{ targetRef: React.RefObject<HTMLElement> }>) => {
  if (!targetRef.current) return null
  return createPortal(children, targetRef.current)
}

type ModalProps = PropsWithChildren<{
  modalState: [boolean, (n: boolean) => void]
  closeOnClickBackground?: boolean
  showCloseButton?: boolean
  className?: string
}>

export const Modal = ({
  children,
  closeOnClickBackground = true,
  showCloseButton = true,
  modalState: [open, setOpen],
  className,
}: ModalProps) => {
  const { wrapperRef } = useContext(ModalContext)

  if (!open) return null

  return (
    <Portal targetRef={wrapperRef}>
      <div
        className="modal-background"
        onClick={() => {
          if (closeOnClickBackground) setOpen(false)
        }}
      >
        <div
          className={`modal${className ? ` ${className}` : ""}`}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {showCloseButton && (
            <div className="close-button-wrapper">
              <button
                className="close-button"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                }}
              ></button>
            </div>
          )}
          {children}
        </div>
      </div>
    </Portal>
  )
}
