import { BRIDE_INFO, GROOM_INFO } from "../../const"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../store"
import { useRef, useState } from "react"

const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

export const Information = () => {
  const { openModal } = useModal()
  return (
    <LazyDiv className="card information">
      <h2 className="english">Information</h2>
      <div className="info-card">
        <div className="label">식사 안내</div>
        <div className="content">
          식사시간: 12시 30분 ~ 14시 30분
          <br />
          장소: 지하 1층 연회장
        </div>
      </div>

      <div className="info-card">
        <div className="label">마음 전하기</div>
        <div className="content">
          참석이 어려워 직접 축하해주지 못하는
          <br />
          분들을 위해 계좌번호를 기재하였습니다.
          <br />
          넓은 마음으로 양해 부탁드립니다.
        </div>

        <div className="break" />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">신랑측 계좌번호</div>,
              content: (
                <>
                  {GROOM_INFO.filter(({ account }) => !!account).map(
                    ({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            if (account) {
                              try {
                                navigator.clipboard.writeText(account)
                                alert(account + "\n복사되었습니다.")
                              } catch {
                                alert("복사에 실패했습니다.")
                              }
                            }
                          }}
                        >
                          복사하기
                        </Button>
                      </div>
                    ),
                  )}
                </>
              ),
            })
          }}
        >
          신랑측 계좌번호 보기
        </Button>
        <div className="break" />
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">신부측 계좌번호</div>,
              content: (
                <>
                  {BRIDE_INFO.filter(({ account }) => !!account).map(
                    ({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            if (account) {
                              try {
                                navigator.clipboard.writeText(account)
                                alert(account + "\n복사되었습니다.")
                              } catch {
                                alert("복사에 실패했습니다.")
                              }
                            }
                          }}
                        >
                          복사하기
                        </Button>
                      </div>
                    ),
                  )}
                </>
              ),
            })
          }}
        >
          신부측 계좌번호 보기
        </Button>
      </div>

      {process.env.REACT_APP_SERVER_URL && <AttendanceInfo />}
    </LazyDiv>
  )
}

const AttendanceInfo = () => {
  const { openModal } = useModal()

  return (
    <div className="info-card">
      <div className="label">참석의사</div>
      <div className="content">
        신랑, 신부에게 참석의사를
        <br />
        미리 전달할 수 있어요.
      </div>

      <div className="break" />

      <Button
        style={{ width: "100%" }}
        onClick={() => {
          openModal({
            className: "attendance-modal",
            header: <div className="title">참석의사 전달하기</div>,
            content: <AttendModal />,
          })
        }}
      >
        참석의사 전달하기
      </Button>
    </div>
  )
}

const AttendModal = () => {
  const { closeModal } = useModal()
  const inputRef = useRef({ side: {}, meal: {} }) as React.MutableRefObject<{
    side: {
      groom: HTMLInputElement
      bride: HTMLInputElement
    }
    name: HTMLInputElement
    meal: {
      yes: HTMLInputElement
      undecided: HTMLInputElement
      no: HTMLInputElement
    }
    count: HTMLInputElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const side = inputRef.current.side.groom.checked
            ? "groom"
            : inputRef.current.side.bride
              ? "bride"
              : null
          const name = inputRef.current.name.value
          const meal = inputRef.current.meal.yes.checked
            ? "yes"
            : inputRef.current.meal.undecided.checked
              ? "undecided"
              : inputRef.current.meal.no.checked
                ? "no"
                : null
          const count = Number(inputRef.current.count.value)

          if (!side) {
            alert("신랑 또는 신부를 선택해주세요.")
            return
          }

          if (!name) {
            alert("성함을 입력해주세요.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`성함을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
            return
          }

          if (!meal) {
            alert("식사 여부를 선택해주세요.")
            return
          }

          if (isNaN(count)) {
            alert("참석인원을 입력해주세요.")
            return
          }
          if (count < RULES.count.min) {
            alert(`참석인원을 ${RULES.count.min}명 이상으로 입력해주세요.`)
            return
          }

          const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/attendance`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ side, name, meal, count }),
            },
          )
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("참석의사가 성공적으로 전달되었습니다.")
          closeModal()
        } catch {
          alert("참석의사 전달에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="input-group">
        <div className="label">구분</div>
        <div className="select-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="groom"
              hidden
              defaultChecked
              ref={(ref) =>
                (inputRef.current.side.groom = ref as HTMLInputElement)
              }
            />
            <span>신랑</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="bride"
              hidden
              ref={(ref) =>
                (inputRef.current.side.bride = ref as HTMLInputElement)
              }
            />
            <span>신부</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">성함</div>
        <div className="input">
          <input
            disabled={loading}
            type="text"
            placeholder="참석자 성함을 입력해주세요."
            maxLength={RULES.name.maxLength}
            ref={(ref) => (inputRef.current.name = ref as HTMLInputElement)}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="label">식사</div>
        <div className="radio-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="yes"
              ref={(ref) =>
                (inputRef.current.meal.yes = ref as HTMLInputElement)
              }
            />
            <span>예정</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="undecided"
              ref={(ref) =>
                (inputRef.current.meal.undecided = ref as HTMLInputElement)
              }
            />
            <span>미정</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="no"
              ref={(ref) =>
                (inputRef.current.meal.no = ref as HTMLInputElement)
              }
            />
            <span>불참</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">참석인원 (본인 포함)</div>
        <div>
          <input
            disabled={loading}
            type="number"
            min={RULES.count.min}
            defaultValue={RULES.count.default}
            ref={(ref) => (inputRef.current.count = ref as HTMLInputElement)}
          />
          명
        </div>
      </div>

      <Button disabled={loading} type="submit">
        전달하기
      </Button>
    </form>
  )
}
