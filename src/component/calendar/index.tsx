import { useEffect, useMemo, useState } from "react"
import {
  BRIDE_FIRSTNAME,
  GROOM_FIRSTNAME,
  HOLIDAYS,
  WEDDING_DATE,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

const firstDayOfWeek = WEDDING_DATE.startOf("month").day()
const daysInMonth = WEDDING_DATE.daysInMonth()

export const Calendar = () => {
  const [tsDiff, setTsDiff] = useState(WEDDING_DATE.diff())

  const dayDiff = useMemo(() => {
    const dayOffset = WEDDING_DATE.diff(WEDDING_DATE.startOf("day"))
    return Math.ceil((tsDiff - dayOffset) / 1000 / 60 / 60 / 24)
  }, [tsDiff])

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = WEDDING_DATE.diff()

      setTsDiff(diff)
    }, 1000)

    return () => clearInterval(interval)
  })

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
      {WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시")}
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
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={i} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1

          const classes = []

          const isSunday = (i + firstDayOfWeek) % 7 === 0

          if (isSunday || HOLIDAYS.includes(date)) {
            classes.push("holiday")
          }

          const isWeddingDate = date === WEDDING_DATE.date()

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
