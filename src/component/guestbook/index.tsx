import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "../button"
import { dayjs } from "../../const"
import { LazyDiv } from "../lazyDiv"
import { Modal } from "../modal"
import offlineGuestBook from "./offlineGuestBook.json"
import { SERVER_URL } from "../../env"

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

export const GuestBook = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const guestbookListModalState = useState(false)

  const deleteGuestBookModalState = useState(false)
  const [deletePostId, setDeletePostId] = useState<number | null>(null)

  const writeGuestBookModalState = useState(false)

  const loadPosts = async () => {
    if (SERVER_URL) {
      try {
        const res = await fetch(
          `${SERVER_URL}/guestbook?offset=${0}&limit=${3}`,
        )
        if (res.ok) {
          const data = await res.json()

          setPosts(data.posts)
        }
      } catch (error) {
        console.error("Error loading posts:", error)
      }
    } else {
      setPosts(offlineGuestBook.slice(0, 3))
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <>
      <LazyDiv className="card guestbook">
        <h2 className="english">Guest Book</h2>

        <div className="break" />

        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="heading">
              <button
                className="close-button"
                onClick={async () => {
                  if (SERVER_URL) {
                    setDeletePostId(post.id)
                    deleteGuestBookModalState[1](true)
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

        {SERVER_URL && (
          <>
            <Button onClick={() => writeGuestBookModalState[1](true)}>
              방명록 작성하기
            </Button>
            <div className="break" />
          </>
        )}

        <Button onClick={() => guestbookListModalState[1](true)}>
          방명록 전체보기
        </Button>
      </LazyDiv>
      <Modal
        modalState={guestbookListModalState}
        className="guestbook-list-modal"
        closeOnClickBackground={true}
      >
        <GuestBookListModal
          loadPosts={loadPosts}
          onClose={() => guestbookListModalState[1](false)}
        />
      </Modal>
      <Modal
        modalState={deleteGuestBookModalState}
        className="delete-guestbook-modal"
        closeOnClickBackground={false}
      >
        <DeleteGuestBookModal
          postId={deletePostId}
          onSuccess={() => {
            deleteGuestBookModalState[1](false)
            loadPosts()
          }}
          onCancel={() => {
            deleteGuestBookModalState[1](false)
          }}
        />
      </Modal>
      <Modal
        modalState={writeGuestBookModalState}
        className="write-guestbook-modal"
        closeOnClickBackground={false}
      >
        <WriteGuestBookModal
          loadPosts={loadPosts}
          onClose={() => writeGuestBookModalState[1](false)}
        />
      </Modal>
    </>
  )
}

const WriteGuestBookModal = ({
  loadPosts,
  onClose,
}: {
  loadPosts: () => void
  onClose: () => void
}) => {
  const inputRef = useRef({}) as React.RefObject<{
    name: HTMLInputElement
    content: HTMLTextAreaElement
    password: HTMLInputElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const name = inputRef.current.name.value.trim()
          const content = inputRef.current.content.value.trim()
          const password = inputRef.current.password.value

          if (!name) {
            alert("이름을 입력해주세요.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`이름을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
            return
          }

          if (!content) {
            alert("내용을 입력해주세요.")
            return
          }
          if (content.length > RULES.content.maxLength) {
            alert(`내용을 ${RULES.content.maxLength}자 이하로 입력해주세요.`)
            return
          }

          if (password.length < RULES.password.minLength) {
            alert(`비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`)
            return
          }
          if (password.length > RULES.password.maxLength) {
            alert(
              `비밀번호를 ${RULES.password.maxLength}자 이하로 입력해주세요.`,
            )
            return
          }

          const res = await fetch(`${SERVER_URL}/guestbook`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, content, password }),
          })
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("방명록 작성이 완료되었습니다.")
          onClose()
          loadPosts()
        } catch {
          alert("방명록 작성에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="header">
        <div className="title-group">
          <div className="title">방명록 작성하기</div>
          <div className="subtitle">
            신랑, 신부에게 축하의 마음을 전해주세요.
          </div>
        </div>
      </div>
      <div className="content">
        이름
        <input
          disabled={loading}
          type="text"
          placeholder="이름을 입력해주세요."
          ref={(ref) => {
            inputRef.current.name = ref as HTMLInputElement
          }}
          maxLength={RULES.name.maxLength}
        />
        내용
        <textarea
          disabled={loading}
          placeholder="축하 메세지를 100자 이내로 입력해주세요."
          ref={(ref) => {
            inputRef.current.content = ref as HTMLTextAreaElement
          }}
          maxLength={RULES.content.maxLength}
        />
        비밀번호
        <input
          disabled={loading}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          ref={(ref) => {
            inputRef.current.password = ref as HTMLInputElement
          }}
          maxLength={RULES.password.maxLength}
        />
      </div>
      <div className="footer">
        <Button buttonStyle="style2" type="submit">
          저장하기
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

const GuestBookListModal = ({
  loadPosts,
  onClose,
}: {
  loadPosts: () => Promise<void>
  onClose: () => void
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const deleteGuestBookModalState = useState(false)
  const [deletePostId, setDeletePostId] = useState<number | null>(null)

  const loadPage = async (page: number) => {
    setCurrentPage(page)
    if (SERVER_URL) {
      try {
        const offset = page * POSTS_PER_PAGE
        const res = await fetch(
          `${SERVER_URL}/guestbook?offset=${offset}&limit=${POSTS_PER_PAGE}`,
        )
        if (res.ok) {
          const data = await res.json()

          const totalPages = Math.ceil(data.total / POSTS_PER_PAGE)
          if (page !== 0 && page >= totalPages) {
            loadPage(totalPages - 1)
            return
          }
          setPosts(data.posts)
          setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE))
        }
      } catch (error) {
        console.error("Error loading posts:", error)
      }
    } else {
      setCurrentPage(page)

      setPosts(
        offlineGuestBook.slice(
          page * POSTS_PER_PAGE,
          (page + 1) * POSTS_PER_PAGE,
        ),
      )
      setTotalPages(Math.ceil(offlineGuestBook.length / POSTS_PER_PAGE))
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
      <div className="header">
        <div className="title">방명록 전체보기</div>
      </div>
      <div className="content">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="heading">
              <div
                className="close-button"
                onClick={async () => {
                  if (SERVER_URL) {
                    setDeletePostId(post.id)
                    deleteGuestBookModalState[1](true)
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
      </div>
      <div className="footer">
        <Button
          buttonStyle="style2"
          className="bg-light-grey-color text-dark-color"
          onClick={() => {
            onClose()
          }}
        >
          닫기
        </Button>
      </div>
      <Modal
        modalState={deleteGuestBookModalState}
        className="delete-guestbook-modal"
        closeOnClickBackground={false}
      >
        <DeleteGuestBookModal
          postId={deletePostId}
          onSuccess={() => {
            deleteGuestBookModalState[1](false)
            loadPosts()
            loadPage(currentPage)
          }}
          onCancel={() => {
            deleteGuestBookModalState[1](false)
          }}
        />
      </Modal>
    </>
  )
}

const DeleteGuestBookModal = ({
  postId,
  onSuccess,
  onCancel,
}: {
  postId: number | null
  onSuccess: () => void
  onCancel: () => void
}) => {
  const inputRef = useRef({} as HTMLInputElement)
  const [loading, setLoading] = useState(false)

  if (postId === null) return null

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const password = inputRef.current.value
          if (!password || password.length < RULES.password.minLength) {
            alert(`비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`)
            return
          }

          if (password.length > RULES.password.maxLength) {
            alert(
              `비밀번호를 ${RULES.password.maxLength}자 이하로 입력해주세요.`,
            )
            return
          }

          const result = await fetch(`${SERVER_URL}/guestbook`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: postId, password }),
          })

          if (!result.ok) {
            if (result.status === 403) {
              alert("비밀번호가 일치하지 않습니다.")
            } else {
              alert("방명록 삭제에 실패했습니다.")
            }
            return
          }

          alert("삭제되었습니다.")
          onSuccess()
        } catch {
          alert("방명록 삭제에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="header">
        <div className="title">삭제하시겠습니까?</div>
      </div>
      <div className="content">
        <input
          disabled={loading}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          ref={inputRef}
          maxLength={RULES.password.maxLength}
        />
      </div>
      <div className="footer">
        <Button buttonStyle="style2" type="submit">
          삭제하기
        </Button>
        <Button
          buttonStyle="style2"
          type="button"
          className="bg-light-grey-color text-dark-color"
          onClick={onCancel}
        >
          닫기
        </Button>
      </div>
    </form>
  )
}
