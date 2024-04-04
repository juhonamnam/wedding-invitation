import { useEffect, useRef, useState } from "react"

const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`
const WEDDING_HALL_POSITION = [126.9594982, 37.4657134]
const BUS_STOP_POSITION = [126.957706, 37.465071]
const PARKING_LOT_POSITION = [126.960266, 37.465467]

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  mapOption?: {
    center: [number, number]
    zoom: number
  }
  markerOptions?: Array<{ position: [number, number] }>
}

export const Map = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return process.env.REACT_APP_NAVER_MAP_CLIENT_ID ? (
    <NaverMap {...props} />
  ) : (
    <div {...props}>
      Client id for naver map api is not defined. Please add your client id in
      <code>.env</code> file in the following format: <br />
      <code>REACT_APP_NAVER_MAP_CLIENT_ID=your_client_id</code>
    </div>
  )
}

const NaverMap = (props: MapProps) => {
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
      const map = new naver.maps.Map(ref.current, {
        center: WEDDING_HALL_POSITION,
        zoom: 17,
      })

      new naver.maps.Marker({ position: WEDDING_HALL_POSITION, map })
      new naver.maps.Marker({ position: BUS_STOP_POSITION, map })
      new naver.maps.Marker({ position: PARKING_LOT_POSITION, map })

      return () => {
        map.destroy()
      }
    }
  }, [naver])

  return <div {...props} ref={ref}></div>
}
