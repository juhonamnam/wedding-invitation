import { useEffect, useMemo, useState } from "react"
import {
  BRIDE_FIRSTNAME,
  GROOM_FIRSTNAME,
  HOLIDAYS,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

// 해당 월의 첫 번째 날의 요일과 총 일수를 계산합니다.
const firstDayOfWeek = WEDDING_DATE.startOf("month").day()
const daysInMonth = WEDDING_DATE.daysInMonth()

/**
 * 결혼식 날짜를 표시하는 달력과 디데이 카운트다운 컴포넌트입니다.
 *
 * @returns {JSX.Element} 달력 및 카운트다운 섹션
 */
export const Calendar = () => {
  // 현재 시간과 예식 시간의 차이를 관리합니다.
  const [tsDiff, setTsDiff] = useState(WEDDING_DATE.diff())

  /**
   * 예식일까지 남은 일수를 계산합니다.
   */
  const dayDiff = useMemo(() => {
    const dayOffset = WEDDING_DATE.diff(WEDDING_DATE.startOf("day"))
    return Math.ceil((tsDiff - dayOffset) / 1000 / 60 / 60 / 24)
  }, [tsDiff])

  // 매 초마다 시간을 업데이트합니다.
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = WEDDING_DATE.diff()
      setTsDiff(diff)
    }, 1000)

    return () => clearInterval(interval)
  })

  /**
   * 남은 시간을 일, 시, 분, 초 단위로 변환합니다.
   */
  const diffs = useMemo(() => {
    const tsDiff_ = Math.abs(tsDiff)
    const seconds = Math.floor((tsDiff_ % 60000) / 1000)
    const minutes = Math.floor((tsDiff_ % 3600000) / 60000)
    const hours = Math.floor((tsDiff_ % 86400000) / 3600000)
    const days = Math.floor(tsDiff_ / 86400000)
    const isAfter = tsDiff < 0

    return { days, hours, minutes, seconds, isAfter }
  }, [tsDiff])

  return (
    <LazyDiv className="card calendar">
      <h2 className="english">The Wedding Day</h2>
      <div className="break" />
      {/* 예식 일시 표시 */}
      {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}

      {/* 달력 영역 */}
      <div className="calendar-wrapper">
        <div className="head holiday">
          <span>Su</span>
        </div>
        <div className="head">
          <span>Mo</span>
        </div>
        <div className="head">
          <span>Tu</span>
        </div>
        <div className="head">
          <span>We</span>
        </div>
        <div className="head">
          <span>Th</span>
        </div>
        <div className="head">
          <span>Fr</span>
        </div>
        <div className="head">
          <span>Sa</span>
        </div>

        {/* 첫 주 빈 공간 채우기 */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={i} />
        ))}

        {/* 날짜 표시 */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1
          const classes = []
          const isSunday = (i + firstDayOfWeek) % 7 === 0

          // 일요일 또는 지정된 휴무일일 경우 'holiday' 클래스 추가
          if (isSunday || HOLIDAYS.includes(date)) {
            classes.push("holiday")
          }

          const isWeddingDate = date === WEDDING_DATE.date()

          // 예식일일 경우 'wedding-date' 클래스 추가
          if (isWeddingDate) {
            classes.push("wedding-date")
          }

          return (
            <div
              key={i}
              className={classes.length ? classes.join(" ") : undefined}
            >
              <span>{date}</span>
              {isWeddingDate && <div className="heart" />}
            </div>
          )
        })}
      </div>

      {/* 카운트다운 영역 */}
      <div className="countdown-wrapper">
        <div className="countdown">
          <div className="unit">DAY</div>
          <div />
          <div className="unit">HOUR</div>
          <div />
          <div className="unit">MIN</div>
          <div />
          <div className="unit">SEC</div>
          <div className="count">{diffs.days}</div>
          <span>:</span>
          <div className="count">{diffs.hours}</div>
          <span>:</span>
          <div className="count">{diffs.minutes}</div>
          <span>:</span>
          <div className="count">{diffs.seconds}</div>
        </div>
        <div className="message">
          {GROOM_FIRSTNAME} & {BRIDE_FIRSTNAME}의 결혼식이{" "}
          {dayDiff > 0 ? (
            <>
              <span className="d-day">{dayDiff}</span>일 남았습니다.
            </>
          ) : dayDiff === 0 ? (
            <>오늘입니다.</>
          ) : (
            <>
              <span className="d-day">{-dayDiff}</span>일 지났습니다.
            </>
          )}
        </div>
      </div>
    </LazyDiv>
  )
}
