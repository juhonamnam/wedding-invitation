import ktalkIcon from "../../image/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"

export const ShareButton = () => {
  return (
    <LazyDiv className="footer share-button">
      <div className="ktalk-share" onClick={() => {}}>
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </div>
    </LazyDiv>
  )
}
