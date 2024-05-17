import { useRef, useState } from "react"
import { Button } from "../button"
import { dayjs } from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../store"

const RULES = {
  name: {
    maxLength: 10,
  },
  content: {
    maxLength: 100,
  },
  password: {
    minLength: 4,
    maxLength: 20,
  },
}

const DUMMY_GUEST_BOOK = [
  {
    id: 0,
    timestamp: 1713795179,
    name: "이재용",
    content: "주호야 결혼 축하한다!! 행복하게 살아라~",
  },
]

export const GuestBook = () => {
  const { openModal } = useModal()

  const [guestBook, setGuestBook] =
    useState<
      { id: number; timestamp: number; name: string; content: string }[]
    >(DUMMY_GUEST_BOOK)

  return (
    <LazyDiv className="card guestbook">
      <h2 className="english">Guest Book</h2>

      {guestBook.map((guest) => (
        <div key={guest.id} className="post">
          <div className="heading">
            <div className="close-button" />
          </div>
          <div className="body">
            <div className="title">
              <div className="name">{guest.name}</div>
              <div className="date">
                {dayjs.unix(guest.timestamp).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="content">{guest.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      <Button
        onClick={() => {
          openModal(<WriteGuestBookModal />)
        }}
      >
        방명록 작성하기
      </Button>

      <div className="break" />

      <Button>방명록 전체보기</Button>
    </LazyDiv>
  )
}

const WriteGuestBookModal = () => {
  const inputRef = useRef({}) as React.MutableRefObject<{
    name: HTMLInputElement
    content: HTMLTextAreaElement
    password: HTMLInputElement
  }>
  const { closeModal } = useModal()

  return (
    <div className="write-guestbook-modal">
      <div className="content">
        <div className="title-group">
          <div className="title">방명록 작성하기</div>
          <div className="subtitle">
            신랑, 신부에게 축하의 마음을 전해주세요.
          </div>
        </div>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            if (!inputRef.current.name.value) {
              alert("이름을 입력해주세요.")
              return
            }
            if (inputRef.current.name.value.length > RULES.name.maxLength) {
              alert(`이름을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
              return
            }
            if (!inputRef.current.content.value) {
              alert("내용을 입력해주세요.")
              return
            }
            if (
              inputRef.current.content.value.length > RULES.content.maxLength
            ) {
              alert(`내용을 ${RULES.content.maxLength}자 이하로 입력해주세요.`)
              return
            }
            if (
              inputRef.current.password.value.length < RULES.password.minLength
            ) {
              alert(
                `비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`,
              )
              return
            }
            if (
              inputRef.current.password.value.length > RULES.password.maxLength
            ) {
              alert(
                `비밀번호를 ${RULES.password.maxLength}자 이하로 입력해주세요.`,
              )
              return
            }

            closeModal()
          }}
        >
          이름
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            className="name"
            ref={(ref) => (inputRef.current.name = ref as HTMLInputElement)}
            maxLength={RULES.name.maxLength}
          />
          내용
          <textarea
            placeholder="축하 메세지를 100자 이내로 입력해주세요."
            className="content"
            ref={(ref) =>
              (inputRef.current.content = ref as HTMLTextAreaElement)
            }
            maxLength={RULES.content.maxLength}
          />
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="password"
            ref={(ref) => (inputRef.current.password = ref as HTMLInputElement)}
            maxLength={RULES.password.maxLength}
          />
          <Button type="submit">저장하기</Button>
        </form>
      </div>
    </div>
  )
}
