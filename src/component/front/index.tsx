import { BRIDE, GROOM, WEDDING_DATE } from "../../const"
import sample from "../../image/sample5.png"
import { LazyDiv } from "../lazyDiv"

export const Front = () => {
  return (
    <LazyDiv className="card front">
      <div className="title-group">
        <div className="title">우리</div>
        <div className="title-deco">
          {WEDDING_DATE.format("MM")}
          <br />
          {WEDDING_DATE.format("DD")}
        </div>
        <div className="title">결혼합니다</div>
      </div>
      <img
        src={sample}
        alt="sample"
        width="100%"
        height="25rem"
        style={{ width: "100%", height: "auto" }}
      />
      <br />
      <span className="subtitle">Save the date for the wedding of</span>
      <br />
      <span>
        {GROOM} & {BRIDE}
      </span>
      <br />
      <span>{WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시")}</span>
      <br />
      <span>서울대 연구공원 웨딩홀</span>
      <br />
    </LazyDiv>
  )
}
