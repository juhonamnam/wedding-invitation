import { useState } from "react"
import { Button } from "../button"
import { dayjs } from "../../const"
import { LazyDiv } from "../lazyDiv"

const DUMMY_GUEST_BOOK = [
  {
    id: 0,
    timestamp: 1713795179,
    name: "이재용",
    content: "주호야 결혼 축하한다!! 행복하게 살아라~",
  },
]

export const GuestBook = () => {
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

      <br />
      <Button>방명록 작성하기</Button>
    </LazyDiv>
  )
}
