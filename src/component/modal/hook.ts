import { useContext } from "react"
import { ModalContext } from "./context"

export const useModal = () => {
  const { openModal, closeModal } = useContext(ModalContext)
  return { openModal, closeModal }
}
