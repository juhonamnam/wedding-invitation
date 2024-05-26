import { useEffect, useMemo, useRef, useState } from "react"
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

const PAGES_PER_BLOCK = 5
const POSTS_PER_PAGE = 5

type Post = {
  id: number
  timestamp: number
  name: string
  content: string
}

const DUMMY_POSTS = [
  {
    id: 0,
    timestamp: 1713795179,
    name: "이재용",
    content: "주호야 결혼 축하한다!! 행복하게 살아라~",
  },
]

export const GuestBook = () => {
  const { openModal } = useModal()

  const [posts, setPosts] = useState<Post[]>([])

  const loadPosts = async () => {
    if (process.env.REACT_APP_SERVER_URL) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/posts?offset=${0}&limit=${3}`,
        )
        if (res.ok) {
          const data = await res.json()

          setPosts(data.posts)
        }
      } catch {}
    } else {
      setPosts(DUMMY_POSTS)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <LazyDiv className="card guestbook">
      <h2 className="english">Guest Book</h2>

      <div className="break" />

      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="heading">
            <div
              className="close-button"
              onClick={async () => {
                if (process.env.REACT_APP_SERVER_URL) {
                  try {
                    // TODO: Implement password input
                    const password = window.prompt("비밀번호를 입력해주세요.")
                    if (
                      !password ||
                      password.length < RULES.password.minLength
                    ) {
                      alert(
                        `비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`,
                      )
                      return
                    }

                    if (password.length > RULES.password.maxLength) {
                      alert(
                        `비밀번호를 ${RULES.password.maxLength}자 이하로 입력해주세요.`,
                      )
                      return
                    }

                    const result = await fetch(
                      `${process.env.REACT_APP_SERVER_URL}/posts`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: post.id, password }),
                      },
                    )

                    if (!result.ok) {
                      alert("방명록 삭제에 실패했습니다.")
                      return
                    }

                    loadPosts()
                  } catch {
                    alert("방명록 삭제에 실패했습니다.")
                  }
                }
              }}
            />
          </div>
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {dayjs.unix(post.timestamp).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      <Button
        onClick={() =>
          openModal({
            className: "write-guestbook-modal",
            header: (
              <div className="title-group">
                <div className="title">방명록 작성하기</div>
                <div className="subtitle">
                  신랑, 신부에게 축하의 마음을 전해주세요.
                </div>
              </div>
            ),
            content: <WriteGuestBookModal loadPosts={loadPosts} />,
          })
        }
      >
        방명록 작성하기
      </Button>

      <div className="break" />

      <Button
        onClick={() =>
          openModal({
            className: "all-guestbook-modal",
            header: <div className="title">방명록 전체보기</div>,
            content: <AllGuestBookModal loadPosts={loadPosts} />,
          })
        }
      >
        방명록 전체보기
      </Button>
    </LazyDiv>
  )
}

const WriteGuestBookModal = ({ loadPosts }: { loadPosts: () => void }) => {
  const inputRef = useRef({}) as React.MutableRefObject<{
    name: HTMLInputElement
    content: HTMLTextAreaElement
    password: HTMLInputElement
  }>
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
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
          if (inputRef.current.content.value.length > RULES.content.maxLength) {
            alert(`내용을 ${RULES.content.maxLength}자 이하로 입력해주세요.`)
            return
          }
          if (
            inputRef.current.password.value.length < RULES.password.minLength
          ) {
            alert(`비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`)
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

          if (process.env.REACT_APP_SERVER_URL) {
            const res = await fetch(
              `${process.env.REACT_APP_SERVER_URL}/posts`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: inputRef.current.name.value,
                  content: inputRef.current.content.value,
                  password: inputRef.current.password.value,
                }),
              },
            )
            if (!res.ok) {
              alert("방명록 작성에 실패했습니다.")
              return
            }
          }

          closeModal()
          loadPosts()
        } catch {
          alert("방명록 작성에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      이름
      <input
        disabled={loading}
        type="text"
        placeholder="이름을 입력해주세요."
        className="name"
        ref={(ref) => (inputRef.current.name = ref as HTMLInputElement)}
        maxLength={RULES.name.maxLength}
      />
      내용
      <textarea
        disabled={loading}
        placeholder="축하 메세지를 100자 이내로 입력해주세요."
        className="content"
        ref={(ref) => (inputRef.current.content = ref as HTMLTextAreaElement)}
        maxLength={RULES.content.maxLength}
      />
      비밀번호
      <input
        disabled={loading}
        type="password"
        placeholder="비밀번호를 입력해주세요."
        className="password"
        ref={(ref) => (inputRef.current.password = ref as HTMLInputElement)}
        maxLength={RULES.password.maxLength}
      />
      <Button disabled={loading} type="submit">
        저장하기
      </Button>
    </form>
  )
}

const AllGuestBookModal = ({
  loadPosts,
}: {
  loadPosts: () => Promise<void>
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const loadPage = async (page: number) => {
    setCurrentPage(page)
    if (process.env.REACT_APP_SERVER_URL) {
      try {
        const offset = page * POSTS_PER_PAGE
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/posts?offset=${offset}&limit=${POSTS_PER_PAGE}`,
        )
        if (res.ok) {
          const data = await res.json()

          setPosts(data.posts)
          setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE))
          if (data.total < offset) {
            setCurrentPage(Math.ceil(data.total / POSTS_PER_PAGE) - 1)
          }
        }
      } catch {}
    } else {
      setCurrentPage(page)

      setPosts(DUMMY_POSTS)
      setTotalPages(1)
    }
  }

  useEffect(() => {
    loadPage(0)
  }, [])

  const pages = useMemo(() => {
    const start = Math.floor(currentPage / PAGES_PER_BLOCK) * PAGES_PER_BLOCK
    const end = Math.min(start + PAGES_PER_BLOCK, totalPages)

    return Array.from({ length: end - start }).map((_, index) => index + start)
  }, [currentPage, totalPages])

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="heading">
            <div
              className="close-button"
              onClick={async () => {
                if (process.env.REACT_APP_SERVER_URL) {
                  try {
                    // TODO: Implement password input
                    const password = window.prompt("비밀번호를 입력해주세요.")
                    if (
                      !password ||
                      password.length < RULES.password.minLength
                    ) {
                      alert(
                        `비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`,
                      )
                      return
                    }

                    if (password.length > RULES.password.maxLength) {
                      alert(
                        `비밀번호를 ${RULES.password.maxLength}자 이하로 입력해주세요.`,
                      )
                      return
                    }

                    const result = await fetch(
                      `${process.env.REACT_APP_SERVER_URL}/posts`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: post.id, password }),
                      },
                    )

                    if (!result.ok) {
                      alert("방명록 삭제에 실패했습니다.")
                      return
                    }

                    loadPosts()
                    loadPage(currentPage)
                  } catch {
                    alert("방명록 삭제에 실패했습니다.")
                  }
                }
              }}
            />
          </div>
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {dayjs.unix(post.timestamp).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      <div className="pagination">
        {pages[0] > 0 && (
          <div
            className="page"
            onClick={() => {
              loadPage(pages[0] - 1)
            }}
          >
            이전
          </div>
        )}
        {pages.map((page) => (
          <div
            className={`page${page === currentPage ? " current" : ""}`}
            key={page}
            onClick={() => {
              if (page === currentPage) return
              loadPage(page)
            }}
          >
            {page + 1}
          </div>
        ))}
        {pages[pages.length - 1] < totalPages - 1 && (
          <div
            className="page"
            onClick={() => {
              loadPage(pages[pages.length - 1] + 1)
            }}
          >
            다음
          </div>
        )}
      </div>
    </>
  )
}
