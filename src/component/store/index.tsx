import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`
const KAKAO_SDK_URL = `${process.env.PUBLIC_URL}/kakao.min.js`

type ModalInfo = {
  header?: ReactNode
  className?: string
  content: ReactNode
  closeOnClickBackground?: boolean
}

const GlobalContext = createContext({
  naver: null as any,
  setNaver: (_naver: any) => {},
  kakao: null as any,
  setKakao: (_kakao: any) => {},
  modalInfoList: [] as ModalInfo[],
  openModal: (_component: ModalInfo) => {},
  closeModal: () => {},
})

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [naver, setNaver] = useState<any>(null)
  const [kakao, setKakao] = useState<any>(null)
  const [modalInfoList, setModalInfoList] = useState<ModalInfo[]>([])
  const openModal = (modalInfo: ModalInfo) => {
    setModalInfoList((modalInfoList) => {
      if (modalInfoList.length === 0) {
        document.body.classList.add("modal-open")
      }
      return [...modalInfoList, modalInfo]
    })
  }
  const closeModal = () => {
    setModalInfoList((modalInfoList) => {
      const result = modalInfoList.slice(0, -1)
      if (result.length === 0) {
        document.body.classList.remove("modal-open")
      }
      return result
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        naver,
        setNaver,
        kakao,
        setKakao,
        modalInfoList,
        openModal,
        closeModal,
      }}
    >
      {children}
      {modalInfoList.map((modalInfo, idx) => (
        <div
          key={idx}
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
                <div className="close-button" onClick={closeModal} />
              </div>
              {modalInfo.header}
            </div>
            <div className="content">{modalInfo.content}</div>
          </div>
        </div>
      ))}
    </GlobalContext.Provider>
  )
}

export const useNaver = () => {
  const { naver, setNaver } = useContext(GlobalContext)
  useEffect(() => {
    if (!process.env.REACT_APP_NAVER_MAP_CLIENT_ID) {
      return
    }

    if (!document.querySelector(`script[src="${NAVER_MAP_URL}"]`)) {
      const script = document.createElement("script")
      script.src = NAVER_MAP_URL
      document.head.appendChild(script)
      script.addEventListener("load", () => {
        setNaver((window as any).naver)
      })
    }
  }, [naver, setNaver])

  return naver
}

export const useKakao = () => {
  const { kakao, setKakao } = useContext(GlobalContext)
  useEffect(() => {
    if (!process.env.REACT_APP_KAKAO_SDK_JS_KEY) {
      return
    }

    if (!document.querySelector(`script[src="${KAKAO_SDK_URL}"]`)) {
      const script = document.createElement("script")
      script.addEventListener("load", () => {
        if (!(window as any).Kakao.isInitialized()) {
          ;(window as any).Kakao.init(process.env.REACT_APP_KAKAO_SDK_JS_KEY)
        }
        setKakao((window as any).Kakao)
      })
      script.src = KAKAO_SDK_URL
      document.head.appendChild(script)
    }
  }, [kakao, setKakao])

  return kakao
}

export const useModal = () => {
  const { openModal, closeModal } = useContext(GlobalContext)
  return { openModal, closeModal }
}
