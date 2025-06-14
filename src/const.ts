import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"
import image1 from "./image/image1.png"
import image2 from "./image/image2.png"
import image3 from "./image/image3.png"
import image4 from "./image/image4.png"
import image5 from "./image/image5.png"
import image6 from "./image/image6.png"
import image7 from "./image/image7.png"
import image8 from "./image/image8.png"
import image9 from "./image/image9.png"
import image10 from "./image/image10.png"
import image11 from "./image/image11.png"
import image12 from "./image/image12.png"

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

export const GALLERY_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
]
