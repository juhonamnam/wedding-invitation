import { type PropsWithChildren, useContext } from "react"
import { createPortal } from "react-dom"
import { ModalContext } from "./context"

/**
 * 리액트 포탈을 이용해 모달을 특정 DOM 위치에 렌더링하는 내부 컴포넌트입니다.
 */
const Portal = ({
  targetRef,
  children,
}: PropsWithChildren<{ targetRef: React.RefObject<HTMLElement> }>) => {
  if (!targetRef.current) return null
  return createPortal(children, targetRef.current)
}

/**
 * 모달 컴포넌트의 Props 타입 정의
 */
type ModalProps = PropsWithChildren<{
  /** 모달의 열림/닫힘 상태와 상태 변경 함수 [open, setOpen] */
  modalState: [boolean, (n: boolean) => void]
  /** 배경 클릭 시 모달 닫기 여부 (기본값: true) */
  closeOnClickBackground?: boolean
  /** 우측 상단 닫기 버튼 표시 여부 (기본값: true) */
  showCloseButton?: boolean
  /** 커스텀 클래스 명 */
  className?: string
}>

/**
 * 범용적으로 사용할 수 있는 모달 컴포넌트입니다.
 * ModalProvider에서 제공하는 wrapperRef 위치에 렌더링됩니다.
 *
 * @param {ModalProps} props - 모달 설정 속성
 * @returns {JSX.Element | null} 모달 화면
 */
export const Modal = ({
  children,
  closeOnClickBackground = true,
  showCloseButton = true,
  modalState: [open, setOpen],
  className,
}: ModalProps) => {
  const { wrapperRef } = useContext(ModalContext)

  // 모달 상태가 false면 렌더링하지 않음
  if (!open) return null

  return (
    <Portal targetRef={wrapperRef}>
      <div
        className="modal-background"
        onClick={() => {
          // 배경 클릭 시 닫기 설정이 되어 있으면 모달을 닫음
          if (closeOnClickBackground) setOpen(false)
        }}
      >
        <div
          className={`modal${className ? ` ${className}` : ""}`}
          onClick={(e) => {
            // 모달 내부 클릭 시 이벤트 전파 중단 (배경 클릭 이벤트 방지)
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
