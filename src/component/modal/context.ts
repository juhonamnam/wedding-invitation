import { createContext, ReactNode } from "react"

export type ModalInfo = {
  header?: ReactNode
  className?: string
  footer?: ReactNode
  content: ReactNode
  closeOnClickBackground?: boolean
}

export const ModalContext = createContext({
  modalInfoList: [] as ModalInfo[],
  openModal: (() => {}) as (component: ModalInfo) => void,
  closeModal: () => {},
})
