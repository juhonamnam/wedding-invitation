import {
  BRIDE_FIRSTNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
} from "../../const"
import ktalkIcon from "../../image/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

export const ShareButton = () => {
  const kakao = useKakao()
  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          if (!kakao) {
            return
          }

          kakao.Share.sendDefault({
            objectType: "location",
            address: SHARE_ADDRESS,
            addressTitle: SHARE_ADDRESS_TITLE,
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FIRSTNAME}의 결혼식에 초대합니다.`,
              description:
                WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시") +
                "\n" +
                LOCATION,
              imageUrl:
                window.location.protocol +
                "//" +
                window.location.host +
                process.env.PUBLIC_URL +
                "/preview_image.png",
              link: {
                mobileWebUrl:
                  window.location.protocol +
                  "//" +
                  window.location.host +
                  process.env.PUBLIC_URL,
                webUrl:
                  window.location.protocol +
                  "//" +
                  window.location.host +
                  process.env.PUBLIC_URL,
              },
            },
            buttons: [
              {
                title: "초대장 보기",
                link: {
                  mobileWebUrl:
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    process.env.PUBLIC_URL,
                  webUrl:
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    process.env.PUBLIC_URL,
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
