import { Fragment } from "react/jsx-runtime"
import {
  BRIDE,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
} from "../../const"
import { useModal } from "../../component/store"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { ReactComponent as PhoneIcon } from "../../image/phone-flip-icon.svg"
import { ReactComponent as EnvelopeIcon } from "../../image/envelope-icon.svg"

export const Invitation = () => {
  const { openModal } = useModal()
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Invitation</h2>

      <div className="break" />

      <div className="content">초록빛 싱그러운 여름</div>
      <div className="content">새로이 시작하는 작은 사랑이</div>
      <div className="content">보다 크고 깊은 사랑이 되려고 합니다.</div>
      <div className="content">함께 자리하시어</div>
      <div className="content">축복해 주시면 감사하겠습니다.</div>

      <div className="break" />

      <div className="name">
        {GROOM_FATHER} · {GROOM_MOTHER}
        <span className="relation">
          의 <span className="relation-name">아들</span>
        </span>{" "}
        {GROOM}
      </div>
      <div className="name">
        {BRIDE_FATHER} · {BRIDE_MOTHER}
        <span className="relation">
          의 <span className="relation-name">딸</span>
        </span>{" "}
        {BRIDE}
      </div>

      <div className="break" />

      <Button
        onClick={() => {
          openModal(
            <div className="contact-modal">
              <div className="content">
                <div className="title-group">
                  <div className="title">축하 인사 전하기</div>
                  <div className="subtitle">
                    전화, 문자메세지로 축하 인사를 전해보세요.
                  </div>
                </div>
                <div className="contact-info">
                  {GROOM_INFO.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`)
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`)
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div className="contact-info">
                  {BRIDE_INFO.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`)
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`)
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>,
          )
        }}
      >
        연락하기
      </Button>
    </LazyDiv>
  )
}
