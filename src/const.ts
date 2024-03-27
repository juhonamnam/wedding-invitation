import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export const WEDDING_DATE = dayjs.tz("2024-08-24 13:00", "Asia/Seoul")
export const HOLIDAYS = [15]

export const BRIDE = "정지원"
export const BRIDE_FATHER = "정상원"
export const BRIDE_MOTHER = "박윤정"

export const GROOM = "남주호"
export const GROOM_FATHER = "남현태"
export const GROOM_MOTHER = "김현영"
