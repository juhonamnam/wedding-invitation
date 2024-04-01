import { useEffect, useMemo, useState } from "react"
import { HOLIDAYS, WEDDING_DATE } from "../../const"

const firstDayOfWeek = WEDDING_DATE.startOf("month").day()
const daysInMonth = WEDDING_DATE.daysInMonth()

export const Calendar = () => {
  const [tsDiff, setTsDiff] = useState(WEDDING_DATE.diff())

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
    <div className="section calendar">
      <h2 className="english">Calendar</h2>
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

      <div className="d-day">
        <div>day: {diffs.days}</div>
        <div>hour: {diffs.hours}</div>
        <div>minute: {diffs.minutes}</div>
        <div>second: {diffs.seconds}</div>
      </div>
    </div>
  )
}
