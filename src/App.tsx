import { Front } from "./component/front"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Donation } from "./component/donation"
import { GuestBook } from "./component/guestbook"

function App() {
  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">
        <div className="section-group">
          {/* 표지 */}
          <Front />

          {/* 모시는 글 */}
          <Invitation />
        </div>

        <div className="section-group">
          {/* 결혼식 날짜 (달력) */}
          <Calendar />

          {/* 겔러리 */}
          <Gallery />
        </div>

        <div className="section-group">
          {/* 오시는길 */}
          <Location />
        </div>

        <div className="section-group">
          {/* 마음 전하기 */}
          <Donation />
          {/* 방명록 */}
          <GuestBook />
        </div>
      </div>
    </div>
  )
}

export default App
