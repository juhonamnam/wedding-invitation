import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"

const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`
const KAKAO_SDK_URL = `${process.env.PUBLIC_URL}/kakao.min.js`

const GlobalContext = createContext({
  naver: null as any,
  setNaver: (_naver: any) => {},
  kakao: null as any,
  setKakao: (_kakao: any) => {},
})

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [naver, setNaver] = useState<any>(null)
  const [kakao, setKakao] = useState<any>(null)

  return (
    <GlobalContext.Provider value={{ naver, setNaver, kakao, setKakao }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useNaver = () => {
  const { naver, setNaver } = useContext(GlobalContext)
  useEffect(() => {
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
