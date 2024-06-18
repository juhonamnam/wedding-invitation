import { useEffect, useState, useRef } from "react"
import { useKakao, useNaver } from "../../component/store"
import nmapIcon from "../../image/nmap-icon.png"
import knaviIcon from "../../image/knavi-icon.png"
import tmapIcon from "../../image/tmap-icon.png"
import { ReactComponent as LockIcon } from "../../image/lock-icon.svg"
import { ReactComponent as UnlockIcon } from "../../image/unlock-icon.svg"

const WEDDING_HALL_POSITION = [126.9594982, 37.4657134]
// const BUS_STOP_POSITION = [126.957706, 37.465071]
// const PARKING_LOT_POSITION = [126.960266, 37.465467]

const NMAP_PLACE_ID = 13321741
const KMAP_PLACE_ID = 8634826

export const Map = () => {
  return process.env.REACT_APP_NAVER_MAP_CLIENT_ID ? (
    <NaverMap />
  ) : (
    <div>Map is not available</div>
  )
}

const NaverMap = () => {
  const naver = useNaver()
  const kakao = useKakao()
  const ref = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<NodeJS.Timeout>()

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

  useEffect(() => {
    if (naver) {
      const map = new naver.maps.Map(ref.current, {
        center: WEDDING_HALL_POSITION,
        zoom: 17,
      })

      new naver.maps.Marker({ position: WEDDING_HALL_POSITION, map })
      // new naver.maps.Marker({ position: BUS_STOP_POSITION, map })
      // new naver.maps.Marker({ position: PARKING_LOT_POSITION, map })

      return () => {
        map.destroy()
      }
    }
  }, [naver])

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            clearTimeout(lockMessageTimeout.current)
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>
        <div className="map-inner" ref={ref}></div>
      </div>
      <div className="navigation">
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                if (kakao)
                  kakao.Navi.start({
                    name: "서울대학교 연구공원 웨딩홀",
                    x: WEDDING_HALL_POSITION[0],
                    y: WEDDING_HALL_POSITION[1],
                    coordType: "wgs84",
                  })
                break
              default:
                window.open(
                  `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                const params = new URLSearchParams({
                  goalx: WEDDING_HALL_POSITION[0].toString(),
                  goaly: WEDDING_HALL_POSITION[1].toString(),
                  goalName: "서울대학교 연구공원 웨딩홀",
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              default:
                alert("모바일에서 확인하실 수 있습니다.")
                break
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div>
    </>
  )
}
