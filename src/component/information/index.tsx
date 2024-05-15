import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"

export const Information = () => {
  return (
    <LazyDiv className="card information">
      <h2 className="english">Information</h2>
      <div className="info-card">
        <div className="label">식사 안내</div>
        <div className="content">
          식사시간: 12시 30분 ~ 14시 30분
          <br />
          장소: 지하 1층 연회장
        </div>
      </div>

      <div className="info-card">
        <div className="label">마음 전하기</div>
        <div className="content">
          참석이 어려워 직접 축하해주지 못하는
          <br />
          분들을 위해 계좌번호를 기재하였습니다.
          <br />
          넓은 마음으로 양해 부탁드립니다.
        </div>

        <div className="break" />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            //
          }}
        >
          신랑측 계좌번호 보기
        </Button>
        <div className="break" />
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            //
          }}
        >
          신부측 계좌번호 보기
        </Button>
      </div>
    </LazyDiv>
  )
}
