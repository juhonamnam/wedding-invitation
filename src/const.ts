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

export const BRIDE = "정지원"
export const BRIDE_FATHER = "정상원"
export const BRIDE_MOTHER = "박윤정"
export const BRIDE_INFO = [
  { relation: "신부", name: BRIDE, phone: "010-8024-2203", bank: "하나은행", accountNo: "123-456789-012345"},
  { relation: "신부 아버지", name: BRIDE_FATHER, phone: "010-8080-7980" },
  { relation: "신부 어머니", name: BRIDE_MOTHER, phone: "010-5719-2203" },
]

export const GROOM = "남주호"
export const GROOM_FATHER = "남현태"
export const GROOM_MOTHER = "김현영"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM,
    phone: "010-5065-6815",
    bank: "하나은행",
    accountNo: "378-910169-58607",
  },
  { relation: "신랑 아버지", name: GROOM_FATHER, phone: "010-4590-0313" },
  { relation: "신랑 어머니", name: GROOM_MOTHER, phone: "010-5410-0313" },
]
