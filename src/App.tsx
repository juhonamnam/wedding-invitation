import { Front } from "./component/front"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"

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
          <div className="section" style={{ height: 500 }}>
            <h1>마음 전하기 (계좌번호)</h1>
          </div>
          {/* 참석 의사 */}
          <div className="section" style={{ height: 400 }}>
            <h1>참석 의사</h1>
          </div>
        </div>

        <div className="section-group">
          {/* 방명록 */}
          <div className="section" style={{ height: 500 }}>
            <h1>방명록</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
