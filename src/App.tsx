import { Map } from "./component/map"

function App() {
  return (
    <div className="background">
      <div className="card-view">
        {/* 표지 */}
        <div className="section" style={{ height: 700 }}>
          <h1>표지</h1>
        </div>

        {/* 모시는 글 */}
        <div className="section" style={{ height: 700 }}>
          <h1>모시는글</h1>
        </div>

        {/* 신랑 신부 정보 + 사진 */}
        <div className="section" style={{ height: 700 }}>
          <h1>신랑 신부 정보 + 사진</h1>
        </div>

        {/* 결혼식 날짜 (달력) */}
        <div className="section" style={{ height: 700 }}>
          <h1>결혼식 날짜 (달력)</h1>
        </div>

        {/* 겔러리 */}
        <div className="section" style={{ height: 700 }}>
          <h1>겔러리</h1>
        </div>

        {/* 오시는길 */}
        <div className="section" style={{ height: 700 }}>
          <h1>오시는길</h1>
          <Map
            style={{ width: 400, height: 400 }}
            mapOption={{ center: [126.9594982, 37.4657134], zoom: 17 }}
            markerOptions={[{ position: [126.9594982, 37.4657134] }]}
          />
        </div>

        {/* 마음 전하기 */}
        <div className="section" style={{ height: 500 }}>
          <h1>마음 전하기 (계좌번호)</h1>
        </div>

        {/* 참석 의사 */}
        <div className="section" style={{ height: 400 }}>
          <h1>참석 의사</h1>
        </div>

        {/* 방명록 */}
        <div className="section" style={{ height: 500 }}>
          <h1>방명록</h1>
        </div>

        {/* Footer 공유하기 링크 복사 */}
        <div className="section" style={{ height: 400 }}>
          <h1>공유하기 및 링크 복사</h1>
        </div>
      </div>
    </div>
  )
}

export default App
