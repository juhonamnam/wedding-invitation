import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-09-12 14:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 9월 공휴일 확인 후 날짜 숫자 추가 (예: 추석 연휴 등)
export const HOLIDAYS: number[] = []

export const LOCATION = "밀리토피아호텔 바이 마린 3F 카멜리아홀"
export const LOCATION_ADDRESS = "경기 성남시 수정구 위례대로 83\n밀리토피아호텔 바이마린 웨딩센터"

// 카카오톡 공유 시 위치 정보로 사용할 주소.
export const SHARE_ADDRESS = "밀리토피아호텔 바이마린 웨딩센터"
export const SHARE_ADDRESS_TITLE = LOCATION

// TODO: 네이버 지도 및 카카오 네비게이션에 사용할 좌표. [경도, 위도] 형식.
// 카카오맵에서 호텔 검색 → 지도에서 우클릭 → "이 위치 복사"로 확인 가능
export const WEDDING_HALL_POSITION = [127.1436123, 37.4674751]

// TODO: 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/13321741 -> 13321741
export const NMAP_PLACE_ID = 534388534

// TODO: 카카오 지도의 웨딩홀 장소 ID
// 카카오 지도 웹페이지에서 웨딩홀 검색 후 상세보기 클릭 시 URL에서 확인 가능.
// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 27501134

export const BRIDE_FULLNAME = "윤유진"
export const BRIDE_FIRSTNAME = "유진"
export const BRIDE_TITLE = "차녀"
export const BRIDE_FATHER = "윤영환"
export const BRIDE_MOTHER = "이선화"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-3303-9837",
    account: "우리은행 1002-852-277873",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-6318-1901",
    account: "우리은행 339-143114-02-001",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-8739-9837",
    account: "신한은행 110136109547",
  },
]

export const GROOM_FULLNAME = "신호현"
export const GROOM_FIRSTNAME = "호현"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "신동주"
export const GROOM_MOTHER = "김양옥"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-6203-7288",
    account: "국민은행 942902-00-158775",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-9776-7288",
    account: "국민은행 109-21-0761-822",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-7258-8522",
    account: "국민은행 561801-01-142452",
  },
]
