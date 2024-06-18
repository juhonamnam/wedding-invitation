import { WEDDING_DATE } from "../../const"
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
            address: "서울대학교 연구공원 웨딩홀",
            addressTitle: "서울대학교 연구공원 웨딩홀",
            content: {
              title: "남주호 ❤️ 정지원의 결혼식에 초대합니다.",
              description:
                WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시") +
                "\n서울대학교 연구공원 웨딩홀",
              imageUrl:
                window.location.protocol +
                "//" +
                window.location.host +
                process.env.PUBLIC_URL +
                "/preview_image.jpg",
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
