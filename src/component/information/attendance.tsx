import {
  BRIDE_FULLNAME,
  dayjs,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { Button } from "../button"
import { Modal } from "../modal"
import { useEffect, useRef, useState } from "react"
import HeartIcon from "../../icons/heart-icon.svg?react"
import CalendarIcon from "../../icons/calendar-icon.svg?react"
import MarkerIcon from "../../icons/marker-icon.svg?react"
import { SERVER_URL } from "../../env"

/**
 * 입력 데이터 제한 규칙
 */
const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

/**
 * 참석 의사를 전달할 수 있는 카드와 폼 모달을 관리하는 컴포넌트입니다.
 *
 * @returns {JSX.Element | null} 참석 의사 전달 섹션
 */
export const AttendanceInfo = () => {
  const attendanceInfoModalState = useState(false)
  const attendanceFormModalState = useState(false)

  const initialized = useRef(false)
  const now = useRef(dayjs())

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // 서버 URL이 없거나 예식일이 지났으면 안내 모달을 띄우지 않음
    if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return

    attendanceInfoModalState[1](true)
  }, [attendanceInfoModalState])

  // 서버 연동 기능이 비활성화되어 있거나 이미 예식이 종료된 경우 섹션을 렌더링하지 않음
  if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return null

  return (
    <>
      <div className="info-card">
        <div className="label">참석 의사 전달</div>
        <div className="content">
          신랑, 신부에게 참석의사를
          <br />
          미리 전달할 수 있어요.
        </div>

        <div className="break" />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            attendanceFormModalState[1](true)
          }}
        >
          참석 의사 전달하기
        </Button>
      </div>

      {/* 참석 안내 모달 */}
      <Modal
        className="attendance-info-modal"
        modalState={attendanceInfoModalState}
        closeOnClickBackground={true}
      >
        <div className="header">
          <div className="title">참석 의사 전달 안내</div>
        </div>
        <div className="content">
          <div className="info-message">
            축하의 마음으로 참석해주시는
            <br />
            모든 분들을 귀하게 모실 수 있도록
            <br />
            참석 및 식사 여부를 미리 여쭙고자 합니다.
            <div className="break" />
            부담없이 알려주시면
            <br />
            정성껏 준비하겠습니다.
          </div>
          <div className="wedding-info">
            <HeartIcon /> 신랑 {GROOM_FULLNAME} & 신부 {BRIDE_FULLNAME}
            <br />
            <CalendarIcon /> {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}
            <br />
            <MarkerIcon /> {LOCATION}
          </div>
        </div>
        <div className="footer">
          <Button
            buttonStyle="style2"
            onClick={() => {
              attendanceInfoModalState[1](false)
              attendanceFormModalState[1](true)
            }}
          >
            참석 의사 전달하기
          </Button>
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={() => {
              attendanceInfoModalState[1](false)
            }}
          >
            닫기
          </Button>
        </div>
      </Modal>

      {/* 참석 의사 입력 폼 모달 */}
      <Modal
        className="attendance-form-modal"
        modalState={attendanceFormModalState}
        closeOnClickBackground={true}
      >
        <AttendanceFormModal
          onClose={() => {
            attendanceFormModalState[1](false)
          }}
        />
      </Modal>
    </>
  )
}

/**
 * 참석 의사를 입력받아 서버로 전송하는 폼 컴포넌트입니다.
 */
const AttendanceFormModal = ({ onClose }: { onClose: () => void }) => {
  const inputRef = useRef({ side: {}, meal: {} }) as React.RefObject<{
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
            : inputRef.current.side.bride.checked
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

          // 유효성 검사
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
            alert("참석 인원을 입력해주세요.")
            return
          }
          if (count < RULES.count.min) {
            alert(`참석 인원을 ${RULES.count.min}명 이상으로 입력해주세요.`)
            return
          }

          // 서버에 데이터 전송
          const res = await fetch(`${SERVER_URL}/attendance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ side, name, meal, count }),
          })
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("참석 의사가 성공적으로 전달되었습니다.")
          onClose()
        } catch {
          alert("참석 의사 전달에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="header">
        <div className="title">참석 의사 전달하기</div>
      </div>
      <div className="content">
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
                ref={(ref) => {
                  inputRef.current.side.groom = ref as HTMLInputElement
                }}
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
                ref={(ref) => {
                  inputRef.current.side.bride = ref as HTMLInputElement
                }}
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
              ref={(ref) => {
                inputRef.current.name = ref as HTMLInputElement
              }}
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
                ref={(ref) => {
                  inputRef.current.meal.yes = ref as HTMLInputElement
                }}
              />
              <span>예정</span>
            </label>

            <label>
              <input
                disabled={loading}
                type="radio"
                name="meal"
                value="undecided"
                ref={(ref) => {
                  inputRef.current.meal.undecided = ref as HTMLInputElement
                }}
              />
              <span>미정</span>
            </label>

            <label>
              <input
                disabled={loading}
                type="radio"
                name="meal"
                value="no"
                ref={(ref) => {
                  inputRef.current.meal.no = ref as HTMLInputElement
                }}
              />
              <span>불참</span>
            </label>
          </div>
        </div>

        <div className="input-group">
          <div className="label">참석 인원 (본인 포함)</div>
          <div>
            <input
              disabled={loading}
              type="number"
              min={RULES.count.min}
              defaultValue={RULES.count.default}
              ref={(ref) => {
                inputRef.current.count = ref as HTMLInputElement
              }}
            />
            명
          </div>
        </div>
      </div>
      <div className="footer">
        <Button buttonStyle="style2" disabled={loading} type="submit">
          전달하기
        </Button>
        <Button
          buttonStyle="style2"
          type="button"
          className="bg-light-grey-color text-dark-color"
          onClick={onClose}
        >
          닫기
        </Button>
      </div>
    </form>
  )
}
