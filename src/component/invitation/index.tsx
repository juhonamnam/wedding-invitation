import {
  BRIDE,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM,
  GROOM_FATHER,
  GROOM_MOTHER,
} from "../../const"
import { Button } from "../button"

export const Invitation = () => {
  return (
    <div className="section invitation">
      <p className="title">초대합니다</p>
      <p className="content">
        서로 마주 보며 다져온 사랑이 이제 결실을 맺습니다.
      </p>
      <p className="content">
        함께 한곳을 바라보며 서로 돕는 배필이 되려 합니다.{" "}
      </p>
      <p className="content"> 사랑이라는 이름의 가정을 이루고 </p>
      <p className="content">예쁘게 키워갈 수 있도록 증인이 되어 주시고</p>
      <p className="content">축복해 주시길 소망합니다.</p>

      <br />

      <p>
        {GROOM_FATHER} · {GROOM_MOTHER}
        <span className="relation">
          의 <span className="relation-name">아들</span>
        </span>{" "}
        {GROOM}
      </p>
      <p>
        {BRIDE_FATHER} · {BRIDE_MOTHER}
        <span className="relation">
          의 <span className="relation-name">딸</span>
        </span>{" "}
        {BRIDE}
      </p>

      <br />

      <Button onClick={() => alert("test")}>연락하기</Button>
    </div>
  )
}
