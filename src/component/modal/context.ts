import { createContext } from "react"

export const ModalContext = createContext({
  wrapperRef: {} as React.RefObject<HTMLElement>,
})
