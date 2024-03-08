import { useEffect, useRef, useState } from "react"

const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  mapOption?: {
    center: [number, number]
    zoom: number
  }
  markerOptions?: Array<{ position: [number, number] }>
}

export const Map = (props: MapProps) => {
  const { mapOption, markerOptions, ...rest } = props

  return process.env.REACT_APP_NAVER_MAP_CLIENT_ID ? (
    <NaverMap {...props} />
  ) : (
    <div {...rest}>
      Client id for naver map api is not defined. Please add your client id in
      <code>.env</code> file in the following format: <br />
      <code>REACT_APP_NAVER_MAP_CLIENT_ID=your_client_id</code>
    </div>
  )
}

const NaverMap = (props: MapProps) => {
  const { mapOption = {}, markerOptions = [], ...rest } = props

  const [naver, setNaver] = useState<any>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!document.querySelector(`script[src="${NAVER_MAP_URL}"]`)) {
      const script = document.createElement("script")
      script.addEventListener("load", () => {
        setNaver((window as any).naver)
      })
      script.src = NAVER_MAP_URL
      document.head.appendChild(script)
    } else {
      setNaver((window as any).naver)
    }
  }, [])

  useEffect(() => {
    if (naver) {
      const map = new naver.maps.Map(ref.current, mapOption)

      for (const markerOption of markerOptions) {
        new naver.maps.Marker({ ...markerOption, map })
      }
      return () => {
        map.destroy()
      }
    }
  }, [naver, mapOption, markerOptions])

  return <div {...rest} ref={ref}></div>
}
