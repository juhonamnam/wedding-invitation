import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2024-08-24 13:00", "Asia/Seoul")
export const HOLIDAYS = [15]

export const LOCATION = "서울대학교 연구공원 웨딩홀"
export const LOCATION_ADDRESS = "서울시 관악구 관악로 1, 연구공원 본관 1층"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

export const WEDDING_HALL_POSITION = [126.9594982, 37.4657134]

export const NMAP_PLACE_ID = 13321741
export const KMAP_PLACE_ID = 8634826

export const BRIDE_FULLNAME = "정지원"
export const BRIDE_FIRSTNAME = "지원"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "정상원"
export const BRIDE_MOTHER = "박윤정"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-0000-0000",
    account: "우리은행 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000000",
  },
]

export const GROOM_FULLNAME = "남주호"
export const GROOM_FIRSTNAME = "주호"
export const GROOM_TITLE = "차남"
export const GROOM_FATHER = "남현태"
export const GROOM_MOTHER = "김현영"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-0000-0000",
    account: "하나은행 00000000000000",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "국민은행 000000000000",
  },
]
