import { BRIDE, GROOM, WEDDING_DATE } from "../../const"
import sample from "../../image/sample5.png"
import { LazyDiv } from "../lazyDiv"

export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      <div className="title-group">
        <div className="title">우리</div>
        <div className="title-deco">
          <div>{WEDDING_DATE.format("MM")}</div>
          <div>{WEDDING_DATE.format("DD")}</div>
        </div>
        <div className="title">결혼합니다</div>
      </div>
      <div className="image-wrapper">
        <img src={sample} alt="sample" />
      </div>
      <div className="subtitle">Save the date for the wedding of</div>
      <div className="content">
        {GROOM} & {BRIDE}
      </div>
      <div className="content">
        {WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시")}
      </div>
      <div className="content">서울대 연구공원 웨딩홀</div>
    </LazyDiv>
  )
}
