import { Fragment } from "react/jsx-runtime"
import {
  BRIDE,
  BRIDE_CONTACTS,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM,
  GROOM_CONTACTS,
  GROOM_FATHER,
  GROOM_MOTHER,
} from "../../const"
import { useModal } from "../../component/store"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { ReactComponent as PhoneIcon } from "../../image/phone-flip-icon.svg"
import { ReactComponent as EnvelopeIcon } from "../../image/envelope-icon.svg"

export const Invitation = () => {
  const { openModal, closeModal } = useModal()
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Invitation</h2>

      <br />

      <p className="letter-content">
        서로 마주 보며 다져온 사랑이 이제 결실을 맺습니다.
      </p>
      <p className="letter-content">
        함께 한곳을 바라보며 서로 돕는 배필이 되려 합니다.{" "}
      </p>
      <p className="letter-content"> 사랑이라는 이름의 가정을 이루고 </p>
      <p className="letter-content">
        예쁘게 키워갈 수 있도록 증인이 되어 주시고
      </p>
      <p className="letter-content">축복해 주시길 소망합니다.</p>

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
      <br />

      <Button
        onClick={() => {
          openModal(
            <div className="contact-modal">
              <div className="heading">
                <div className="close-button" onClick={() => closeModal()} />
              </div>
              <div className="content">
                <div className="title-group">
                  <div className="title">축하 인사 전하기</div>
                  <div className="subtitle">
                    전화, 문자메세지로 축하 인사를 전해보세요.
                  </div>
                </div>
                <div className="contact-info">
                  {GROOM_CONTACTS.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon className="flip icon" />
                        <EnvelopeIcon className="icon" />
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div className="contact-info">
                  {BRIDE_CONTACTS.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon className="flip icon" />
                        <EnvelopeIcon className="icon" />
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
