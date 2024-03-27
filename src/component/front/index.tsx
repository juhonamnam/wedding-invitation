import { BRIDE, GROOM, WEDDING_DATE } from "../../const"
import sample from "../../image/sample5.png"

export const Front = () => {
  return (
    <div className="section front">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "right",
          alignItems: "right",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <div className="title">우리</div>
          <div className="title-deco">
            {WEDDING_DATE.format("MM")}
            <br />
            {WEDDING_DATE.format("DD")}
          </div>
          <div className="title">결혼합니다</div>
        </div>
      </div>
      <img src={sample} alt="sample" style={{ width: "100%" }} />
      <p className="subtitle">Save the date for the wedding of</p>
      <p>
        {GROOM} & {BRIDE}
      </p>
      <p>{WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시")}</p>
      <p>서울대 연구공원 웨딩홀</p>
    </div>
  )
}
