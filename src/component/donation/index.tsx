import { Button } from "../button"

export const Donation = () => {
  return (
    <div className="section donation">
      <h2 className="english">Donation</h2>
      <div className="content">
        참석이 어려워 직접 축하해주지 못하는
        <br />
        분들을 위해 계좌번호를 기재하였습니다.
        <br />
        넓은 마음으로 양해 부탁드립니다.
        <br />
        <br />
      </div>
      <Button
        onClick={() => {
          //
        }}
      >
        신랑측 계좌번호 보기
      </Button>
      <br />
      <Button
        onClick={() => {
          //
        }}
      >
        신부측 계좌번호 보기
      </Button>
    </div>
  )
}
